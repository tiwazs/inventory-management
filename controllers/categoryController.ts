import express from 'express';
import { CategoryService } from '../services/categoryService';
const router = express.Router();

/**
 * @swagger
 * /api/category:
 *  get:
 *      summary: Return all categories
 *      tags: [Categories]
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
 * /api/category:
 *  post:
 *      summary: Create a new category
 *      tags: [Categories]
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
    }catch(err){
        return res.status(400).json({message: "Invalid data"});
    }
});

/**
 * @swagger
 * /api/category/{id}:
 *  get:
 *      summary: Return post by id
 *      tags: [Categories]
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
    const { id } = req.params;
    const category = await CategoryService.getById(id);
    return res.status(200).json(category);
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
    const { id } = req.params;
    const category = await CategoryService.delete(id);
    return res.status(200).json(category);
});

module.exports = router;