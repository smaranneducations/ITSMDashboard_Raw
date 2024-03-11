import express from 'express';
import cors from 'cors';
import router from './routers.js';
import http from 'http';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();

// Use the CORS middleware
app.use(cors());

// Use the router
app.use('/', router);

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// HTTP server
const httpServer = http.createServer(app);
const httpPort = 3001; // or any other port you prefer for HTTP

httpServer.listen(httpPort, () => {
  console.log(`HTTP server running on port ${httpPort}`);
});

// HTTPS server (without SSL certificates, for demonstration purposes only)
const httpsServer = https.createServer({
  key: fs.readFileSync('localhost+2-key.pem'), // You should generate your own SSL key
  cert: fs.readFileSync('localhost+2.pem') // You should generate your own SSL certificate
}, app);
const httpsPort = 3002; // or any other port you prefer for HTTPS

httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS server running on port ${httpsPort}`);
});
