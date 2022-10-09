import prisma from '../configurations/dbinit';
import { Item } from '@prisma/client';
import { ItemBaseDM } from '../dataModels/UserDataModel';

export class ItemService {
    static async getAll(): Promise<Item[]> {
        const items = await prisma.item.findMany();
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