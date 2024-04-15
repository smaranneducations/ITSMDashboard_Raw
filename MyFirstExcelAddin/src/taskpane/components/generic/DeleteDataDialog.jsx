// DownloadDataDialog.jsx
import React from 'react';
import { Button, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";


const DeleteDataDialog = ({ deleteDataDialogIsOpen, deleteDataDialogMessage, onOpenChangeDeleteDataDialog }) => {

  const handleCancel = () => {
    onOpenChangeDeleteDataDialog(false, 'Cancel'); // Indicate action "merge"
  };

  const handleDeleteinExcel = () => {
    onOpenChangeDeleteDataDialog(false, 'DeleteInExcel'); // Indicate action "reset"
  };

  const handleDeleteinDB = () => {
    onOpenChangeDeleteDataDialog(false, 'DeleteInDB'); // Indicate action "reset"
  };

  return (
    <Dialog open={deleteDataDialogIsOpen} modalType="non-modal">
      <DialogTrigger>
        <Button style={{display: 'none'}}>Open Dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            {deleteDataDialogMessage}
          </DialogContent>
          <DialogActions>
          <Button appearance="secondary" onClick={handleCancel}>Cancel</Button>
            <Button appearance="secondary" onClick={handleDeleteinExcel}>DeleteInExcel</Button>
            <Button appearance="primary" onClick={handleDeleteinDB}>DeleteInDB</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default DeleteDataDialog;
