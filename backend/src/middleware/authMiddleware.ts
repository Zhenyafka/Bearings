import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../controllers/authorizationController";
import {Role} from "../models/user";


const SECRET_KEY = JWT_SECRET;
// const SECRET_KEY = 'your_jwt_secret_key';
// const SECRET_KEY = 'your_secret_key';

interface CustomRequest extends Request {
    user?: any;
}

export function authenticateJWT(requiredRole?: Role) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, SECRET_KEY, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                console.log(`requiredRole: ${requiredRole}, user: ${user}, user.property: ${Object.getOwnPropertyNames(user)}`);
                if (requiredRole && typeof user === 'object' && user !== null && 'role' in user) {
                    console.log('WE ARE HERE')
                    if (!requiredRole && user.role !== requiredRole) {
                        return res.status(403).json({message: 'Access forbidden: insufficient role.'});
                    }
                }
                next();
            });
        } else {
            res.sendStatus(401);
        }
        console.log('Decoded user:', req.user);
    }

}