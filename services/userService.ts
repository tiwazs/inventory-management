import prisma from '../configurations/dbinit';
import { User } from '@prisma/client';
import { UserBaseDM } from '../dataModels/UserDataModel';


class UserService {
    static async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    static async findById(id: string): Promise<User | null> {
        const user =  await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        return user;
    }

    static async findEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        return user;
    }
    
    static async update(id: string, user: UserBaseDM): Promise<User | null> {
        const userUpdated = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...user
            }
        });

        return userUpdated;
    }

    static async delete(id: string): Promise<User | null> {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        });

        return user;
    }

}