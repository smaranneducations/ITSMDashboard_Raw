
import dotenv from 'dotenv';
let result = dotenv.config();

/* const user = String(process.env.DB_USER);
console.log('user', user);
console.log(typeof (user)); */

const mssqlconfig = {
    user: "jaihanuman" ,
    password: "Welcome123!",
    server: "itsmdashboard1.database.windows.net",
    database: "ITSMDashboard",
    options: {
        trustedConnection: false, // Change to true if using Windows authentication
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

export default mssqlconfig;


/* user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
server: process.env.DB_SERVER,
database: process.env.DB_DATABASE, */



