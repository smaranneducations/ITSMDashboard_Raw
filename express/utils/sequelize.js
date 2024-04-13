// sequelize.js

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mssql',
  dialectOptions: {
    options: {
      trustServerCertificate: true // Assuming you want to trust the server certificate
    },
  },
  host: 'localhost',
  port: 1433, // Default SQL Server port
  database: 'ITSMDashboard',
  username: 'admin',
  password: 'Welcome123!',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
});

export { sequelize };
