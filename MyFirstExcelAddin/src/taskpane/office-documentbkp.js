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
        Office.context.ui.displayDialogAsync('https://localhost:3002/confirmationDialog.html');
      }

      return context.sync();
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export { createExcelTable };
===================================================================================================
import fetch from 'node-fetch';

const createExcelTable = async (tableName) => {
  try {
    const response = await fetch(`http://localhost:3001/api/fetchdata/${tableName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    const headers = Object.keys(data[0]);

    await Excel.run(async (context) => {
      const sheets = context.workbook.worksheets;
      sheets.load("items,name");
      await context.sync();
      let sheet = sheets.items.find(sheet => sheet.name === tableName);

      if (!sheet) {
        sheet = sheets.add(tableName);
      }

      let table = sheet.tables.getItemOrNullObject(tableName);
      table.load("name");
      await context.sync();

      if (!table.isNullObject) {
        const tableRange = table.getRange();
        tableRange.load("address");
        await context.sync();

        const tableAddress = tableRange.address;

        let dataRange = sheet.getRange(tableAddress).load(["rowCount", "values"]);
        await context.sync();

        for (let row = 0; row < data.length; row++) {
          const scenarioCode = data[row]["ScenarioCode"];
          console.log(" data[row]", Object.values(data[row]));

          for (let i = 1; i < dataRange.rowCount; i++) {
            const scenarioCode1 = dataRange.values[i][0];
            await context.sync();

            const tableValues = dataRange.values.map(row => row[0]);
            console.log(" tableValues", tableValues);
            await context.sync();

            const matchingRowIndex = tableValues.indexOf(scenarioCode);
            console.log(" scenarioCode", scenarioCode);
            console.log(" matchingRowIndex", matchingRowIndex);
            await context.sync();

            if (matchingRowIndex !== -1) {
              const rowToUpdate = dataRange.getRow(matchingRowIndex);
              await context.sync();
              rowToUpdate.load("values");
              await context.sync();
              console.log(JSON.stringify(rowToUpdate.values, null, 4));
              console.log(rowToUpdate);
              rowToUpdate.values = [Object.values(data[row])];
              await context.sync();
            } else {
              table.rows.add(null, [[data[i][headers[0]], ...headers.slice(1).map(header => data[i][header])]]);
            }
          }

          await context.sync();
        }
      } else {
        const lastRowIndex = data.length + 1;
        const lastColumnIndex = headers.length;
        const range = sheet.getRangeByIndexes(0, 0, lastRowIndex, lastColumnIndex);
        range.values = [headers, ...data.map(row => headers.map(header => row[header]))];

        const tableRange = sheet.getRangeByIndexes(0, 0, lastRowIndex, lastColumnIndex);
        table = sheet.tables.add(tableRange, true);
        table.name = tableName;
      }

      return context.sync();
    });
  } catch (error) {
    console.error("Error:", error)
  }
};

export { createExcelTable };
