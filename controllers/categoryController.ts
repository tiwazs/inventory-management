import express, {Request } from 'express';
import { CategoryService } from '../services/categoryService';
const router = express.Router();

/**
 * @swagger
 * /api/category:
 *  get:
 *      summary: Return all categories
 *      tags: [Categories]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: list of all categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/category'
 *                                
 */

router.get('/', async (req, res) => {
    const categories = await CategoryService.getAll();
    return res.status(200).json(categories);
});

/**
 * @swagger
 * /api/category/workspace/{workspaceId}:
 *  get:
 *      summary: Return Categories by workspaceId v
 *      tags: [Categories]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: workspaceId
 *              schema:
 *                  type: string
 *              required: true
 *              description: Workspace id
 *          -   in: query
 *              name: categoryId
 *              schema:
 *                  type: string
 *              required: false
 *              description: Category id
 *      responses:
 *          200:
 *              description: list of all categories for a workspace
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/category'
 *                                
 */

interface CategoriesByWorkspaceQuery {
    categoryId: string;
}

router.get('/workspace/:workspaceId', async (req: Request<{workspaceId: string;},any,any, CategoriesByWorkspaceQuery>, res) => {
    const { workspaceId } = req.params;
    const { categoryId } = req.query;
    try{
        const categories = await CategoryService.getByWorkspaceIdQ(workspaceId, categoryId);
        if (Array.isArray(categories) && categories.length) return res.status(200).json(categories);
        
        return res.status(404).send();
    }catch(error){
        return res.status(500).json(error);
    }
});

/**
 * @swagger
 * /api/category:
 *  post:
 *      summary: Create a new category
 *      tags: [Categories]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/categoryToCreate'
 *      responses:
 *          200:
 *              description: Category created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/category'
 *          404:
 *              description: Category not found
 *                                
 */

router.post('/', async (req, res) => {
    const { body } = req;
    try{
        if(
            "workspaceId" in body && typeof body.workspaceId === "string" &&
            "name" in body && typeof body.name === "string"
        ){
            const category = await CategoryService.create(body);
            return res.status(200).json(category);
        }else{
            return res.status(400).json({message: "Invalid data"});
        }
    }catch(error){
        return res.status(500).json(error);
    }
});

/**
 * @swagger
 * /api/category/{id}:
 *  get:
 *      summary: Return post by id
 *      tags: [Categories]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: category id
 *      responses:
 *          200:
 *              description: list of all categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/category'
 *                                
 */

router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const category = await CategoryService.getById(id);
        
        if (category) return res.status(200).json(category);
                
        return res.status(404).send();
    }catch(error){
        return res.status(500).json(error);
    }
});

//router.put('/:id', async (req, res) => {
//    const { id } = req.params;
//    const { body } = req;
//    try{
//        if(
//            "name" in body && typeof body.name === "string" &&
//            "email" in body && typeof body.email === "string" &&
//            "password" in body && typeof body.password === "string"
//        ){
//            const category = await CategoryService.update(id, body);
//            return res.status(200).json(category);
//        }else{
//            return res.status(400).json({message: "Invalid data"});
//        }
//    }catch(err){
//        return res.status(400).json({message: "Invalid data"});
//    }
//});

/**
 * @swagger
 * /api/category/{id}:
 *  delete:
 *      summary: Deletes a category by id
 *      tags: [Categories]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: category id
 *      responses:
 *          200:
 *              description: Category deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: Category not found
 *                                
 */

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const category = await CategoryService.delete(id);
        
        if(category) return res.status(200).json(category);
        
        return res.status(404).send();
    }catch(error){
        return res.status(500).json(error);
    }
});

module.exports = router;