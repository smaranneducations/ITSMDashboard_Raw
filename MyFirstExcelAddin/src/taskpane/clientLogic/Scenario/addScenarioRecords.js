export const addScenarioRecords = async (context, tableName, code) => {
    try {
      await Excel.run(async (context) => {
        context.application.calculationMode = Excel.CalculationMode.manual;
        context.application.load("calculationMode");
        await context.sync();
  
        // Get the specified worksheet and table
        const sheet = context.workbook.worksheets.getItem(tableName);
        const table = sheet.tables.getItem(tableName);
  
        // Temporarily unprotect the sheet
        sheet.protection.unprotect('Welcome123!');
  
        // Load necessary properties for the table and current selection
        table.load('columns/items');
        const selection = context.workbook.getSelectedRange();
        selection.load('rowIndex');
  
        // Ensure the loaded properties are available for use
        await context.sync();
  
        // Calculate the selected row's position relative to the table
        const tableRange = table.getRange();
        tableRange.load('rowCount, rowIndex');
        await context.sync();
        const selectedRowIndex = selection.rowIndex - tableRange.rowIndex;
  
        // Validate if the selected row is within the table range
        if (selectedRowIndex >= 0 && selectedRowIndex < tableRange.rowCount) {
          const newData = [];
          for (let i = 0; i < code; i++) {
            const newRow = Array(table.columns.items.length).fill(null);
            newData.push(newRow);
          }
  
          // **Fix: Track the added rows for proper management across sync calls**
          const addedRows = table.rows.add(selectedRowIndex, newData);
          const addedRowRange = addedRows.getRange();
         context.trackedObjects.add(addedRowRange);
            await context.sync();
            // Iterate through each row in the added range and update formatting directly
for (let i = 0; i < newData.length; i++) {
    addedRowRange.getCell(i, 2).format.protection.locked = false; // Unlock the cell
    addedRowRange.getCell(i, 2).format.fill.clear(); // Clear any fill formatting
  }
  
          
          // **Important: Remove the added row range from tracked objects after use**
          context.trackedObjects.remove(addedRowRange);
        }
  
        // Reapply protection to the sheet
        sheet.protection.protect({ allowAutoFilter: true, allowSort: true }, 'Welcome123!');
        context.application.calculationMode = Excel.CalculationMode.automatic;
        context.application.load("calculationMode");
        await context.sync();
      });
    } catch (error) {
      console.error("Error adding scenario records: ", error);
    }
  };
  