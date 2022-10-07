
/****************************************************|User Models|********************************************/
export interface UserBaseDM {
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    image: string;
    emailVerified: boolean;
}

export interface UserDM extends UserBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}