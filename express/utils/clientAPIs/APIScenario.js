import express from 'express';
import bodyParser from 'body-parser';
import { getColumnNames,fetchData, insertOrUpdateRecord_Sceanrio, deleteRecordsByScenarioCode } from '../databaseCRUD/CRUDScenario.js';


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

// API endpoint to fetch data from a given table
ScenarioRouter.get('/api/fetchdata/:tableName', async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const data = await fetchData(tableName);
    console.log('data:', data);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message); 
  }
});

// API endpoint to insert or update a record in a given table
ScenarioRouter.post('/api/insertorupdaterecord_Scenario/:tableName',bodyParser.json(), async (req, res) => {
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

ScenarioRouter.post('/api/deleteRecordsByScenarioCode/:tableName', bodyParser.json(), async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const scenarioCodes = req.body; // Expecting an array of ScenarioCodes in the request body
    console.log('scenarioCodes:', scenarioCodes);

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

export default ScenarioRouter;
