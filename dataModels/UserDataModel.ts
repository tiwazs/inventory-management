export interface UserBaseDM {
    name: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    image: string | null | undefined;
    emailVerified: Date | null | undefined;
}

export interface UserDM extends UserBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}