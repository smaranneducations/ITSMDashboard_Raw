export const downloadScenarioTableInfo = async (context, tableName) => {
  let result; 
  try {
    // Assuming data fetching is still relevant for some reason
   // await axios.get(`http://localhost:3001/api/fetchdata/${tableName}`);

    // Directly working with Excel to log the count of records in the table
    result = await Excel.run(async (localContext) => {
      const sheet = localContext.workbook.worksheets.getItem(tableName);
      const table = sheet.tables.getItem(tableName);

      table.load("rows/count");
      await localContext.sync();
      return { info1: `Table "${tableName}" has ${table.rows.count} records.`};
    });

  } catch (error) {
    result = { info1: `Error: ${error.message || error}` };
  }
  return result;
};