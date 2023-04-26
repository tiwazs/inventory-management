import { CompanyAccount } from '@prisma/client';
import prisma from '../configurations/dbinit';
import { CompanyAccountBaseDM } from '../dataModels/CompanyAccountDataModel';
import crypto from 'crypto';

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

    static async genertateApiKey(id: string): Promise<CompanyAccount | null> {
        const companyAccount = await prisma.companyAccount.update({
            where: {
                id: id
            },
            data: {
                apiKey: crypto.randomUUID()
            }
        });

        return companyAccount;
    }

    static async getByApiKey(apiKey: string): Promise<CompanyAccount | null> {
        const companyAccount = await prisma.companyAccount.findFirst({
            where: {
                apiKey: apiKey
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