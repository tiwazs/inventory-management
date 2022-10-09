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