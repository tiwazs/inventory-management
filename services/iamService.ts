import { IAM } from "@prisma/client";
import prisma from '../configurations/dbinit';
import { IAMBaseDM } from "../dataModels/IAMDataModels";

export class IAMService {
    static async getAll(): Promise<IAM[]> {
        const iams = await prisma.iAM.findMany();
        return iams;
    }

    static async getById(id: string): Promise<IAM | null> {
        const iam =  await prisma.iAM.findFirst({
            where: {
                id: id
            }
        });

        return iam;
    }

    static async getByWorkspaceId(workspaceId: string): Promise<IAM[]> {
        const iams = await prisma.iAM.findMany({
            where: {
                workspaceId: workspaceId
            }
        });

        return iams;
    }

    static async create(iam: IAMBaseDM): Promise<IAM> {
        const iamCreated = await prisma.iAM.create({
            data: {
                ...iam
            }
        });

        return iamCreated;
    }

    static async update(id: string, iam: IAMBaseDM): Promise<IAM | null> {
        const iamUpdated = await prisma.iAM.update({
            where: {
                id: id
            },
            data: {
                ...iam
            }
        });

        return iamUpdated;
    }

    static async delete(id: string): Promise<IAM | null> {
        const iam = await prisma.iAM.delete({
            where: {
                id: id
            }
        });

        return iam;
    }
}