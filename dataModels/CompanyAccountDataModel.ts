import express from 'express';
const router = express.Router();

/**************************************************|User Data Models|**********************************************/
export interface CompanyAccountBaseDM {
    name: string | null | undefined;
    email: string;
    password: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    image: string | null | undefined;
    emailVerified: Date | null | undefined;
}

export interface CompanyAccountDM extends CompanyAccountBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      companyAccount:
 *          type: object
 *          required:
 *              - name
 *              - email
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
 *      companyAccountToUpdate:
 *          type: object
 *          properties:
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
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      companyAccountToCreate:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
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
*/

// Exporting so swagger can read the models
module.exports = router;