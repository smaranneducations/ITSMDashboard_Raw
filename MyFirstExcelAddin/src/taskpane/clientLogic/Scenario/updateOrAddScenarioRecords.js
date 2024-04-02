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
    await localContext.sync();

    const tableRows = table.rows;
    tableRows.load("items/values");
    await localContext.sync();

    for (let i = 0; i < apiData.length; i++) {
      for (let j = 0; j < tableRows.items.length; j++) {
        if (tableRows.items[j].values[0][0] === apiData[i].ScenarioCode) {
          console.log("Record found in table");
          for (let k = 0; k < tableRows.items[j].values[0].length; k++) {
            console.log("tableRows.items[j].values[0][k]", tableRows.items[j].values[0][k]);
            console.log("apiData[i].values[0][k]", apiData[i].values[0][k]);
              if (tableRows.items[j].values[0][k] !== apiData[i].values[0][k]) {
              tableRows.items[j].values[0][k] = apiData[i].values[0][k];
              table.columns.getItemAt(k).getDataBodyRange().getCell(j, 0).format.fill.color = "yellow";
            } 
          }
        }
      }
    }

    await localContext.sync();
  });} catch (error) {
    console.error(error);
  }
};