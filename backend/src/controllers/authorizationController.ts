import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {pool} from "../components/db";

const JWT_SECRET = 'your_jwt_secret_key';
export async function login(req: Request, res: Response) {
    //1. Get login and password from the request body
    const { username, password } = req.body;

    //2. Check if the user exists in the database
    try {
        const userQuery = `
            SELECT a.account_id, a.username, a.email, p.password_hash 
            FROM accounts a 
            JOIN passwords p ON a.account_id = p.account_id
            JOIN roles r ON a.role_id = r.role_id
            WHERE a.username = $1 OR a.email = $2
        `;
        const userResult = await pool.query(userQuery, [username, username]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = userResult.rows[0];

        //3. Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        //4. Create a JWT token
        const token = jwt.sign(
            { account_id: user.account_id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );


        return res.status(200).json({ token, message: 'Authorization successful' });
    } catch (error) {
        console.error('Error during authorization:', error);
        res.status(500).json({ message: 'Server error during authorization' });
    }
}

