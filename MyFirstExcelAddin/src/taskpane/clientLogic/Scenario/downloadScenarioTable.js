

export const downloadScenarioTable = async (apiData,context, tableName) => {
  if (!apiData) {
    console.error('No data provided to reset scenario records');
    return;
  }

  try {
    
    const data = apiData;

    const result = await Excel.run(async (localContext) => {
      try {
        const sheets = localContext.workbook.worksheets;
        sheets.load("items,name");
        await localContext.sync();

        let sheet = sheets.items.find(sheet => sheet.name === tableName);
        
        if (!sheet) {
          sheet = sheets.add(tableName);
          sheet.showGridlines = false;
          let expensesTable = sheet.tables.add("A5:I5", true /*hasHeaders*/);
          expensesTable.name = tableName;
          expensesTable.getHeaderRowRange().values = [["ScenarioCode", "ScenarioOpen", "ScenarioName", "ScenarioDescription", "UD1", "UD2", "UD3", "DocAttachments","IsUnique"]];
          sheet.freezePanes.freezeRows(5);
          expensesTable.columns.getItem("ScenarioOpen").getDataBodyRange().dataValidation.rule = { list: { inCellDropDown: true, source: ["Open", "Closed"].join(",") } };
          
          await localContext.sync();

          const rows = data.map(item => [item.ScenarioCode, item.ScenarioOpen, item.ScenarioName, item.ScenarioDescription, item.UD1, item.UD2, item.UD3, item.DocAttachments,'=IF(COUNTIF([ScenarioName],[@ScenarioName])>1,"No","Yes")']);
          expensesTable.rows.add(null,rows);
          // Unlock all cells in columns B through H
          [1, 3, 4, 5,6].forEach(index => expensesTable.columns.getItemAt(index).getDataBodyRange().format.protection.locked = false);

          

          // Set the fill color for all cells in column I
          /* let columnIRange = expensesTable.columns.getItem("DocAttachments").getDataBodyRange();
          columnIRange.format.fill.color = "#FFBE33"; other way of doing the below action 
          expensesTable.columns.getItemAt(7).getDataBodyRange().format.fill.color = "#FFBE33";
          expensesTable.columns.getItemAt(8).getDataBodyRange().format.fill.color = "#FFBE33"; */

          [0, 2, 7, 8].forEach(index => expensesTable.columns.getItemAt(index).getDataBodyRange().format.fill.color = "#FFBE33");
          [2].forEach(index => expensesTable.columns.getItemAt(index).getDataBodyRange().format.autofitColumns());
          
          sheet.protection.protect({allowAutoFilter: true, allowSort: true }, 'Welcome123!');
          await localContext.sync();
        }
      } catch (excelError) {
        console.error("Excel operation failed:", excelError);
      }
    });
  } catch (error) {
    console.error("Failed to download data or Excel operation failed:", error);
  }
};
