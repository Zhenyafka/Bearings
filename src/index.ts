import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import {getBearings, getBrands, getBearingsByPrice, getBearingsByBrand} from './controllers/bearingsController';


const app = express();

const PORT = 8080;

/**
 * Read the private key and certificate files for HTTPS.
 * @see https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
 */
const privateKey = fs.readFileSync(path.join(__dirname, './certs/key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, './certs/cert.pem'), 'utf8');

/**
 * Create an object with the private key and certificate for HTTPS.
 * @type {{ key: string; cert: string }}
 */
const credentials = { key: privateKey, cert: certificate };

/**
 * Define routes for the application.
 */
app.get('/bearings', getBearings);
app.get('/brands', getBrands);
app.get('/bearings/sorted/price', getBearingsByPrice);
app.get('/bearings/:brand', getBearingsByBrand);

/**
 * Create an HTTPS server instance.
 * @see https://nodejs.org/api/https.html#httpscreateserveroptions-requestlistener
 */
const httpsServer = https.createServer(credentials, app);

/**
 * Start the HTTPS server and listen on the specified port.
 */
httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});