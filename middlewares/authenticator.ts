const jwt = require("jsonwebtoken");
const logger = require('../utils/logger');
const colorText = require('../utils/colortext');
import { Request, Response } from "express";


const verifyToken = (req:Request, res:Response, next: () => any) => {
    const tokenBearer = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
    logger.debug( colorText(`AUTH MIDDLEWARE: token received: ${tokenBearer}`) );

    if(!tokenBearer) {
        logger.debug( colorText(`AUTH MIDDLEWARE: no token found`) );
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const token = tokenBearer.split("Bearer ")[1];
        logger.debug( colorText(`AUTH MIDDLEWARE: Verifying token: ${token}`) );
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        
        logger.debug( colorText(`AUTH MIDDLEWARE: token validated`) );
        req.body.userDecoded = decoded;
        return next();
    } catch (e) {

        logger.debug( colorText(`AUTH MIDDLEWARE: Invalid token`) );
        return res.status(401).send("Invalid Token");
    }
}

module.exports = verifyToken;