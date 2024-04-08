export const deleteScenarioRecords = async (context, tableName) => {
    try {
        await Excel.run(async (context) => {
            // Set calculation mode to manual to improve performance
            context.application.calculationMode = Excel.CalculationMode.manual;

            // Get the specified worksheet and table
            const sheet = context.workbook.worksheets.getItem(tableName);
            const table = sheet.tables.getItem(tableName);

            // Temporarily unprotect the sheet
            sheet.protection.unprotect('Welcome123!');

            // Get the current selection and load 'rowIndex' and 'rowCount' properties
            const selection = context.workbook.getSelectedRange();
            // Explicitly load 'rowIndex' and 'rowCount' for the selection
            selection.load('rowIndex, rowCount');
            await context.sync();

            const tableDataBodyRange = table.getDataBodyRange();
            // Explicitly load 'rowIndex' and 'rowCount' for the table's data body range
            tableDataBodyRange.load('rowIndex, rowCount');
            await context.sync();

            // Calculate the relative row index of the selection within the table
            const startRowIndex = selection.rowIndex - tableDataBodyRange.rowIndex;
            const endRowIndex = startRowIndex + selection.rowCount - 1;

            if (startRowIndex >= 0) {
                // Delete rows in reverse order from the end to avoid affecting the indices of rows to be deleted
                for (let i = endRowIndex; i >= startRowIndex; i--) {
                    if (i < tableDataBodyRange.rowCount) {
                        table.rows.getItemAt(i).delete();
                    }
                }
                await context.sync();
            }

            // Reapply protection to the sheet
            sheet.protection.protect({ allowAutoFilter: true, allowSort: true }, 'Welcome123!');

            // Restore calculation mode to automatic
            context.application.calculationMode = Excel.CalculationMode.automatic;
            await context.sync();
        });
    } catch (error) {
        console.error("Error deleting scenario records: ", error);
    }
};
