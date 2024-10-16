import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from "../models/user";


const SECRET_KEY = 'your_secret_key';


export async function login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }
    if (!bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).send('Invalid username or password');
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
}

