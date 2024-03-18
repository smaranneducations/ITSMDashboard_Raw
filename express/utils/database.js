import sql from 'mssql';
import config from './mssqlconfig.js';

export async function getColumnNames(tableName) {
    try {
        await sql.connect(config);
        const query = `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'`;
        const result = await sql.query(query);
        if (result.recordset.length === 0) {
            throw new Error(`Table '${tableName}' does not exist.`);
        }
        const columns = result.recordset.map(row => ({
            name: row.COLUMN_NAME,
            dataType: row.DATA_TYPE
        }));
        return columns;
    } catch (err) {
        throw err;
    } finally {
        sql.close();
    }
}



// Function to connect to the database and fetch data
export async function fetchData(tableName) {
    try {
        await sql.connect(config);
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




export async function insertOrUpdateRecord_Sceanrio(tableName, records) {
    let updatedCount = 0;
    let insertedCount = 0;
    let statusText = '';


    try {
        await sql.connect(config);
        for (let record of records) {
            // Check if the record exists in the table based on the unique identifier (ScenarioCode)
            const queryCheckExistence = `SELECT COUNT(*) AS count FROM ${tableName} WHERE ScenarioCode = '${record.ScenarioCode}'`;
            const result = await sql.query(queryCheckExistence);
            const recordExists = result.recordset[0].count > 0;
            try{
            // If the record exists, update it. If not, insert a new record
            if (recordExists) {
                const queryUpdate = `UPDATE ${tableName} SET ScenarioOpen = '${record.ScenarioOpen}', ScenarioName = '${record.ScenarioName}', ScenarioDescription = '${record.ScenarioDescription}', UD1 = '${record.UD1}', UD2 = '${record.UD2}', UD3 = '${record.UD3}', DocAttachments = '${record.DocAttachments}' WHERE ScenarioCode = '${record.ScenarioCode}'`;
                await sql.query(queryUpdate);
                updatedCount++;
            } else {
                const columns = Object.keys(record).filter(key => key !== 'ScenarioCode').join(', ');
                const values = Object.values(record).filter(value => value !== record.ScenarioCode).map(value => `'${value}'`).join(', ');
                const queryInsert = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
                await sql.query(queryInsert);
                insertedCount++;
            }
       }
            catch (err) {
                throw err
                const errortext1 =   err ;
        }
        
    }statusText = `${updatedCount} records updated successfully, ${insertedCount} records inserted successfully`;
    console.log(statusText);
} catch (err) {
    throw err
        const errortext =   err ; // Re-throw the error to propagate it further if needed
        console.log(statusText);
    } finally {
        statusText = `${updatedCount} records updated successfully, ${insertedCount} records inserted successfully`;
        console.log(statusText);
        return  {statusText , err};
        await sql.close(); 
    }

}