import prisma from '../configurations/dbinit';
import { Category } from "@prisma/client";
import { CategoryBaseDM, CategoryToCreateDM } from '../dataModels/CategoryDataModel';

export class CategoryService {
    static async getAll(): Promise<Category[]> {
        const categories = await prisma.category.findMany();
        return categories;
    }

    static async getByWorkspaceId(workspaceId: string): Promise<Category[]> {
        const categories = await prisma.category.findMany({
            where: {
                workspaceId: workspaceId
            }
        });
        return categories;
    }

    static async getById(id: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        });
        return category;
    }

    static async getByName(name: string): Promise<Category | null> {
        const category = await prisma.category.findFirst({
            where: {
                name: name
            }
        });
        return category;
    }
    

    /*
    *  Create a new category
    *  This table uses a nested set model to store the category tree
    *  The left and right values are used to store the boundaries of the category in the tree
    *  within a category boundaries, there can be no other category, and so on.
    */
    static async create(category: CategoryToCreateDM): Promise<Category> {
 
        
        if(!category.parentId) {            
            // If the gategory doesn't have a parent, it is a root category
            const lastCategory = await prisma.category.findFirst({ 
                where: { workspaceId: category.workspaceId },
                select: { rgt: true },
                orderBy: { rgt: 'desc' }
            });

            if(lastCategory) {
                const categoryCreated = await prisma.category.create({
                    data: {
                        workspaceId: category.workspaceId,
                        name: category.name,
                        description: category.description,
                        lft: lastCategory.rgt + 1,
                        rgt: lastCategory.rgt + 2
                    }
                });

                return categoryCreated;
            }else{
                const categoryCreated = await prisma.category.create({
                    data: {
                        workspaceId: category.workspaceId,
                        name: category.name,
                        description: category.description,
                        lft: 0,
                        rgt: 1
                    }
                });

                return categoryCreated;
            }
        }else{
            // If the category has a parent, it is a child category.
            // We need to find the boundaries of the parent category, and insert the new category between them
            // We also need to update the boundaries of the other categories in the tree
            const parentCategory = await prisma.category.findUnique({
                where: {
                    id: category.parentId
                }
            });

            if(parentCategory) {
                // Update the boundaries of the other categories in the tree.
                // everything to the right of the parent category, needs to be moved 2 positions to the right
                // to make space for the new category
                await prisma.category.updateMany({
                    where: {
                        workspaceId: category.workspaceId,
                        lft: {
                            gt: parentCategory.lft
                        }
                    },
                    data: {
                        lft: {
                            increment: 2
                        }
                    }
                });

                await prisma.category.updateMany({
                    where: {
                        workspaceId: category.workspaceId,
                        rgt: {
                            gt: parentCategory.lft
                        }
                    },
                    data: {
                        rgt: {
                            increment: 2
                        }
                    }
                });

                const categoryCreated = await prisma.category.create({
                    data: {
                        workspaceId: category.workspaceId,
                        name: category.name,
                        description: category.description,
                        lft: parentCategory.lft + 1,
                        rgt: parentCategory.lft + 2
                    }
                });

                return categoryCreated;
            }else{
                throw new Error('Parent category not found');
            }
        }

    }


    /*
    *  Deletes a category
    *  We need to update the boundaries of the other categories in the tree
    *  everything to the right of the category, needs to be moved to the left by the width of the category
    */
    static async delete(id: string): Promise<Category | null> {
        const categoryToDelete = await prisma.category.findUnique({ where: { id: id } });
        if(!categoryToDelete) { return null; }

        const categorySize = categoryToDelete.rgt - categoryToDelete.lft;
        const hasChildren: boolean = (categorySize > 1) ? true : false;

        if(hasChildren) {
            // If category has children, we need to delete them too
            await prisma.category.deleteMany({
                where: {
                    workspaceId: categoryToDelete.workspaceId,
                    lft: {
                        gte: categoryToDelete.lft,
                        lte: categoryToDelete.rgt
                    }
                }
            });
        }else{
            // If category has no children, just delete it
            await prisma.category.delete({
                where: {
                    id: id
                }
            });
        }

        // Update the boundaries of the other categories in the tree.
        await prisma.category.updateMany({
            where: {
                workspaceId: categoryToDelete.workspaceId,
                lft: {
                    gt: categoryToDelete.rgt
                }
            },
            data: {
                lft: {
                    decrement: categorySize + 1
                },
                rgt: {
                    decrement: categorySize + 1
                }
            }
        });

        return categoryToDelete;
    }
}