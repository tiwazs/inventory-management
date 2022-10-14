import express from 'express';
const router = express.Router();
import { LocationService } from '../services/locationService';

/**
 * @swagger
 * /api/location:
 *  get:
 *      summary: Return all locations
 *      tags: [Locations]
 *      responses:
 *          200:
 *              description: Location
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/location'
 *          404:
 *              description: Location not found
 *                                                               
 */

router.get('/', async (req, res) => {
    const locations = await LocationService.getAll();
    return res.status(200).json(locations);
});

/**
 * @swagger
 * /api/location:
 *  post:
 *      summary: Create a new location
 *      tags: [Locations]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/locationToCreate'
 *      responses:
 *          200:
 *              description: Location created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/location'
 *          404:
 *              description: Location not found
 *                                
 */

router.post('/', async (req, res) => {
    const { body } = req;
    try{
        if(
            "workspaceId" in body && typeof body.workspaceId === "string" &&
            "name" in body && typeof body.name === "string"
        ){
            const location = await LocationService.create(body);
            return res.status(200).json(location);
        }
        return res.status(400).json({message: "Invalid body"});
    }catch(error){
        return res.status(500).json(error);
    }
});

/**
 * @swagger
 * /api/location/{id}:
 *  get:
 *      summary: Return location by id
 *      tags: [Locations]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: location id
 *      responses:
 *          200:
 *              description: list of all locations
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/location'
 *          404:
 *              description: Location not found
 *                                
 */

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const location = await LocationService.getById(id);
        if(location) return res.status(200).json(location);

        return res.status(404).json();
    }catch(error){
        return res.status(500).json(error);
    }
});

/**
 * @swagger
 * /api/location/{id}:
 *  put:
 *      summary: Updates location by id
 *      tags: [Locations]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: location id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/locationToUpdate'
 *      responses:
 *          200:
 *              description: Location updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/location'
 *          404:
 *              description: Location not found
 *                                
 */

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try{
        const location = await LocationService.update(id, body);
        if(location) return res.status(200).json(location);

        return res.status(404).json();
    }catch(error){
        return res.status(500).json(error);
    }
});

/**
 * @swagger
 * /api/location/{id}:
 *  delete:
 *      summary: Deletes a location by id
 *      tags: [Locations]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: location id
 *      responses:
 *          200:
 *              description: Location deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: Location not found
 *                                
 */

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const location = await LocationService.delete(id);
        if(location) return res.status(200).json(location);
        
        return res.status(404).json();
    }catch(error){
        return res.status(500).json(error);
    }
});

module.exports = router;