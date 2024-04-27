import express from 'express';
import cors from 'cors';
import ScenarioRouter from './utils/clientAPIs/APIScenario.js';
import http from 'http';
import https from 'https';
import fs from 'fs';

const app = express();

// Use the CORS middleware
app.use(cors());

app.use(express.static('public'));

// Properly configure body parsing with increased limits
app.use(express.json({ limit: '1000mb' }));  // for parsing application/json
app.use(express.urlencoded({ limit: '1000mb', extended: true }));  // for parsing application/x-www-form-urlencoded

// Use the router
app.use('/', ScenarioRouter);

// HTTP server
const httpServer = http.createServer(app);
const httpPort = 3001;

httpServer.listen(httpPort, () => {
  console.log(`HTTP server running on port ${httpPort}`);
});

// HTTPS server
const httpsServer = https.createServer({
  key: fs.readFileSync('localhost+2-key.pem'),
  cert: fs.readFileSync('localhost+2.pem')
}, app);
const httpsPort = 3002;

httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS server running on port ${httpsPort}`);
});
