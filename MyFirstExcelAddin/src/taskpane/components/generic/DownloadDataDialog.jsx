// DownloadDataDialog.jsx
import React from 'react';
import { Button, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";


const DownloadDataDialog = ({ downloadDataDialogIsOpen, downloadDataDialogMessage, onOpenChangeDataDialog }) => {

  const handleMerge = () => {
    onOpenChangeDataDialog(false, 'merge'); // Indicate action "merge"
  };

  const handleReset = () => {
    onOpenChangeDataDialog(false, 'reset'); // Indicate action "reset"
  };

  const handleCancel = () => {
    onOpenChangeDataDialog(false, 'cancel'); // Indicate action "reset"
  };

  return (
    <Dialog open={downloadDataDialogIsOpen} onOpenChangeDataDialog={onOpenChangeDataDialog}>
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
            <Button appearance="secondary" onClick={handleCancel}>Cancel</Button>
            <Button appearance="secondary" onClick={handleMerge}>Merge</Button>
            <Button appearance="primary" onClick={handleReset}>Reset</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default DownloadDataDialog;
