import express from 'express';
import logger from '../lib/logger';
import { IAMService } from '../services/iamService';
const router = express.Router();

/**
 * @swagger
 * /api/iam:
 *  get:
 *      summary: Returns all IAMs
 *      tags: [IAMs]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: All IAMs
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/iam'
 *          404:
 *              description: IAM not found
 *                                                               
 */

router.get('/', async (req, res) => {
    const iams = await IAMService.getAll();
    return res.send(iams);
});

/**
 * @swagger
 * /api/iam/{id}:
 *  get:
 *      summary: Return IAM by id
 *      tags: [IAMs]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: IAM id
 *      responses:
 *          200:
 *              description: IAM by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/iam'
 *          404:
 *              description: IAM not found
 *                                
 */

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const iam = await IAMService.getById(id);
        if(iam) return res.status(200).json(location);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/iam/workspace/{workspaceId}:
 *  get:
 *      summary: Return IAMs by workspaceId
 *      tags: [IAMs]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: workspaceId
 *              schema:
 *                  type: string
 *              required: true
 *              description: Workspace Id
 *      responses:
 *          200:
 *              description: list of IAMs by workspaceId
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/iam'
 *          404:
 *              description: IAMs not found
 *                                
 */

router.get('/workspace/:workspaceId', async (req, res) => {
    const { workspaceId } = req.params;
    try{
        const iams = await IAMService.getByWorkspaceId(workspaceId);
        if(Array.isArray(iams) && iams.length) return res.status(200).json(iams);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/iam:
 *  post:
 *      summary: Create a new IAM
 *      tags: [IAMs]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/iamToCreate'
 *      responses:
 *          200:
 *              description: IAM created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/iam'
 *          404:
 *              description: IAM not found
 *                                
 */

router.post('/', async (req, res) => {
    const { body } = req;
    try{
        if(
            "workspaceId" in body && typeof body.workspaceId === "string" &&
            "password" in body && typeof body.password === "string"
        ){
            const iam = await IAMService.create(body);
            return res.status(200).json(iam);
        }
        return res.status(400).json({message: "Invalid body"});
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/iam/{id}:
 *  put:
 *      summary: Updates IAM by id
 *      tags: [IAMs]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: IAM id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/iamToUpdate'
 *      responses:
 *          200:
 *              description: IAM updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/iam'
 *          404:
 *              description: IAM not found
 *                                
 */

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try{
        const iam = await IAMService.update(id, body);
        if(iam) return res.status(200).json(iam);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/iam/{id}:
 *  delete:
 *      summary: Deletes an IAM by id
 *      tags: [IAMs]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: IAM id
 *      responses:
 *          200:
 *              description: IAM deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: IAM not found
 *                                
 */

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const iam = await IAMService.delete(id);
        if(iam) return res.status(200).json(location);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

module.exports = router;