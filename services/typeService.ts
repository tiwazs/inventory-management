import prisma from '../configurations/dbinit';
import { Type } from '@prisma/client';

export class TypeService {
    static async getAll(): Promise<Type[]> {
        const types = await prisma.type.findMany();
        return types;
    }

    static async getById(id: string): Promise<Type | null> {
        const type = await prisma.type.findFirst({
            where: {
                id: id
            }
        });

        return type;
    }

    static async getByName(name: string): Promise<Type | null> {
        const type = await prisma.type.findFirst({
            where: {
                name: name
            }
        });

        return type;
    }

    static async create(name: string): Promise<Type> {
        const type = await prisma.type.create({
            data: {
                name: name
            }
        });

        return type;
    }

    static async update(id: string, name: string): Promise<Type | null> {
        const type = await prisma.type.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });

        return type;
    }

    static async delete(id: string): Promise<Type | null> {
        const type = await prisma.type.delete({
            where: {
                id: id
            }
        });

        return type;
    }
}