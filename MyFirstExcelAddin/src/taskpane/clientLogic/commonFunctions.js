
//check if table with name exists in any sheet where sheet name is not scneario, if then dialouge name of sheet awith user can click ok button and then once users clikc ok abort program
export const checkTableInNonTableNameSheets = async (context, tableName) => {
    try {
        const result = await Excel.run(async (context) => {
            let sheetTable = null;
            let table = null;
            const sheets = context.workbook.worksheets;
            sheets.load("items/name");
            await context.sync();

            for (let sheet of sheets.items) {
                if (sheet.name !== tableName) {
                    const sheetTables = sheet.tables;
                    sheetTables.load("items,name");
                    await context.sync();
                    for (let table of sheetTables.items){
                        if (table.name === tableName) {
                             return { found: true, sheetName: sheet.name, tableName: table.name };
                        } 
                    }
                }
            }

            return { found: false };
        });

        return result;
    } catch (error) {
        console.error("Error checking tables in non-'Scenario' sheets:", error);
        return { found: false, error: error.message };
    }
};

  