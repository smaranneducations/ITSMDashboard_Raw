const createExcelTable = async (tableName) => {
  try {
    const response = await fetch(`http://localhost:3001/api/columns/${tableName}`);
    if (!response.ok) {
      console.log(await response.text().then(text => { throw new Error(text) }));
    }
    const data = await response.json();
    const headers = data.map(column => column.name);

    await Excel.run(async (context) => {
      const sheets = context.workbook.worksheets;
      sheets.load("items,name");
      await context.sync();
      let sheet = sheets.items.find(sheet => sheet.name === tableName);

      let sheetTable = null;
      let sheetAndTableExist = false;
      let onlySheetExists = false;
      let onlyTableExists = false;

      if (sheet) {
        const sheetTables = sheet.tables;
        sheetTables.load("items,name");
        await context.sync();
        sheetTable = sheetTables.items.find(table => table.name === tableName);
        if (sheetTable) {
          sheetAndTableExist = true;
        } else {
          onlySheetExists = true;
        }
      }

      const workbookTables = context.workbook.tables;
      workbookTables.load("items,name");
      await context.sync();
      let workbookTable = workbookTables.items.find(table => table.name === tableName);

      if (workbookTable) {
        if (!sheet) {
          onlyTableExists = true;
        }
      }

      if (!sheetAndTableExist && !onlySheetExists && !onlyTableExists) {
        sheet = sheets.add(tableName);
        const lastColumnIndex = headers.length;
        const range = sheet.getRangeByIndexes(0, 0, 1, lastColumnIndex);
        range.values = [headers];
        const table = sheet.tables.add(range, true);
        table.name = tableName;
        range.getEntireColumn().format.autofitColumns();        
      } else {
        console.log(`Sheet and Table Exist: ${sheetAndTableExist}`);
        console.log(`Only Sheet Exists: ${onlySheetExists}`);
        console.log(`Only Table Exists: ${onlyTableExists}`);
        Office.context.ui.displayDialogAsync('https://localhost:3002/confirmationDialog.html', {height: 10, width: 10, displayInIframe: true});
      }

      return context.sync();
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

const insertDataInTable = async (tableName) => {
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


export { createExcelTable,insertDataInTable };