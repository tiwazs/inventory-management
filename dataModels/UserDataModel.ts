/**************************************************|User Data Models|**********************************************/
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

/**************************************************|Type Data Models|**********************************************/
export interface TypeBaseDM {
    name: string;
}

export interface TypeDM extends TypeBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**************************************************|Workspace Data Models|**********************************************/
export interface WorkspaceBaseDM {
    userId: string;
    name: string;
}

export interface WorkspaceDM extends WorkspaceBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

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

/**************************************************|Location Data Models|**********************************************/
export interface LocationBaseDM {
    workspaceId: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

export interface LocationDM extends LocationBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**************************************************|Item Data Models|**********************************************/
export interface ItemBaseDM {
    workspaceId: string;
    categoryId: string;
    locationId: string;
    typesId: string;
    barcode: string;
    serialNumber: string;
    quantity: number;
    name: string;
    description: string;
    wholeSalePriceInd: number;
    retailPriceInd: number;
    wholeSalePrice: number;
    retailPrice: number;
    length: number;
    width: number;
    height: number;
    weight: number;
    forSale: boolean;
}

export interface ItemToCreateDM extends ItemBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
