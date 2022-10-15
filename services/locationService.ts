import prisma from '../configurations/dbinit';
import { Location } from "@prisma/client";
import { LocationBaseDM } from "../dataModels/LocationDataModel";

export class LocationService {
    static async getAll(): Promise<Location[]> {
        const locations = await prisma.location.findMany();
        return locations;
    }

    static async getById(id: string): Promise<Location | null> {
        const location = await prisma.location.findFirst({
            where: {
                id: id
            }
        });

        return location;
    }

    static async getByWorkspaceId(workspaceId: string): Promise<Location[]> {
        const locations = await prisma.location.findMany({
            where: {
                workspaceId: workspaceId
            }
        });

        return locations;
    }

    static async getByName(name: string): Promise<Location | null> {
        const location = await prisma.location.findFirst({
            where: {
                name: name
            }
        });

        return location;
    }

    static async create(location: LocationBaseDM): Promise<Location> {
        const locationCreated = await prisma.location.create({
            data: {
                ...location
            }
        });

        return locationCreated;
    }

    static async update(id: string, location: LocationBaseDM): Promise<Location | null> {
        const locationUpdated = await prisma.location.update({
            where: {
                id: id
            },
            data: {
                ...location
            }
        });

        return locationUpdated;
    }

    static async delete(id: string): Promise<Location | null> {
        const locationDeleted = await prisma.location.delete({
            where: {
                id: id
            }
        });

        return locationDeleted;
    }

}