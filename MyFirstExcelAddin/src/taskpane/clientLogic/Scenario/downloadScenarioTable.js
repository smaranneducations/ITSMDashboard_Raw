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
          let expensesTable = sheet.tables.add("A5:I5", true /*hasHeaders*/);
          expensesTable.name = tableName;
          expensesTable.getHeaderRowRange().values = [["ScenarioCode", "ScenarioOpen", "ScenarioName", "ScenarioDescription", "UD1", "UD2", "UD3", "DocAttachments","IsUnique"]];
          expensesTable.columns.getItem("ScenarioOpen").getDataBodyRange().dataValidation.rule = { list: { inCellDropDown: true, source: ["Open", "closed"].join(",") } };
          
          await localContext.sync();

          const rows = data.map(item => [item.ScenarioCode, item.ScenarioOpen, item.ScenarioName, item.ScenarioDescription, item.UD1, item.UD2, item.UD3, item.DocAttachments,'=IF(COUNTIF([ScenarioName],[@ScenarioName])>1,"No","Yes")']);
          expensesTable.rows.add(null,rows);
        }
      } catch (excelError) {
        console.error("Excel operation failed:", excelError);
      }
    });
  } catch (error) {
    console.error("Failed to download data or Excel operation failed:", error);
  }
};
