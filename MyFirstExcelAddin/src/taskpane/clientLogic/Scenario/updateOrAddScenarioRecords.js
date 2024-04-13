import axios from 'axios';

function normalizeValue(value) {
  return value == null || value === "" ? null : value;
}

export const updateOrAddScenarioRecords = async (localContext, tableName) => {
 
try {
  const response = await axios.get("http://localhost:3001/api/fetchdata/Scenario");
  const apiData = response.data;


  await Excel.run(async (localContext) => {
    const sheet = localContext.workbook.worksheets.getItem(tableName);
    const table = sheet.tables.getItem(tableName);
    localContext.application.calculationMode = Excel.CalculationMode.manual;

    sheet.protection.unprotect( 'Welcome123!');
    await localContext.sync();

    // Remove any existing color formatting
    [1, 2, 3, 4, 5, 6].forEach(i => table.columns.getItemAt(i).getDataBodyRange().format.fill.clear());

   
   /*  table.getRange().format.fill.clear(); */
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
            if (normalizeValue(tableRows.items[j].values[0][0]) === normalizeValue(apiData[i].ScenarioCode)) {
              
              addRow = false;
              
              if (normalizeValue(tableRows.items[j].values[0][1]) !== normalizeValue(apiData[i].ScenarioOpen)) {
                table.getDataBodyRange().getCell(j, 1).values = apiData[i].ScenarioOpen;
                table.getDataBodyRange().getCell(j, 1).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 1), `value in Excel was: ${tableRows.items[j].values[0][1]}`);
              }
              
              if (normalizeValue(tableRows.items[j].values[0][2]) !== normalizeValue(apiData[i].ScenarioName)) {
                table.getDataBodyRange().getCell(j, 2).values = apiData[i].ScenarioName;
                table.getDataBodyRange().getCell(j, 2).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 2), `value in Excel was: ${tableRows.items[j].values[0][2]}`);
              }
              
              if (normalizeValue(tableRows.items[j].values[0][3]) !== normalizeValue(apiData[i].ScenarioDescription)) {
                table.getDataBodyRange().getCell(j, 3).values = apiData[i].ScenarioDescription;
                table.getDataBodyRange().getCell(j, 3).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 3), `value in Excel was: ${tableRows.items[j].values[0][3]}`);
              }
              
              if (normalizeValue(tableRows.items[j].values[0][4]) !== normalizeValue(apiData[i].UD1)) {
                table.getDataBodyRange().getCell(j, 4).values = apiData[i].UD1;
                table.getDataBodyRange().getCell(j, 4).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 4), `value in Excel was: ${tableRows.items[j].values[0][4]}`);
                
              }
              
              if (normalizeValue(tableRows.items[j].values[0][5]) !== normalizeValue(apiData[i].UD2)) {
                table.getDataBodyRange().getCell(j, 5).values = apiData[i].UD2;
                table.getDataBodyRange().getCell(j, 5).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 5), `value in Excel was: ${tableRows.items[j].values[0][5]}`);
              }
              
              if (normalizeValue(tableRows.items[j].values[0][6]) !== normalizeValue(apiData[i].UD3)) {
                table.getDataBodyRange().getCell(j, 6).values = apiData[i].UD3;
                table.getDataBodyRange().getCell(j, 6).format.fill.color = "yellow";
                sheet.comments.add(table.getDataBodyRange().getCell(j, 6), `value in Excel was: ${tableRows.items[j].values[0][6]}`);
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
             // Format only the specified columns (0 to 6) of the newly added row
              for (let i = 1; i <= 6; i++) {
                  addedRowRange.getCell(0, i).format.fill.color = "green";
                  }
            await localContext.sync();
            // Once done with the object, it's a good practice to remove it from tracked objects to free resources
            localContext.trackedObjects.remove(addedRowRange);
          }
          
        }
      sheet.protection.protect({allowAutoFilter: true, allowSort: true }, 'Welcome123!');
      localContext.application.calculationMode = Excel.CalculationMode.automatic;
      await localContext.sync();
      });
      
    } catch (error) {
  console.error(error);
}
};
