import prisma from '../configurations/dbinit';
import { Workspace } from "@prisma/client";
import { WorkspaceBaseDM, WorkspaceDM } from "../dataModels/WorkspaceDataModel";

export class WorkspaceService {
    static async findAll(): Promise<Workspace[]> {
        const workspaces = await prisma.workspace.findMany();
        return workspaces;
    }

    static async findById(id: string): Promise<WorkspaceDM | null> {
        const workspace = await prisma.workspace.findUnique({
            where: {
                id: id
            }
        });
        return workspace;
    }

    static async findByName(name: string): Promise<WorkspaceDM | null> {
        const workspace = await prisma.workspace.findFirst({
            where: {
                name: name
            }
        });
        return workspace;
    }

    static async create(workspace: WorkspaceBaseDM): Promise<WorkspaceDM> {
        const workspaceCreated = await prisma.workspace.create({
            data: {
                ...workspace
            }
        });
        return workspaceCreated;
    }

    static async update(id: string, workspace: WorkspaceBaseDM): Promise<WorkspaceDM | null> {
        const workspaceUpdated = await prisma.workspace.update({
            where: {
                id: id
            },
            data: {
                ...workspace
            }
        });
        return workspaceUpdated;
    }

    static async delete(id: string): Promise<WorkspaceDM | null> {
        const workspaceDeleted = await prisma.workspace.delete({
            where: {
                id: id
            }
        });
        return workspaceDeleted;
    }
}