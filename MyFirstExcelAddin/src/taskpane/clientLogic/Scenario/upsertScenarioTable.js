const upsertScenarioTable = async (tableName) => {
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
  
      // Log the information and return it
      console.log(JSON.stringify(returnObjects));
      return returnObjects;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  // This function converts a 2D array of values into a generic JSON object.
  function returnObjectFromValues(values, keys) {
    let objectArray = [];
    for (let i = 1; i < values.length; i++) {
      let object = {};
      for (let j = 0; j < values[i].length; j++) {
        object[keys[j]] = values[i][j];
      }
      objectArray.push(object);
    }
    return objectArray;
  }
  
  
  export { upsertScenarioTable };