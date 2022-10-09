import express from "express";
const router = express.Router();

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

/**
 * @swagger
 * components:
 *  schemas:
 *      category:
 *          type: object
 *          required:
 *              - workspaceId
 *              - name
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the workspace
 *              workspaceId:
 *                  type: string
 *                  description: userId
 *              name:
 *                  type: string
 *                  description: Workspace name
 *              description:
 *                  type: string
 *                  description: Workspace description
 *              lft:
 *                  type: number
 *                  description: left value
 *              rgt:
 *                  type: number
 *                  description: right value
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
 *      categoryToUpdate:
 *          type: object
 *          properties:
 *              workspaceId:
 *                  type: string
 *                  description: userId
 *              name:
 *                  type: string
 *                  description: Workspace name
 *              description:
 *                  type: string
 *                  description: Workspace description
 *              parentId:
 *                  type: string
 *                  description: parent category id
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      categoryToCreate:
 *          type: object
 *          required:
 *              - workspaceId
 *              - name
 *          properties:
 *              workspaceId:
 *                  type: string
 *                  description: userId
 *              name:
 *                  type: string
 *                  description: Workspace name
 *              description:
 *                  type: string
 *                  description: Workspace description
 *              parentId:
 *                  type: string
 *                  description: parent category id
*/

module.exports = router;