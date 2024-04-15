function normalizeValue(value) {
    return value == null || value === "" ? null : value;
}
export const checkBeforeUploadScenario = async (scenarioData, context, tableName) => {
    if (!scenarioData) {
      console.error('No data provided to update scenario records');
      return "No data provided";
    }
    console.log("upload button clicked1");
  
    try {
      return await Excel.run(async (context) => {
        context.application.calculationMode = Excel.CalculationMode.manual;
        const sheet = context.workbook.worksheets.getItem(tableName);
        const table = sheet.tables.getItem(tableName);
        sheet.protection.unprotect('Welcome123!');
        const tableRows = table.rows;
        tableRows.load("items/values");
        await context.sync();
  
        let returnMsg = "Valid";
  
        for (const row of tableRows.items) {
          const scenarioCode = normalizeValue(row.values[0][0]);
          const scenarioOpen = normalizeValue(row.values[0][1]);
          const scenarioName = normalizeValue(row.values[0][2]);
  
          if (scenarioOpen == null) {
            row.getRange().getCell(0, 8).values = [["Not valid record"]];
            returnMsg = "Not Valid";
          } else {
            const existingRecord = scenarioData.find(data => normalizeValue(data.ScenarioName) === scenarioName);
            const status = existingRecord ? "To be updated" : "To be inserted";
            row.getRange().getCell(0, 8).values = [[status]];
          }
        }
  
        await context.sync();
        sheet.protection.protect({ allowAutoFilter: true, allowSort: true }, 'Welcome123!');
        context.application.calculationMode = Excel.CalculationMode.automatic;
  
        return returnMsg; // Returning the result of the updates
      });
    } catch (error) {
      console.error("Error updating records: ", error);
      return "Error encountered";
    }
  };
  