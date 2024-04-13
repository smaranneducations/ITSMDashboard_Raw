// think about the approach on how can we debug and find out what is being talked about in the stackoverflow link
// https://stackoverflow.com/a/63407912/13561843

import axios from 'axios';

export const resetScenarioRecords = async (localContext, tableName) => {
    try {
        // Fetch the latest data
        const response = await axios.get("http://localhost:3001/api/fetchdata/Scenario");
        const apiData = response.data;

        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getItem(tableName);
            const table = sheet.tables.getItem(tableName);

            // Temporarily unprotect the sheet and set calculation mode to manual
            context.application.calculationMode = Excel.CalculationMode.manual;
            sheet.protection.unprotect('Welcome123!');
            await context.sync();

            // Remove any existing color formatting
            table.getRange().format.fill.clear();
            await context.sync();

            // Remove any existing comments
            sheet.comments.load('items');
            await context.sync();
            sheet.comments.items.forEach(comment => comment.delete());
            await context.sync();

            const tableRows = table.rows.load("items");
            await context.sync();
            
            // Delete all existing rows
            for (let i = tableRows.items.length -1; i >= 0; i--) {
                tableRows.items[i].delete();
            }
            await context.sync();
            
            // Repopulate the table with new data
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

            // Add new rows to the table
            table.rows.add(null, newValues);
            await context.sync();

            // Set the fill color for all cells in column I
          
            [7, 0, 8].forEach(col => table.columns.getItemAt(col).getDataBodyRange().format.fill.color = "#FFBE33");


            // Reapply protection and set calculation mode back to automatic
            sheet.protection.protect({ allowAutoFilter: true, allowSort: true }, 'Welcome123!');
            context.application.calculationMode = Excel.CalculationMode.automatic;
            await context.sync();
        });
    } catch (error) {
        console.error(error);
    }
};
