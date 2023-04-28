import express from "express";
import logger from "../lib/logger";
import { WorkspaceService } from "../services/workspaceService";
import { RequestWithUser } from "../dataModels/AuthenticationModels";
const router = express.Router();

/**
 * @swagger
 * /api/workspace/getAll/{all}:
 *  get:
 *      summary: Return all workspaces
 *      tags: [Workspaces]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: list of all workspaces
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/workspace'
 *                                
 */

router.get("/getAll/:all", async (req, res) => {
    const workspaces = await WorkspaceService.getAll();
    return res.status(200).json(workspaces);   
});

/**
 * @swagger
 * /api/workspace/{id}:
 *  get:
 *      summary: Return workspace by id
 *      tags: [Workspaces]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: workspace id
 *      responses:
 *          200:
 *              description: Type
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/workspace'
 *          404:
 *              description: Type not found
 *                                                               
 */

router.get("/:id", async (req: RequestWithUser, res) => {
    try{
        const { id } = req.params;
        const { user } = req;
        if(!(await WorkspaceService.isOwner(user.userId, id))) 
            throw new Error("Forbidden: Company Account has no permission to access this workspace");

        const workspace = await WorkspaceService.getById(id);
        if(workspace) return res.status(200).json(workspace);

        return res.status(404).send();
    }catch(error: any){
        logger.error(error.message);
        if(error.message === "Forbidden: Company Account has no permission to access this workspace") 
            return res.status(403).json({error: error.message});
        
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/workspace:
 *  get:
 *      summary: Return All Workspaces for a User
 *      tags: [Workspaces]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Type
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/workspace'
 *          404:
 *              description: Type not found
 *                                                               
 */

router.get('/', async (req: RequestWithUser, res) => {  
    try{
        const { user } = req;

        if(user.userId === undefined) 
            throw new Error("Forbidden: Company Account has no permissions");

        const workspaces = await WorkspaceService.getByUserId(user.userId);
        if(workspaces) return res.status(200).json(workspaces);

        return res.status(404).send();
    }catch(error: any){
        logger.error(error.message);
        if(error.message === "Forbidden: Company Account has no permissions") 
            return res.status(403).json({error: error.message});
        
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/workspace:
 *  post:
 *      summary: Create a new workspace
 *      tags: [Workspaces]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/workspaceToCreate'
 *      responses:
 *          200:
 *              description: Type created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/workspace'
 *          404:
 *              description: Object not found
 *                                
 */

router.post("/", async (req: RequestWithUser, res) => {
    const { body } = req;
    const { user } = req;
    try {
        if (
            "name" in body && typeof body.name === "string"
        ) {
            if(user.userId === undefined) 
                throw new Error("Forbidden: Company Account has no permission to create a workspace");

            body.userId = user.userId;

            const workspace = await WorkspaceService.create(body);
            return res.status(200).json(workspace);
        }
        return res.status(400).json({ message: "Invalid request" });
    } catch (error: any) {
        logger.error(error.message);
        if(error.message === "Forbidden: Company Account has no permission to create a workspace")
            return res.status(403).json({error: error.message});
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/workspace/{id}:
 *  put:
 *      summary: Updates workspace by id
 *      tags: [Workspaces]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: workspace id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/workspaceToUpdate'
 *      responses:
 *          200:
 *              description: Type updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/workspace'
 *          404:
 *              description: Type not found
 *                                
 */

router.put("/:id", async (req: RequestWithUser, res) => {
    const { id } = req.params;
    const { body } = req;
    const { user } = req;
    try {
        if(!(await WorkspaceService.isOwner(user.userId, id))) 
            throw new Error("Forbidden: Company Account has no permission over this workspace");

        const workspace = await WorkspaceService.update(id, body);
        if(workspace) return res.status(200).json(workspace);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        if(error.message === "Forbidden: Company Account has no permission over this workspace")
            return res.status(403).json({error: error.message});
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/workspace/{id}:
 *  delete:
 *      summary: Deletes a workspace by id
 *      tags: [Workspaces]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: workspace id
 *      responses:
 *          200:
 *              description: workspace deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: type not found
 *                                
 */

router.delete("/:id", async (req: RequestWithUser, res) => {
    const { id } = req.params;
    const { user } = req;
    try{
        if(!(await WorkspaceService.isOwner(user.userId, id))) 
            throw new Error("Forbidden: Company Account has no permission over this workspace");

        const workspace = await WorkspaceService.delete(id);
        if(workspace) return res.status(200).json(workspace);
        
        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        if(error.message === "Forbidden: Company Account has no permission over this workspace")
            return res.status(403).json({error: error.message});
        return res.status(500).json({error: error.message});
    }
});

module.exports = router;