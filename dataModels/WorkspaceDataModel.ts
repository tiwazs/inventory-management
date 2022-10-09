import express from "express";
const router = express.Router();

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

/**
 * @swagger
 * components:
 *  schemas:
 *      workspace:
 *          type: object
 *          required:
 *              - userId
 *              - name
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the workspace
 *              userId:
 *                  type: string
 *                  description: userId
 *              name:
 *                  type: string
 *                  description: Workspace name
 *              createdAt:
 *                  type: string
 *                  description: time
 *              updatedAt:
 *                  type: string
 *                  description: time
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      workspaceToUpdate:
 *          type: object
 *          properties:
 *              userId:
 *                  type: string
 *                  description: userId
 *              name:
 *                  type: string
 *                  description: Workspace name
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      workspaceToCreate:
 *          type: object
 *          required:
 *              - userId
 *              - name
 *          properties:
 *              userId:
 *                  type: string
 *                  description: userId
 *              name:
 *                  type: string
 *                  description: Workspace name
*/

module.exports = router;