// Configuration for the SQL Server connection
const config = {
    user: 'admin',
    password: 'Welcome123!',
    server: 'localhost',
    database: 'ITSMDashboard',
    
    options: {
        trustedConnection: false, // Change to true if using Windows authentication
        trustServerCertificate: true
    }
};

export default config;
