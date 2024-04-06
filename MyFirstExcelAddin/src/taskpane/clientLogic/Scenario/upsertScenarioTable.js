import axios from 'axios';

const upsertScenarioTable = async (context, tableName) => {
  try {
    let returnObjects = [];
    await Excel.run(async (context) => {
      const table = context.workbook.tables.getItem(tableName);

      // Load the table and its range
      table.load('rowCount');
      const range = table.getDataBodyRange();
      range.load('values');

      // Load table columns
      const columns = table.columns.load('name');

      await context.sync();

      // Get all the values from the table
      const values = range.values;

      // Get column names
      const columnNames = columns.items.map(column => column.name);

      // Create an array of JSON objects that match the row structure
      if (values.length > 0) {
        returnObjects = returnObjectFromValues(values, columnNames);
      }
    });

    console.log("returnObjects:", JSON.stringify(returnObjects));

    // Here you send the JSON.stringify(returnObjects) via axios
    const response = await axios.post(`http://localhost:3001/api/insertorupdaterecord_Scenario/${tableName}`, JSON.stringify(returnObjects), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Response from the server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in upsertScenarioTable:", error);
    throw error; // Re-throw the error for further handling if necessary
  }
}

// This function converts a 2D array of values into a generic JSON object.
function returnObjectFromValues(values, keys) {
  let objectArray = [];
  for (let i = 0; i < values.length; i++) { // Start loop from 0 to include all rows
    let object = {};
    for (let j = 0; j < values[i].length; j++) {
      object[keys[j]] = values[i][j];
    }
    objectArray.push(object);
  }
  return objectArray;
}

export { upsertScenarioTable };
