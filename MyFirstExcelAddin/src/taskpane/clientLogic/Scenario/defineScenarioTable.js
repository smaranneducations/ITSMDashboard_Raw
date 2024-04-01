import axios from 'axios';
import { store } from '../../store/store'; // Adjust the path as necessary
import { addLog } from '../../store/slices/logSlice'; // Adjust the path as necessary


const defineScenarioTable = async (tableName) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/columns/${tableName}`);
    const data = response.data;
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
        store.dispatch(addLog(`Sheet and Table Exist: ${sheetAndTableExist}`));
        store.dispatch(addLog(`Only Sheet Exists: ${onlySheetExists}`));
        store.dispatch(addLog(`Only Table Exists: ${onlyTableExists}`));
        Office.context.ui.displayDialogAsync('https://localhost:3002/confirmationDialog.html', {height: 10, width: 10, displayInIframe: true});
      }

      return context.sync();
    });
  } catch (error) {
    store.dispatch(addLog(`Error: ${error.toString()}`));
  }
};

export { defineScenarioTable };