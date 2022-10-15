import express from 'express';
const router = express.Router();
import { ItemService } from '../services/itemService';

/**
 * @swagger
 * /api/item:
 *  get:
 *      summary: Return all items
 *      tags: [Items]
 *      responses:
 *          200:
 *              description: Item
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/item'
 *          404:
 *              description: Item not found
 *                                                               
 */

router.get('/', async (req, res) => {
    const items = await ItemService.getAll();
    return res.status(200).json(items);
});

/**
 * @swagger
 * /api/item/category/{categoryId}:
 *  get:
 *      summary: Return Categories tree by parentId
 *      tags: [Items]
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              schema:
 *                  type: string
 *              required: true
 *              description: Category id
 *      responses:
 *          200:
 *              description: list of all items in a category tree
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/category'
 *                                
 */

router.get('/category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    try{
        const items = await ItemService.getAllByCategoryId(categoryId);
        if(Array.isArray(items) && items.length) return res.status(200).json(items);

        return res.status(404).send();
    }catch(error){
        return res.status(500).send(error);
    }
});


/**
 * @swagger
 * /api/item/{id}:
 *  get:
 *      summary: Return item by id
 *      tags: [Items]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: item id
 *      responses:
 *          200:
 *              description: list of all items
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/item'
 *          404:
 *              description: Item not found
 *                                
 */

router.get('/:id', async (req, res) => {
    const { id } = req.params;    
    try{
        const item = await ItemService.getById(id);
        if(item) return res.status(200).json(item);

        return res.status(404).json();
    }catch(error){
        return res.status(500).json(error);
    }
});

/**
 * @swagger
 * /api/item:
 *  post:
 *      summary: Create a new item
 *      tags: [Items]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/itemToCreate'
 *      responses:
 *          200:
 *              description: Item created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/item'
 *          404:
 *              description: Item not found
 *                                
 */

router.post('/', async (req, res) => {
    const { body } = req;
    try{
        if(
            "name" in body && typeof body.name === "string" &&
            "typeId" in body && typeof body.typeId === "string" &&
            "locationId" in body && typeof body.locationId === "string" &&
            "workspaceId" in body && typeof body.workspaceId === "string"
        ){
            const item = await ItemService.create(body);
            return res.status(200).json(item);
        }
        return res.status(400).json({message: "Invalid data"});
    }catch(error){
        return res.status(500).json(error);
    }
});

/**
 * @swagger
 * /api/item/{id}:
 *  put:
 *      summary: Updates item by id
 *      tags: [Items]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: item id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/itemToUpdate'
 *      responses:
 *          200:
 *              description: Item updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/item'
 *          404:
 *              description: Item not found
 *                                
 */

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try{
        const item = await ItemService.update(id, body);
        if(item) return res.status(200).json(item);

        return res.status(404).json();
    }catch(error){
        return res.status(500).json(error);
    }
});

/**
 * @swagger
 * /api/item/{id}:
 *  delete:
 *      summary: Deletes a item by id
 *      tags: [Items]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: item id
 *      responses:
 *          200:
 *              description: Item deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: Item not found
 *                                
 */

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const item = await ItemService.delete(id);
        if(item) return res.status(200).json(item);

        return res.status(404).json();
    }catch(error){
        return res.status(500).json(error);
    }
});

module.exports = router;