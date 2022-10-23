import express from "express";
import { WorkspaceService } from "../services/workspaceService";
const router = express.Router();

/**
 * @swagger
 * /api/workspace:
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

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const workspace = await WorkspaceService.getById(id);
        if(workspace) return res.status(200).json(workspace);

        return res.status(404).send();
    }catch(error){
        return res.status(500).json(error);
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

router.post("/", async (req, res) => {
    const { body } = req;
    try {
        if (
            "userId" in body && typeof body.userId === "string" &&
            "name" in body && typeof body.name === "string"
        ) {
            const workspace = await WorkspaceService.create(body);
            return res.status(200).json(workspace);
        }
        return res.status(400).json({ message: "Invalid request" });
    } catch (error) {
        return res.status(500).json(error);
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

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const workspace = await WorkspaceService.update(id, body);
        if(workspace) return res.status(200).json(workspace);

        return res.status(404).json();
    }catch(error){
        return res.status(500).json(error);
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

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const workspace = await WorkspaceService.delete(id);
        if(workspace) return res.status(200).json(workspace);
        
        return res.status(404).json();
    }catch(error){
        return res.status(500).json(error);
    }
});

module.exports = router;