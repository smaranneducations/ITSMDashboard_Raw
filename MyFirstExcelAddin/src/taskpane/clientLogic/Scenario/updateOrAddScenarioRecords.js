// later check how will the performance be when we do not iterate through the rows but instead use the filter function to find the row that needs to be updated
// also check more about the trackedObjects.add and trackedObjects.remove


import axios from 'axios';

export const updateOrAddScenarioRecords = async (localContext, tableName) => {
 
try {
  const response = await axios.get("http://localhost:3001/api/fetchdata/Scenario");
  const apiData = response.data;


  await Excel.run(async (localContext) => {
    const sheet = localContext.workbook.worksheets.getItem(tableName);
    const table = sheet.tables.getItem(tableName);

    // Remove any existing color formatting
    table.getRange().format.fill.clear();
    // Remove any existing comments
    const comments = sheet.comments;
    comments.load('items');
    await localContext.sync();
    comments.items.forEach(comment => comment.delete());
    await localContext.sync();

    const tableRows = table.rows;
    tableRows.load("items/values");
    await localContext.sync();

        for (let i = 0; i < apiData.length; i++) {
          let addRow = true;
          for (let j = 0; j < tableRows.items.length; j++) {
            if (tableRows.items[j].values[0][0] === apiData[i].ScenarioCode) {
              addRow = false;
              if (tableRows.items[j].values[0][1] !== apiData[i].ScenarioOpen) {
                table.getDataBodyRange().getCell(j, 1).values = apiData[i].ScenarioOpen;
                table.getDataBodyRange().getCell(j, 1).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 1), `value in Excel was: ${tableRows.items[j].values[0][1]}`);
              }
              if (tableRows.items[j].values[0][2] !== apiData[i].ScenarioName) {
                table.getDataBodyRange().getCell(j, 2).values = apiData[i].ScenarioName;
                table.getDataBodyRange().getCell(j, 2).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 2), `value in Excel was: ${tableRows.items[j].values[0][2]}`);
              }
              if (tableRows.items[j].values[0][3] !== apiData[i].ScenarioDescription) {
                table.getDataBodyRange().getCell(j, 3).values = apiData[i].ScenarioDescription;
                table.getDataBodyRange().getCell(j, 3).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 3), `value in Excel was: ${tableRows.items[j].values[0][3]}`);
              }
              if (tableRows.items[j].values[0][4] !== apiData[i].UD1) {
                table.getDataBodyRange().getCell(j, 4).values = apiData[i].UD1;
                table.getDataBodyRange().getCell(j, 4).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 4), `value in Excel was: ${tableRows.items[j].values[0][4]}`);
              }
              if (tableRows.items[j].values[0][5] !== apiData[i].UD2) {
                table.getDataBodyRange().getCell(j, 5).values = apiData[i].UD2;
                table.getDataBodyRange().getCell(j, 5).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 5), `value in Excel was: ${tableRows.items[j].values[0][5]}`);
              }
              if (tableRows.items[j].values[0][6] !== apiData[i].UD3) {
                table.getDataBodyRange().getCell(j, 6).values = apiData[i].UD3;
                table.getDataBodyRange().getCell(j, 6).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 6), `value in Excel was: ${tableRows.items[j].values[0][6]}`);
              }
              if (tableRows.items[j].values[0][7] !== apiData[i].DocAttachments) {
                table.getDataBodyRange().getCell(j, 7).values = apiData[i].DocAttachments;
                table.getDataBodyRange().getCell(j, 7).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 7), `value in Excel was: ${tableRows.items[j].values[0][7]}`);
              }
            } 
          } // Add this closing curly brace
          if (addRow === true) {
            const newValues = [[apiData[i].ScenarioCode, apiData[i].ScenarioOpen, apiData[i].ScenarioName, apiData[i].ScenarioDescription, apiData[i].UD1, apiData[i].UD2, apiData[i].UD3, apiData[i].DocAttachments,'=IF(COUNTIF([ScenarioName],[@ScenarioName])>1,"No","Yes")']];
            const addedRows = tableRows.add(null, newValues);
            // await localContext.sync(); , this generates an error he object path 'tables.getItem().rows.add()' isn't working for what you're trying to do. If you're using the object across multiple "context.sync" calls and outside the sequential execution of a ".run" batch, please use the "context.trackedObjects.add()" and "context.trackedObjects.remove()"
            // Explicitly track the added row range to ensure it remains available across multiple sync calls
            const addedRowRange = addedRows.getRange();
            localContext.trackedObjects.add(addedRowRange);
            await localContext.sync();
            // Now you can work with the addedRowRange
            addedRowRange.format.fill.color = "green";
            await localContext.sync();
            // Once done with the object, it's a good practice to remove it from tracked objects to free resources
            localContext.trackedObjects.remove(addedRowRange);
          }

          await localContext.sync();
        }
      });
    } catch (error) {
  console.error(error);
}
};