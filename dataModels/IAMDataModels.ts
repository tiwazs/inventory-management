import { Role } from '@prisma/client';
import express from 'express';
const router = express.Router();

/**************************************************|User Data Models|**********************************************/
export interface IAMBaseDM {
    workspaceId: string;
    password: string;
    role: Role;
    tagname: string;
}

export interface UserDM extends IAMBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      iam:
 *          type: object
 *          required:
 *              - workspaceId
 *              - password
 *              - role
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              workspaceId:
 *                  type: string
 *                  description: workspaceId set by user
 *              password:
 *                  type: string
 *                  description: key to access
 *              tagname:
 *                  type: string
 *                  description: Username set by user
 *              role:
 *                  type: string
 *                  description: role of the user
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
 *      iamToUpdate:
 *          type: object
 *          properties:
 *              password:
 *                  type: string
 *                  description: key to access
 *              tagname:
 *                  type: string
 *                  description: Username set by user
 *              role:
 *                  type: string
 *                  description: role of the user
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      iamToCreate:
 *          type: object
 *          required:
 *              - workspaceId
 *              - password
 *              - role
 *          properties:
 *              workspaceId:
 *                  type: string
 *                  description: workspaceId set by user
 *              password:
 *                  type: string
 *                  description: key to access
 *              tagname:
 *                  type: string
 *                  description: Username set by user
 *              role:
 *                  type: string
 *                  description: role of the user
*/

// Exporting so swagger can read the models
module.exports = router;