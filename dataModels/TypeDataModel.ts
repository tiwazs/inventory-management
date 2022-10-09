import express from 'express';
const router = express.Router();

/**************************************************|Type Data Models|**********************************************/
export interface TypeBaseDM {
    name: string;
}

export interface TypeDM extends TypeBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      type:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              name:
 *                  type: string
 *                  description: Username set by user
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
 *      typeToUpdate:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Username set by user
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      typeToCreate:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Username set by user
*/

module.exports = router;