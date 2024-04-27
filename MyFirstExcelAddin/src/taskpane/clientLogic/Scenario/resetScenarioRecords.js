// Assuming import { Excel } from somewhere if needed

export const resetScenarioRecords = async (apiData, localContext, tableName) => {
  if (!apiData) {
    console.error('No data provided to reset scenario records');
    return;
  }

  
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(tableName);
      const table = sheet.tables.getItem(tableName);
      context.application.calculationMode = Excel.CalculationMode.manual;
      sheet.protection.unprotect('Welcome123!');
      await context.sync();

      table.getDataBodyRange().clear();
      table.resize("B5:J6");
      await context.sync();
      table.columns.getItem("ScenarioOpen").getDataBodyRange().dataValidation.rule = { list: { inCellDropDown: true, source: ["Open", "Closed"].join(",") } };
      [1, 3, 4, 5,6].forEach(index => table.columns.getItemAt(index).getDataBodyRange().format.protection.locked = false);
      const newValues = apiData.map(item => [
        item.ScenarioCode,
        item.ScenarioOpen,
        item.ScenarioName,
        item.ScenarioDescription,
        item.UD1,
        item.UD2,
        item.UD3,
        item.DocAttachments,
        '=IF(COUNTIF([ScenarioName],[@ScenarioName])>1,"No","Yes")'
      ]);
      
      console.log('newValues', newValues.length);
      table.resize(`B5:J${newValues.length+5}`);
      console.log('newValues', newValues);
      /* sheet.getRange(`A5:I${newValues.length+6}`).values = newValues;  */

    sheet.getRange(`B6:J${newValues.length+5}`).values = newValues;
      /* table.getBodyRange().values = newValues; */
      await context.sync();

      [0,2,7, 8].forEach(col => table.columns.getItemAt(col).getDataBodyRange().format.fill.color = "#FFBE33"); 

      sheet.protection.protect({ allowAutoFilter: true, allowSort: true }, 'Welcome123!');
      context.application.calculationMode = Excel.CalculationMode.automatic;
      await context.sync();
    });
};
