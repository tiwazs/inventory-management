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