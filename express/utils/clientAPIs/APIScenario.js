import express from 'express';
import bodyParser from 'body-parser';
import { getColumnNames, fetchData, insertOrUpdateRecord_Sceanrio, deleteRecordsByScenarioCode, fetchDataByFilter } from '../databaseCRUD/CRUDScenario.js';

const ScenarioRouter = express.Router();

// API endpoint to get column names and types for a given table
ScenarioRouter.get('/api/columns/:tableName', async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const columnsInfo = await getColumnNames(tableName);
    res.json(columnsInfo);
  } catch (error) {
    res.status(500).send(error.message); 
  }
});

ScenarioRouter.get('/api/fetchdata/:tableName', async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const data = await fetchData(tableName);
    
    // Explicitly set the Content-Type header
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// API endpoint to insert or update a record in a given table
ScenarioRouter.post('/api/insertorupdaterecord_Scenario/:tableName', bodyParser.json(), async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const record = req.body; // Assuming the request body contains the record data
    const rowsAffected = await insertOrUpdateRecord_Sceanrio(tableName, record);
    
    // Prepare the response
    const response = {
      rowsAffected
    };

    res.status(200).json(response); // Send the response
  } catch (error) {
    res.status(500).send(error.message); 
  }
});

// API endpoint to delete records by Scenario code
ScenarioRouter.post('/api/deleteRecordsByScenarioCode/:tableName', bodyParser.json(), async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const scenarioCodes = req.body; // Expecting an array of ScenarioCodes in the request body

    // Call the delete function
    const { statusText, err } = await deleteRecordsByScenarioCode(tableName, scenarioCodes);

    if (err) {
      throw new Error(err);
    }

    // Prepare and send the response
    res.status(200).json({ message: statusText });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// API endpoint to fetch data by filter
ScenarioRouter.post('/api/fetchDataByFilter/:tableName', bodyParser.json(), async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const filterConditions = req.body; // Expecting an array of filter conditions in the request body
    
    console.log("Received filter conditions:", filterConditions); // Log to see what is received

    // Call the fetch data by filter function
    const data = await fetchDataByFilter(tableName, filterConditions);
    res.json(data);
  } catch (error) {
    console.error("Error in fetching data:", error); // More detailed error logging
    res.status(500).send( error.message);
  }
});


export default ScenarioRouter;
