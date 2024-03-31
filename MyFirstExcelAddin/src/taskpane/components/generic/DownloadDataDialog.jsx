// ConfirmationDialog.jsx
import React from 'react';
import { Button, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";
import { userResponse } from '../../store/slices/dialogSlice'; // Update the import path as necessary

const DownloadDataDialog = ({ downloadDataDialogMessage, downloadDataDialogIsOpen, downloadDataDialogOnOpenChange }) => {

  const handleMerge = () => {
    downloadDataDialogOnOpenChange(false, 'merge'); // Indicate action "merge"
  };

  const handleReset = () => {
    downloadDataDialogOnOpenChange(false, 'reset'); // Indicate action "reset"
  };

  return (
    <Dialog open={downloadDataDialogIsOpen} onOpenChange={(isOpen) => downloadDataDialogOnOpenChange(isOpen)}>
      <DialogTrigger>
        <Button style={{display: 'none'}}>Open Dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            {downloadDataDialogMessage}
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={handleMerge}>Merge</Button>
            <Button appearance="primary" onClick={handleReset}>Reset</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default DownloadDataDialog;
