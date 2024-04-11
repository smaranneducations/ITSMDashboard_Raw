export const deleteScenarioRecords = async (context, tableName) => {
    try {
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

            // Map each selected range to an object with its start and end row indices relative to the table's data body.
            let ranges = selections.areas.items.map(range => ({
                startRowIndex: range.rowIndex - tableDataBodyRange.rowIndex,
                endRowIndex: (range.rowIndex - tableDataBodyRange.rowIndex) + range.rowCount - 1
            }));

            // Sort the ranges in descending order based on their startRowIndex to ensure bottom-up processing.
            ranges.sort((a, b) => b.startRowIndex - a.startRowIndex);

            // Iterate through the sorted ranges to delete rows from bottom to top within each range.
            for (let {startRowIndex, endRowIndex} of ranges) {
                if (startRowIndex >= 0 && startRowIndex < tableDataBodyRange.rowCount) { // Check if the range is within the table's data body.
                    for (let i = endRowIndex; i >= startRowIndex; i--) { // Delete rows in reverse order to maintain correct indices.
                        if (i < tableDataBodyRange.rowCount) {
                            table.rows.getItemAt(i).delete(); // Perform the deletion of the row.
                        }
                    }
                    await context.sync(); // Synchronize after each range's deletions are completed.
                }
            }

            sheet.protection.protect({ allowAutoFilter: true, allowSort: true }, 'Welcome123!'); // Reapply protection to the sheet.
            context.application.calculationMode = Excel.CalculationMode.automatic; // Restore calculation mode to automatic.
        });
    } catch (error) {
        console.error("Error deleting scenario records: ", error); // Log any errors encountered during execution.
    }
};
