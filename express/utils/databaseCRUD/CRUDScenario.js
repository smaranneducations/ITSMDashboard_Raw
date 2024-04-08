import sql from 'mssql';
import mssqlconfig from '../../mssqlconfig.js';

async function getColumnNames(tableName) {
    try {
        await sql.connect(mssqlconfig);
        const query = `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'`;
        const result = await sql.query(query);
        if (result.recordset.length === 0) {
            throw new Error(`Table '${tableName}' does not exist.`);
        }
        const columns = result.recordset.map(row => ({
            name: row.COLUMN_NAME,
            dataType: row.DATA_TYPE
        }));
        console.log('Columns:', columns);
        return columns;
        
    } catch (err) {
        throw err;
    } finally {
        sql.close();
    }
}



// Function to connect to the database and fetch data
async function fetchData(tableName) {
    try {
        await sql.connect(mssqlconfig);
        const query = `SELECT * FROM ${tableName}`;
        const result = await sql.query(query);
        console.log('Fetched data:', result.recordset);
        return result.recordset;
    } catch (err) {
        throw err;
    } finally {
        sql.close();
    }
}



//https://stackoverflow.com/questions/11010511/how-to-upsert-update-or-insert-in-sql-server-2005
// this has a lot of error handling and performance improvements to be done
async function insertOrUpdateRecord_Sceanrio(tableName, records) {
    let updatedCount = 0;
    let insertedCount = 0;
    let statusText = '';
    let err = '';

    try {
        await sql.connect(mssqlconfig);
        for (let record of records) {
            // Prepend the USE statement to ensure the correct database context
            const useDatabase = `USE [ITSMDashboard];`;
            
            // Check if the record exists in the table based on the unique identifier (ScenarioCode)
            const queryCheckExistence = `${useDatabase} SELECT COUNT(*) AS count FROM ${tableName} WHERE ScenarioCode = '${record.ScenarioCode}'`;
            const result = await sql.query(queryCheckExistence);
            const recordExists = result.recordset[0].count > 0;
            
            if (recordExists) {
                // Construct and execute the update query
                const queryUpdate = `${useDatabase} UPDATE ${tableName} SET ScenarioOpen = '${record.ScenarioOpen}', ScenarioName = '${record.ScenarioName}', ScenarioDescription = '${record.ScenarioDescription}', UD1 = '${record.UD1}', UD2 = '${record.UD2}', UD3 = '${record.UD3}', DocAttachments = '${record.DocAttachments}' WHERE ScenarioCode = '${record.ScenarioCode}'`;
                await sql.query(queryUpdate);
                updatedCount++;
            } else {
                // Exclude 'ScenarioCode' and 'IsUnique' from the insert columns and values
                const entries = Object.entries(record).filter(([key, value]) => key !== 'ScenarioCode' && key !== 'IsUnique' && value !== undefined);
                const columns = entries.map(([key]) => key).join(', ');
                const values = entries.map(([, value]) => `'${value}'`).join(', ');
                // Include the USE statement before the insert query
                const queryInsert = `${useDatabase} INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
                await sql.query(queryInsert);
                insertedCount++;
            }
        }

        statusText = `${updatedCount} records updated successfully, ${insertedCount} records inserted successfully.`;
    } catch (error) {
        err = error.message; // Capture the error message
        console.error("Error:", err);
    } finally {
        console.log(statusText);
        await sql.close();
        // Return both statusText and err (if any error occurred)
        return { statusText, err };
    }
}


export  { getColumnNames, fetchData, insertOrUpdateRecord_Sceanrio };