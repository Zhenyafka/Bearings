import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const SECRET_KEY = 'your_secret_key';

const users = [
    { id: 1, username: 'admin', passwordHash: bcrypt.hashSync('adminpass', 10) },
    { id: 2, username: 'user', passwordHash: bcrypt.hashSync('userpass', 10) }
];

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

