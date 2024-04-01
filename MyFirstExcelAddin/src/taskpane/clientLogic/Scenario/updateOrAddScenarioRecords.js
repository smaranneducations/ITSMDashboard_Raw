import axios from 'axios';

export const updateOrAddScenarioRecords = async (context, tableName) => {
  console.log("Updating or adding scenario records...");

    const response = await axios.get(`http://localhost:3001/api/fetchdata/${tableName}`);
    const apiData = response.data;

    await Excel.run(async (localContext) => {
      const sheet = localContext.workbook.worksheets.getItem(tableName);
      const table = sheet.tables.getItem(tableName);

      // Remove any existing color formatting
      const tableRange= table.getRange();
      console.log(tableRange);
      const tableFormat = tableRange.format;
      console.log("2");
      tableFormat.fill.color = null;
      console.log("3");
      return localContext.sync();
      format.fill.color = "#4472C4";

      const tableRows = table.rows;
      tableRows.load("items/values");
      await localContext.sync();

      apiData.forEach(async (apiRecord) => {
        let recordFound = false;
        tableRows.items.forEach((row, index) => {
          if (row.values[0][0] === apiRecord.ScenarioCode) {
            recordFound = true;
            // Check each cell for differences
            row.values[0].forEach((cellValue, cellIndex) => {
              const apiValue = Object.values(apiRecord)[cellIndex];
              if (cellValue !== apiValue) {
                // Update cell color to yellow and add original value as a comment
                const cell = table.columns.getItemAt(cellIndex).getDataBodyRange().getCell(index, 0);
                cell.format.fill.color = "yellow";
                cell.values = [[apiValue]];
                cell.setNote(`${cellValue}`);
                //cell.values = [[apiValue]];
                
              }
            });
          }
        });

        if (!recordFound) {
          // Add new record and make the whole record yellow
          const newRowValues = Object.values(apiRecord);
          const newRow = table.rows.add(null, [newRowValues]);
          newRow.format.fill.color = "yellow";
        }

        await localContext.sync();
      });
    });
  
};