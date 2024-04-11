import axios from 'axios';

function normalizeValue(value) {
    return value == null || value === "" ? null : value;
}

export const deleteScenarioDBRecords = async (context, tableName) => {
    console.log('deleteScenarioDBRecords');
    try {
        let scenarioDatainDB = [];
        let scenarioDatainDBtobeDeleted = [];
        let allscenarioData = []; // Array to store scenario data as JSON objects
        await Excel.run(async (context) => {
            context.application.calculationMode = Excel.CalculationMode.manual; // Set calculation mode to manual for performance.
            const sheet = context.workbook.worksheets.getItem(tableName); // Get the specific worksheet.
            const table = sheet.tables.getItem(tableName); // Get the specific table from the worksheet.
            sheet.protection.unprotect('Welcome123!'); // Temporarily unprotect the sheet.

            const selections = context.workbook.getSelectedRanges(); // Get the current selected ranges.
            selections.areas.load('items/rowIndex, items/rowCount'); // Load necessary properties for each selection area.
            await context.sync(); // Synchronize to ensure properties are loaded.

            const tableDataBodyRange = table.getDataBodyRange(); // Get the data body range of the table.
            tableDataBodyRange.load('rowIndex, rowCount'); // Load rowIndex and rowCount for the table's data body range.
            await context.sync(); // Synchronize to ensure table data body range properties are loaded.

            // Fetch data from the API
            const response = await axios.get(`http://localhost:3001/api/fetchdata/${tableName}`);
            const apiData = response.data;

            // Map each selected range to an object with its start and end row indices relative to the table's data body.
            let ranges = selections.areas.items.map(range => ({
                startRowIndex: range.rowIndex - tableDataBodyRange.rowIndex,
                endRowIndex: (range.rowIndex - tableDataBodyRange.rowIndex) + range.rowCount - 1
            }));

            // Sort the ranges in descending order based on their startRowIndex to ensure bottom-up processing.
            ranges.sort((a, b) => b.startRowIndex - a.startRowIndex);

            // Iterate through the sorted ranges to collect scenario data and delete rows from bottom to top within each range.
            for (let {startRowIndex, endRowIndex} of ranges) {
                if (startRowIndex >= 0 && startRowIndex < tableDataBodyRange.rowCount) { // Check if the range is within the table's data body.
                    for (let i = endRowIndex; i >= startRowIndex; i--) { // Delete rows in reverse order to maintain correct indices.
                        if (i < tableDataBodyRange.rowCount) {
                            const rowDataRange = table.rows.getItemAt(i).getRange();
                            rowDataRange.load('values'); // Load values from the row data range.
                            await context.sync(); // Synchronize to ensure values are loaded.
                            
                            // Construct JSON object representing scenario data
                            const scenarioCode = rowDataRange.values[0][0]; // Assuming scenario code is in the first column
                            const scenarioName = rowDataRange.values[0][2]; 
                            allscenarioData.push(scenarioCode + " -- " + scenarioName);

                            // Check if the scenario code is present in the API data
                            const isPresentInApi = apiData.some(dataItem => normalizeValue(dataItem.ScenarioCode) === scenarioCode);
                            if (isPresentInApi) {
                                // Print the scenario code instead of deleting the row
                                //console.log(`Scenario Code ${scenarioCode} will be deleted.`);
                                scenarioDatainDB.push(scenarioCode + " -- " + scenarioName);
                                scenarioDatainDBtobeDeleted.push(scenarioCode);
                                //table.rows.getItemAt(i).delete(); // Perform the deletion of the row.
                            }
                        }
                    }
                    await context.sync(); // Synchronize after each range's deletions are completed.
                }
            }

            sheet.protection.protect({ allowAutoFilter: true, allowSort: true }, 'Welcome123!'); // Reapply protection to the sheet.
            context.application.calculationMode = Excel.CalculationMode.automatic; // Restore calculation mode to automatic.
        });

        // Print the collected scenario data as JSON
        //console.log(`below scenario codes will be deleted from the sheet "${allscenarioData}" \n below scenario codes will be deleted from the DB "${scenarioDatainDB}"`);
        //console.log('scenarioDatainDBtobeDeleted', scenarioDatainDB);
        let message = `below scenario codes will be deleted from the sheet "${allscenarioData}" \n below scenario codes will be deleted from the DB "${scenarioDatainDB}"`;
        console.log(message);
        console.log(scenarioDatainDBtobeDeleted);
        return "bhasker";
    } catch (error) {
        console.error("Error deleting scenario records: ", error); // Log any errors encountered during execution.
    }
};
