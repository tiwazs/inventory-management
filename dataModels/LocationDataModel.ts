import express from 'express';
const router = express.Router();

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

/**
 * @swagger
 * components:
 *  schemas:
 *      location:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the location
 *              workspaceId:
 *                  type: string
 *                  description: userId
 *              name:
 *                  type: string
 *                  description: Location name
 *              address:
 *                  type: string
 *                  description: Location description
 *              latitude:
 *                  type: number
 *                  description: Location latitude
 *              longitude:
 *                  type: number
 *                  description: Location longitude
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
 *      locationToUpdate:
 *          type: object
 *          properties:
 *              workspaceId:
 *                  type: string
 *                  description: userId
 *              name:
 *                  type: string
 *                  description: Location name
 *              address:
 *                  type: string
 *                  description: Location description
 *              latitude:
 *                  type: number
 *                  description: Location latitude
 *              longitude:
 *                  type: number
 *                  description: Location longitude
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      locationToCreate:
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
 *                  description: Location name
 *              address:
 *                  type: string
 *                  description: Location description
 *              latitude:
 *                  type: number
 *                  description: Location latitude
 *              longitude:
 *                  type: number
 *                  description: Location longitude
*/

module.exports = router;