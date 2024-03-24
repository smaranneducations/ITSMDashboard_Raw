
//This function checks if a sheet exists with a given name and creates it if not.
const checkOrCreateSheet = async (context, sheetName) => {
    const sheets = context.workbook.worksheets;
    sheets.load("items,name");
    await context.sync();
  
    let sheet = sheets.items.find(sheet => sheet.name === sheetName);
    if (!sheet) {
      sheet = sheets.add(sheetName);
      await context.sync();
    }
    return sheet;
  };

 
//check if table with name exists in any sheet where sheet name is not scneario, if then dialouge name of sheet awith user can click ok button and then once users clikc ok abort program
  export const checkTableInNonTableNameSheets = async (context, tableName) => {
    const sheets = context.workbook.worksheets;
    sheets.load("items,name");
    await context.sync();
  
    for (let sheet of sheets.items) {
      if (sheet.name.toLowerCase() !== tableName.toLowerCase() && sheet.name.toLowerCase() !== "scenario") {
        const table = sheet.tables.getItemOrNullObject(tableName);
        table.load("name");
        await context.sync();
  
        if (!table.isNullObject) {
          // Instead of rendering a dialog, return details for the caller to decide what to do
          return { found: true, sheetName: sheet.name, tableName: table.name };
        }
      }
    }
  
    // Return an object indicating that no problematic table was found
    return { found: false };
  };
  
  
  