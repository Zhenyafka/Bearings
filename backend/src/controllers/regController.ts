import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import {pool} from "../components/db";

export async function register(req: Request, res: Response) {
    console.log("Registration endpoint hit");
    // Extract user data from the request body
    const { username, email, password, first_name, last_name, phone_number, city, role_id } = req.body;

    try {
        // Check if the username or email already exists
        const accountExists = await pool.query(
            'SELECT * FROM accounts WHERE username = $1 OR email = $2',
            [username, email]
        );

        // If the account exists, return a 400 error
        if (accountExists.rows.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the account data into the database
        const accountInsertQuery = `
            INSERT INTO accounts (username, email, role_id) 
            VALUES ($1, $2, $3) 
            RETURNING account_id
        `;
        const accountResult = await pool.query(accountInsertQuery, [username, email, role_id]);

        // Get the account ID from the query result
        const accountId = accountResult.rows[0].account_id;

        // Insert the user data into the database
        const userInsertQuery = `
            INSERT INTO users (account_id, first_name, last_name, phone_number, city) 
            VALUES ($1, $2, $3, $4, $5)
        `;
        await pool.query(userInsertQuery, [accountId, first_name, last_name, phone_number, city]);

        // Insert the password data into the database
        const passwordInsertQuery = `
            INSERT INTO passwords (account_id, password_hash) 
            VALUES ($1, $2)
        `;
        await pool.query(passwordInsertQuery, [accountId, hashedPassword]);

        // Return a success message with a 201 status code
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        // Log any errors that occur during registration
        console.error('Error during registration:', error);
        // Return a 500 error with a generic error message
        res.status(500).json({ message: 'Server error during registration' });
    }
}