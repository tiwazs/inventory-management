/**************************************************|Type Data Models|**********************************************/
export interface TypeBaseDM {
    name: string;
}

export interface TypeDM extends TypeBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}