import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = 'your_secret_key';

interface CustomRequest extends Request {
    user?: any;
}

export function authenticateJWT(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}