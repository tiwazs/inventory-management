import express from 'express';
import { RequestWithUser } from '../dataModels/AuthenticationModels';
import logger from '../lib/logger';
const router = express.Router();
import { CompanyAccountService } from '../services/companyAccountService';

/**
 * @swagger
 * /api/companyAccount/getall/{all}:
 *  get:
 *      summary: Return all companyAccounts
 *      tags: [CompanyAccounts]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: list of all companyAccounts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/companyAccounts'
 *                                
 */

router.get('/getall/:getall', async (req, res) => {
    const companyAccounts = await CompanyAccountService.getAll();
    return res.status(200).json(companyAccounts);
});

/**
 * @swagger
 * /api/companyAccount/id/{id}:
 *  get:
 *      summary: Return companyAccount by id
 *      tags: [CompanyAccounts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: companyAccount id
 *      responses:
 *          200:
 *              description: companyAccount
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/companyAccounts'
 *          404:
 *              description: companyAccount not found
 *                                                               
 */

router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const companyAccount = await CompanyAccountService.getById(id);
        if(companyAccount) return res.status(200).json(companyAccount);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/companyAccount/email/{email}:
 *  get:
 *      summary: Return companyAccount by email
 *      tags: [CompanyAccounts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: email
 *              schema:
 *                  type: string
 *              required: true
 *              description: companyAccount email
 *      responses:
 *          200:
 *              description: companyAccount
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/companyAccount'
 *          404:
 *              description: companyAccount not found
 *                                                               
 */

router.get('/email/:email', async (req, res) => {
    const { email } = req.params;
    try{
        const companyAccount = await CompanyAccountService.getEmail(email);
        if(companyAccount) return res.status(200).json(companyAccount);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/companyAccount:
 *  get:
 *      summary: Return companyAccount info
 *      tags: [CompanyAccounts]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: companyAccount
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/companyAccount'
 *          404:
 *              description: companyAccount not found
 *                                                               
 */

 router.get('/', async (req: RequestWithUser, res) => {
    const { companyAccount } = req;
    try{
        const companyAccountRead = await CompanyAccountService.getById(companyAccount.userId);
        if(companyAccountRead) return res.status(200).json(companyAccountRead);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/companyAccount/id/{id}:
 *  put:
 *      summary: Updates companyAccount
 *      tags: [CompanyAccounts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: companyAccount id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/companyAccountToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/companyAccount'
 *          404:
 *              description: companyAccount not found
 *                                
 */

router.put('/id/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try{
        const companyAccount = await CompanyAccountService.update(id, body);
        if(companyAccount) return res.status(200).json(companyAccount);
        
        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/companyAccount:
 *  put:
 *      summary: Updates companyAccount
 *      tags: [CompanyAccounts]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/companyAccountToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/companyAccount'
 *          404:
 *              description: companyAccount not found
 *                                
 */

 router.put('/', async (req: RequestWithUser, res) => {
    const { body } = req;
    const { companyAccount } = req;
    try{
        const companyAccountUdated = await CompanyAccountService.update(companyAccount.userId, body);
        if(companyAccountUdated) return res.status(200).json(companyAccountUdated);
        
        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/companyAccount/id/{id}:
 *  delete:
 *      summary: Deletes a companyAccount by id
 *      tags: [CompanyAccounts]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: companyAccount id
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: companyAccount not found
 *                                
 */

router.delete('/id/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const companyAccount = await CompanyAccountService.delete(id);
        if(companyAccount) return res.status(200).json(companyAccount);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/companyAccount:
 *  delete:
 *      summary: Deletes a companyAccount by id
 *      tags: [CompanyAccounts]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: companyAccount not found
 *                                
 */

 router.delete('/', async (req: RequestWithUser, res) => {
    const { companyAccount } = req;
    try{
        const companyAccountDeleted = await CompanyAccountService.delete(companyAccount.userId);
        if(companyAccountDeleted) return res.status(200).json(companyAccountDeleted);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

module.exports = router;