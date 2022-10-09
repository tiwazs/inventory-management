/**************************************************|Category Data Models|**********************************************/
export interface CategoryBaseDM {
    workspaceId: string
    name: string
    description: string
}

export interface CategoryToCreateDM extends CategoryBaseDM {
    parentId: string | null | undefined;
}

export interface CategoryDM extends CategoryBaseDM {
    id: string;
    lft: number;
    rgt: number;
    createdAt: Date;
    updatedAt: Date;
}