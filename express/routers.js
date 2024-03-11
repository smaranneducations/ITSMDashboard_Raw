import express from 'express';
import { getColumnNames,fetchData, insertOrUpdateRecord_Sceanrio } from './utils/database.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World by bhasker');
});

// API endpoint to get column names and types for a given table
router.get('/api/columns/:tableName', async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const columnsInfo = await getColumnNames(tableName);
    res.json(columnsInfo);
  } catch (error) {
    res.status(500).send(error.message); 
  }
});

// API endpoint to fetch data from a given table
router.get('/api/fetchdata/:tableName', async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const data = await fetchData(tableName);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message); 
  }
});

// API endpoint to insert or update a record in a given table
router.post('/api/insertorupdaterecord_Scenario/:tableName',bodyParser.json(), async (req, res) => {
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

export default router;
