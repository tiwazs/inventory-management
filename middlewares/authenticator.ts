import jwt from "jsonwebtoken";
import logger from '../lib/logger';
import { Request, Response } from "express";


const authenticator = (req:Request, res:Response, next: () => any) => {
    const tokenBearer = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
    logger.debug( `AUTH MIDDLEWARE: token received: ${tokenBearer}` );

    if(!tokenBearer) {
        logger.debug( `AUTH MIDDLEWARE: no token found` );
        return res.status(403).send({error: "A token is required for authentication"});
    }
    try {
        const token = tokenBearer.split("Bearer ")[1];
        logger.debug( `AUTH MIDDLEWARE: Verifying token: ${token}` );
        const decoded = jwt.verify(token, process.env.TOKEN_KEY!);
        
        logger.debug( `AUTH MIDDLEWARE: token validated` );
        req.body.userDecoded = decoded;
        return next();
    } catch (e) {

        logger.debug( `AUTH MIDDLEWARE: Invalid token` );
        return res.status(401).send({error: "Invalid Token"});
    }
}

export default authenticator;