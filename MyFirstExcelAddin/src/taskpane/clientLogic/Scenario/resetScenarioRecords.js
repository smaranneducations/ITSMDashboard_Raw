// Assuming import { Excel } from somewhere if needed

export const resetScenarioRecords = async (apiData, localContext, tableName) => {
  if (!apiData) {
    console.error('No data provided to reset scenario records');
    return;
  }

  try {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(tableName);
      const table = sheet.tables.getItem(tableName);

      context.application.calculationMode = Excel.CalculationMode.manual;
      sheet.protection.unprotect('Welcome123!');
      await context.sync();

      table.getRange().format.fill.clear();
      await context.sync();
      sheet.comments.load('items');
      await context.sync();
      sheet.comments.items.forEach(comment => comment.delete());
      await context.sync();

      const tableRows = table.rows.load("items");
      await context.sync();
      for (let i = tableRows.items.length - 1; i >= 0; i--) {
        tableRows.items[i].delete();
      }
      await context.sync();

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
      table.rows.add(null, newValues);
      await context.sync();

      [7, 0, 8].forEach(col => table.columns.getItemAt(col).getDataBodyRange().format.fill.color = "#FFBE33");

      sheet.protection.protect({ allowAutoFilter: true, allowSort: true }, 'Welcome123!');
      context.application.calculationMode = Excel.CalculationMode.automatic;
      await context.sync();
    });
  } catch (error) {
    console.error('Error resetting scenario records:', error);
  }
};
