export const checkTableInNonTableNameSheets = async (context, tableName) => {
    const result = await Excel.run(async (context) => {
        let tableinwrongsheet = null;
        let tablesetupwrog = null;
        let sheetExists = "Sheet does not exist";

        const sheets = context.workbook.worksheets;
        sheets.load("items,name");
        await context.sync();

        for (let sheet of sheets.items) {
            if (sheet.name !== tableName) {
                const sheetTables = sheet.tables;
                sheetTables.load("items,name,rows");
                await context.sync();

                for (let table of sheetTables.items) {
                    if (table.name === tableName) {
                        tableinwrongsheet = `Table name "${table.name}" can only exist in sheet "${tableName}" but exists in sheet "${sheet.name}". Please delete the sheet then download again.`;
                    }
                }
            }
            if (sheet.name === tableName) {
                const sheetTables = sheet.tables;
                sheetTables.load("items,name,rows");
                await context.sync();

                if (sheetTables.items.length === 1) {
                    const topLeftCell = sheetTables.items[0].getRange().load("address");
                    await context.sync();
                    if (sheetTables.items[0].name == tableName && topLeftCell.address.split('!')[1].split(':')[0] == "A5") {
                        sheetExists = "sheet exists and table setup is correct";
                        return { found: false, message: sheetExists };
                    } else {
                        console.log("should enter here as there is no table in the sheet ");
                        tablesetupwrog = `Setup of "${sheet.name}" is wrong. It can have only one table with name "${sheet.name}" and it has to start from A5.`;
                    }
                } else {
                    tablesetupwrog = `"${sheet.name}" exists but has no table delete the sheet and run donwload again`;
                }
            }
        }
        if (tableinwrongsheet === null && tablesetupwrog === null) {
            return { found: false, message: sheetExists };
        } else {
            return { 
                found: true, 
                message: `${tableinwrongsheet}\n${tablesetupwrog}` 
            };
        }
    });
    return result;
};
