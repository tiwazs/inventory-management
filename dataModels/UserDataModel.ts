import express from 'express';
const router = express.Router();

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

/**
 * @swagger
 * components:
 *  schemas:
 *      user:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              name:
 *                  type: string
 *                  description: Username set by user
 *              email:
 *                  type: string
 *                  description: Email set by user
 *              password:
 *                  type: string
 *                  description: key to access
 *              firstName:
 *                  type: string
 *                  description: first name of the user
 *              lastName:
 *                  type: string
 *                  description: last name of the user
 *              image: 
 *                 type: string 
 *                 description: image of the user
 *              emailVerified:
 *                 type: boolean
 *                 description: if the email is verified
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
 *      userToUpdate:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              name:
 *                  type: string
 *                  description: Username set by user
 *              password:
 *                  type: string
 *                  description: key to access
 *              firstName:
 *                  type: string
 *                  description: first name of the user
 *              lastName:
 *                  type: string
 *                  description: last name of the user
 *              image: 
 *                 type: string 
 *                 description: image of the user
*/

// Exporting so swagger can read the models
module.exports = router;