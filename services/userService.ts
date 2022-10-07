import prisma from '../configurations/dbinit';
import { User } from '@prisma/client';
import { UserBaseDM } from '../dataModels/UserDataModel';

class UserService {
    static async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }
}