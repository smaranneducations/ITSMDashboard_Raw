import axios from 'axios';

export const downloadScenarioTable = async (context, tableName) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/fetchdata/${tableName}`);
    const data = response.data;

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
          expensesTable.columns.getItem("ScenarioOpen").getDataBodyRange().dataValidation.rule = { list: { inCellDropDown: true, source: ["Open", "closed"].join(",") } };
          
          await localContext.sync();

          const rows = data.map(item => [item.ScenarioCode, item.ScenarioOpen, item.ScenarioName, item.ScenarioDescription, item.UD1, item.UD2, item.UD3, item.DocAttachments,'=IF(COUNTIF([ScenarioName],[@ScenarioName])>1,"No","Yes")']);
          expensesTable.rows.add(null,rows);
          // Unlock all cells in columns B through H
          expensesTable.columns.getItemAt(1).getDataBodyRange().getResizedRange(0, 5).format.protection.locked = false;
          

          // Set the fill color for all cells in column I
          let columnIRange = expensesTable.columns.getItem("DocAttachments").getDataBodyRange();
          columnIRange.format.fill.color = "#FFBE33";

          expensesTable.columns.getItemAt(0).getDataBodyRange().format.fill.color = "#FFBE33";
          expensesTable.columns.getItemAt(8).getDataBodyRange().format.fill.color = "#FFBE33";
          
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