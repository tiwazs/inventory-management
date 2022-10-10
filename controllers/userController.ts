import express from 'express';
const router = express.Router();
import { UserService } from '../services/userService';

/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: Return all users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: list of all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/user'
 *                                
 */

router.get('/', async (req, res) => {
    const users = await UserService.getAll();
    return res.status(200).json(users);
});

//router.post('/', async (req, res) => {
//    const { body } = req;
//    try{
//        if(
//            "username" in body && typeof body.username === "string" &&
//            "password" in body && typeof body.password === "string" &&
//            "email" in body && typeof body.email === "string"
//        ){
//            const user = await UserService.create(body);
//            return res.status(200).json(user);
//        }
//        return res.status(400).json({message: "Invalid request"});
//    }catch(e){
//        return res.status(400).json({message: `Error creating User ${e}`});
//    }
//});


/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *      summary: Return user by id
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: User
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                                               
 */

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const user = await UserService.getById(id);
        if(user){
            return res.status(200).json(user);
        }
        return res.status(404).json({message: "User not found"});
    }catch(e){
        return res.status(400).json({message: `Error finding User ${e}`});
    }
});

/**
 * @swagger
 * /api/user/email/{email}:
 *  get:
 *      summary: Return user by email
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: email
 *              schema:
 *                  type: string
 *              required: true
 *              description: user email
 *      responses:
 *          200:
 *              description: User
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                                               
 */

router.get('/email/:email', async (req, res) => {
    const { email } = req.params;
    try{
        const user = await UserService.getEmail(email);
        if(user){
            return res.status(200).json(user);
        }
        return res.status(404).json({message: "User not found"});
    }catch(e){
        return res.status(400).json({message: `Error finding User ${e}`});
    }
});

/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *      summary: Updates user
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                
 */

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try{
        if(
            "name" in body && typeof body.name === "string" &&
            "password" in body && typeof body.password === "string" &&
            "firstName" in body && typeof body.firstName === "string" &&
            "lastName" in body && typeof body.lastName === "string"
        ){
            const user = await UserService.update(id, body);
            if(user){
                return res.status(200).json(user);
            }
            return res.status(404).json({message: "User not found"});
        }
        return res.status(400).json({message: "Invalid request"});
    }catch(e){
        return res.status(400).json({message: `Error updating User ${e}`});
    }
});

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *      summary: Deletes a user by id
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: User not found
 *                                
 */

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const user = await UserService.delete(id);
        if(user){
            return res.status(200).json(user);
        }
        return res.status(404).json({message: "User not found"});
    }catch(e){
        return res.status(400).json({message: `Error deleting User ${e}`});
    }
});

module.exports = router;