import prisma from '../configurations/dbinit';
import { Item } from '@prisma/client';
import { ItemBaseDM } from '../dataModels/ItemDataModel';
import { CategoryService } from './categoryService';

export class ItemService {
    static async getAll(): Promise<Item[]> {
        const items = await prisma.item.findMany();
        return items;
    }

    static async getAllByWorkspaceIdQ(workspaceId: string, 
                                      typeId: string | undefined, 
                                      categoryId: string | undefined, 
                                      locationId: string | undefined)
                                      : Promise<Item[]> {
        if(workspaceId === null) return [];
        
        let categories;
        let categoryIds;
        if(categoryId !== undefined){ 
            categories = await CategoryService.getTree(categoryId);
            categoryIds = categories.map(category => category.id);
        }

        const items = await prisma.item.findMany({
            where: {
                workspaceId: workspaceId,
                typeId: typeId,
                locationId: locationId,
                categoryId: {
                    in: categoryIds
                }
            }
        });

        return items;
        
    }

    static async getAllByCategoryId(categoryId: string): Promise<Item[]> {
        const categories = await CategoryService.getTree(categoryId);
        if(!(Array.isArray(categories) && categories.length)) return [];

        const categoryIds = categories.map(category => category.id);
        const items = await prisma.item.findMany({
            where: {
                categoryId: {
                    in: categoryIds
                }
            }
        });

        return items;
    }

    static async getAllByLocationId(locationId: string): Promise<Item[]> {
        if(locationId === null) return [];

        const items = prisma.item.findMany({
            where: {
                locationId: locationId
            }
        });

        return items;
    }

    static async getById(id: string): Promise<Item | null> {
        const item = await prisma.item.findFirst({
            where: {
                id: id
            }
        });

        return item;
    }

    static async getByName(name: string): Promise<Item | null> {
        const item = await prisma.item.findFirst({
            where: {
                name: name
            }
        });

        return item;
    }

    static async create(item: ItemBaseDM): Promise<Item> {
        const itemCreated = await prisma.item.create({
            data: {
                ...item
            }
        });

        return itemCreated;
    }

    static async update(id: string, item: ItemBaseDM): Promise<Item | null> {
        const itemUpdated = await prisma.item.update({
            where: {
                id: id
            },
            data: {
                ...item
            }
        });

        return itemUpdated;
    }

    static async delete(id: string): Promise<Item | null> {
        const item = await prisma.item.delete({
            where: {
                id: id
            }
        });

        return item;
    }
}