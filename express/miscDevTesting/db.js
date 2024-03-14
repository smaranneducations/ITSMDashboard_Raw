import sql from 'mssql';

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

// Function to connect to the database and fetch data
async function fetchData() {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Scenario`;
        console.log('Fetched data:', result.recordset);
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        sql.close();
    }
}

// Call the function to fetch data
fetchData();
