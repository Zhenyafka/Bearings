import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import bearingsRoutes from './routes/bearingsRoutes';
import authRoutes from './routes/authenticationRoutes';
import registerRoutes from './routes/registrationRoutes';



const app = express();
const PORT = 8080;

const privateKey = fs.readFileSync(path.join(__dirname, './certs/key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, './certs/cert.pem'), 'utf8');
const credentials: { key: string; cert: string; } = { key: privateKey, cert: certificate };


app.use(express.json());
app.use('/', registerRoutes);
app.use('/login', authRoutes);
app.use('/api', bearingsRoutes);


const httpsServer = https.createServer(credentials, app);


httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});