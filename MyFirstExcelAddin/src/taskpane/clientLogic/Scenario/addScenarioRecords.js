export const addScenarioRecords = async (context, tableName, code) => {
    try {
        await Excel.run(async (context) => {
            context.application.calculationMode = Excel.CalculationMode.manual;
            context.application.load("calculationMode");
            await context.sync();
            // Get the specified worksheet and table
            const sheet = context.workbook.worksheets.getItem(tableName);
            const table = sheet.tables.getItem(tableName);

            // Temporarily unprotect the sheet
            sheet.protection.unprotect('Welcome123!');

            // Load necessary properties for the table and current selection
            table.load('columns/items');
            const selection = context.workbook.getSelectedRange();
            selection.load('rowIndex');
            
            // Ensure the loaded properties are available for use
            await context.sync();

            // Calculate the selected row's position relative to the table
            const tableRange = table.getRange();
            tableRange.load('rowCount, rowIndex');
            await context.sync();
            const selectedRowIndex = selection.rowIndex - tableRange.rowIndex;

            // Validate if the selected row is within the table range
            if (selectedRowIndex >= 0 && selectedRowIndex < tableRange.rowCount) {
                // Prepare and insert the specified number of blank rows at the selected position
                const blankRowTemplate = [Array(table.columns.items.length).fill(null)];
                for (let i = 0; i < code; i++) {
                    table.rows.add(selectedRowIndex, blankRowTemplate);
                }
            }

            // Reapply protection to the sheet
            sheet.protection.protect({ allowAutoFilter: true, allowSort: true }, 'Welcome123!');
            context.application.calculationMode = Excel.CalculationMode.automatic;
            context.application.load("calculationMode");
            await context.sync();
        });
    } catch (error) {
        console.error("Error modifying scenario records: ", error);
    }
};
