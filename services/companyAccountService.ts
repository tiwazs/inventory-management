import { CompanyAccount } from '@prisma/client';
import prisma from '../configurations/dbinit';
import { CompanyAccountBaseDM } from '../dataModels/CompanyAccountDataModel';

export class CompanyAccountService {
    static async getAll(): Promise<CompanyAccount[]> {
        const companyAccounts = await prisma.companyAccount.findMany();
        return companyAccounts;
    }

    static async getById(id: string): Promise<CompanyAccount | null> {
        const companyAccount =  await prisma.companyAccount.findFirst({
            where: {
                id: id
            }
        });

        return companyAccount;
    }

    static async getEmail(email: string): Promise<CompanyAccount | null> {
        const companyAccount = await prisma.companyAccount.findFirst({
            where: {
                email: email
            }
        });

        return companyAccount;
    }
    
    static async update(id: string, user: CompanyAccountBaseDM): Promise<CompanyAccount | null> {
        const companyAccountUpdated = await prisma.companyAccount.update({
            where: {
                id: id
            },
            data: {
                ...user
            }
        });

        return companyAccountUpdated;
    }

    static async delete(id: string): Promise<CompanyAccount | null> {
        const companyAccount = await prisma.companyAccount.delete({
            where: {
                id: id
            }
        });

        return companyAccount;
    }

}