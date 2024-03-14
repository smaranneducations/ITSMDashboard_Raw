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

// Function to connect to the database and get column names
async function getColumnNames(tableName) {
    try {
        await sql.connect(config);
        const query = `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'`;
        const result = await sql.query(query);
        const columns = result.recordset.map(row => ({
            name: row.COLUMN_NAME,
            dataType: row.DATA_TYPE
        }));
        console.log('Column Names:', columns);
        return columns;
    } catch (err) {
        console.error('Error fetching column names:', err);
    } finally {
        sql.close();
    }
}

// Function to connect to the database and fetch data
async function fetchData(tableName) {
    try {
        await sql.connect(config);
        const query = `SELECT * FROM ${tableName}`;
        const result = await sql.query(query);
        console.log('Fetched data:', result.recordset);
        return result.recordset;
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        sql.close();
    }
}

// Example usage:
const tableName = 'Scenario';
getColumnNames(tableName);
fetchData(tableName);
