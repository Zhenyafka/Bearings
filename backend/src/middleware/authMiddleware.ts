import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = 'your_secret_key';

interface CustomRequest extends Request {
    user?: any;
}

export function authenticateJWT(requiredRole?: string) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, SECRET_KEY, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                if (requiredRole && typeof user === 'object' && user !== null && 'role' in user) {
                    if (!requiredRole && user.role !== requiredRole) {
                        return res.status(403).json({message: 'Access forbidden: insufficient role.'});
                    }
                }
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
}