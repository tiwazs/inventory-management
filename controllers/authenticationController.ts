import express from 'express';
import logger from '../lib/logger';
const router = express.Router();
import { AuthenticationService } from '../services/authenticationService';

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Create a new companyAccount
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/companyAccountToCreate'
 *      responses:
 *          200:
 *              description: companyAccount created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/companyAccount'
 *          404:
 *              description: Object not found
 *                                
 */

 router.post('/register', async (req, res) => {
    const { body } = req;
    try{
        if(
            "name" in body && typeof body.name === "string" &&
            "email" in body && typeof body.email === "string" &&
            "password" in body && typeof body.password === "string"
        ){
            const companyAccount = await AuthenticationService.register(body);
            return res.status(200).json(companyAccount);
        }
        return res.status(400).json({error: "Invalid request"});
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Login companyAccount
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/login'
 *      responses:
 *          200:
 *              description: companyAccount created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/companyAccount'
 *          404:
 *              description: Object not found
 *                                
 */

 router.post('/login', async (req, res) => {
    const { body } = req;
    try{
        if(
            "email" in body && typeof body.email === "string" &&
            "password" in body && typeof body.password === "string"
        ){
            const companyAccount = await AuthenticationService.login(body.email, body.password);
            return res.status(200).json(companyAccount);
        }
        return res.status(400).json({error: "Invalid request"});
    }catch(error: any){
        logger.error(error.message);
        if(error.message === "Company Account not found") return res.status(404).json({error: error.message});
        if(error.message === "Invalid Credentials"
            || error.message === "Username and password are required") return res.status(401).json({error: error.message});

        return res.status(500).json({error: error.message});
    }
});

module.exports = router;