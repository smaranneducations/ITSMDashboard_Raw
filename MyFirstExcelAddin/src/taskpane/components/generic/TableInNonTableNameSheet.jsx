import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogContent, Button } from "@fluentui/react-components";
import { checkTableInNonScenarioSheets } from "./excelUtilities"; // Adjust the import path

const YourComponent = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const handleCheckTables = async () => {
    // Example usage, you would get the context and tableName as needed
    const context = {}; // Get your Excel context
    const tableName = 'yourTableName';

    const result = await checkTableInNonScenarioSheets(context, tableName);
    if (result.found) {
      setDialogContent(`In sheet ${result.sheetName}, table ${result.tableName} exists, which is wrong. The program will abort.`);
      setDialogOpen(true);
    }
  };

  return (
    <div>
      <Button onClick={handleCheckTables}>Check Tables</Button>
      {dialogOpen && (
        <Dialog modalType="non-modal" open={dialogOpen} onDismiss={() => setDialogOpen(false)}>
          <DialogTrigger disableButtonEnhancement>
            <Button>Open non-modal dialog</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Table Found in Incorrect Sheet</DialogTitle>
              <DialogContent>
                {dialogContent}
              </DialogContent>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}
    </div>
  );
};

export default YourComponent;
