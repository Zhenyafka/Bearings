CREATE TABLE accounts (
   account_id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL UNIQUE,
   email VARCHAR(255) NOT NULL UNIQUE,
   role_id INT REFERENCES roles(role_id) ON DELETE SET NULL
);

CREATE TABLE users (
   user_id SERIAL PRIMARY KEY,
   account_id INT REFERENCES accounts(account_id) ON DELETE CASCADE,
   first_name VARCHAR(255) NOT NULL,
   last_name VARCHAR(255) NOT NULL,
   phone_number VARCHAR(20),
   city VARCHAR(255)
);

CREATE TABLE passwords (
    account_id INT REFERENCES accounts(account_id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL,
    PRIMARY KEY (account_id)
);

CREATE TABLE roles (
                       role_id SERIAL PRIMARY KEY,
                       role_name VARCHAR(50) UNIQUE NOT NULL
);