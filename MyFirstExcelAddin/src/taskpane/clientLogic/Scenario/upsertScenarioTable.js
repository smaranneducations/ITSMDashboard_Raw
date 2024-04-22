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

    return JSON.stringify(returnObjects);
    console.log("returnObjects", returnObjects);
  } catch (error) {
    throw error; // Re-throw the error for further handling if necessary
  }
}

// This function converts a 2D array of values into a generic JSON object,
// filtering based on the value in the 8th column (index 7).
function returnObjectFromValues(values, keys) {
  let objectArray = [];
  for (let i = 0; i < values.length; i++) { // Start loop from 0 to include all rows
    let object = {};
    for (let j = 0; j < values[i].length; j++) {
      object[keys[j]] = values[i][j];
    }
    // Only add the object if the 8th column is "To be updated" or "To be inserted"

    if (values[i][8] === "To be updated" || values[i][8] === "To be inserted") {
      objectArray.push(object);

    }
  }
  return objectArray;
}

export { upsertScenarioTable };
