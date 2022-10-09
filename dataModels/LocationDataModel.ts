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