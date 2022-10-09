import prisma from '../configurations/dbinit';
import { Type } from '@prisma/client';
import { TypeBaseDM, TypeDM } from '../dataModels/TypeDataModel';

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

    static async create(type: TypeBaseDM): Promise<Type> {
        const typeCreated = await prisma.type.create({
            data: {
                ...type
            }
        });

        return typeCreated;
    }

    static async update(id: string, type: TypeBaseDM): Promise<Type | null> {
        const typeUpdated = await prisma.type.update({
            where: {
                id: id
            },
            data: {
                ...type
            }
        });

        return typeUpdated;
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