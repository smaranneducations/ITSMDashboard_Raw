import { resetScenarioRecords } from "./resetScenarioRecords";

export const downloadScenarioTable = async (apiData, context, tableName) => {
  if (!apiData) {
    console.error('No data provided to reset scenario records');
    return;
  }

  try {
    const workingData = apiData;

    const result = await Excel.run(async (context) => {
      try {
        const sheets = context.workbook.worksheets;
        sheets.load("items,name");
        await context.sync();

        let sheet = sheets.items.find(sheet => sheet.name === tableName);
        
        if (!sheet) {
          sheet = sheets.add(tableName);
          sheet.showGridlines = false;
          sheet.getRange("A:A").format.columnWidth = 100;
          sheet.getRange("A4").values = [["Retrieve Filter"]];
          sheet.getRange("A4").format.font.bold = true;
          sheet.getRange("A3").values = [["Dropdown filter"]];
          sheet.getRange("A3").format.font.bold = true;
          sheet.getRange("A5").values = [["Table Headers"]];
          sheet.getRange("A5").format.font.bold = true;
         
        
        [ "D4", "E4", "F4", "G4", "H4"].forEach(async (address) => {
          const edgeTypes = ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"];

                    edgeTypes.forEach(async (edgeType) => {
                        sheet.getRange(address).format.borders.getItem(edgeType).style = "Continuous";
                        sheet.getRange(address).format.borders.getItem(edgeType).outline.weight = "Thin";
                    });
                    sheet.getRange(address).format.fill.color = "#07DCCE";
                    sheet.getRange(address).format.protection.locked = false;
        });
        
        await context.sync();
          let ScenarioTable = sheet.tables.add("B5:J5", true /*hasHeaders*/);
          ScenarioTable.name = tableName;
          ScenarioTable.getHeaderRowRange().values = [["ScenarioCode", "ScenarioOpen", "ScenarioName", "ScenarioDescription", "UD1", "UD2", "UD3", "DocAttachments","IsUnique"]];
          sheet.freezePanes.freezeRows(5);
          ScenarioTable.columns.getItem("ScenarioOpen").getDataBodyRange().dataValidation.rule = { list: { inCellDropDown: true, source: ["Open", "Closed"].join(",") } };
          await context.sync();

          [1, 3, 4, 5, 6].forEach(index => ScenarioTable.columns.getItemAt(index).getDataBodyRange().format.protection.locked = false);
          [0, 2, 7, 8].forEach(index => ScenarioTable.columns.getItemAt(index).getDataBodyRange().format.fill.color = "#FFBE33");
          [2].forEach(index => ScenarioTable.columns.getItemAt(index).getDataBodyRange().format.autofitColumns());
          await context.sync(); // Synchronize changes with Excel

          /* await resetScenarioRecords(workingData, context, tableName); */
          
          sheet.protection.protect({allowAutoFilter: true, allowSort: true }, 'Welcome123!');
          await context.sync();
        }
      } catch (excelError) {
        console.error("Excel operation failed:", excelError);
      }
    });
  } catch (error) {
    console.error("Failed to download workingData or Excel operation failed:", error);
  }
};
