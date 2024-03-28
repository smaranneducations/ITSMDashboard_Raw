export const checkTableInNonTableNameSheets = async (context, tableName) => {
    const result = await Excel.run(async (context) => {
        let tableinwrongsheet = null;
        let tablesetupwrog = null;
        let finalmessage = null;
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

                for (let table of sheetTables.items) {
                    const topLeftCell = table.getRange().load("address");
                    await context.sync();

                    if (sheetTables.items.length === 1 && table.name === tableName && topLeftCell.address.split('!')[1].split(':')[0] !== "A5") {
                        /* tablecountwrong =  `In sheet "${sheet.name}" Only one table can exist and its name should be "${sheet.name}". you have "${sheetTables.items.length}" tables ` ; */
                    } else {
                        tablesetupwrog = `Setup of "${sheet.name}" is wrong. It can have only one table with name "${sheet.name}" and it has to start from A5.`;
                    }
                }
            }
        }
        finalmessage = "--" + tableinwrongsheet + "<br>" + "--" + tablesetupwrog
        console.log(finalmessage);
        return { found: true, message: finalmessage };
    });
    return result;
};
