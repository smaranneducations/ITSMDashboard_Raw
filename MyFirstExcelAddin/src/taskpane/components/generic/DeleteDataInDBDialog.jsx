// DeleteDataInDBDialog.jsx
import React from 'react';
import { Button, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";


const DeleteDataInDBDialog = ({ message, isOpen, onOpenChange, DeleteScenarioDBRecordsresult }) => {

  const handleConfirm = () => {
    onOpenChange(false, 'Confirm', DeleteScenarioDBRecordsresult); // Close dialog and pass DeleteScenarioDBRecordsresult
  };

  const handleCancel = () => {
    onOpenChange(false, 'Cancel'); // Close dialog
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button style={{display: 'none'}}>Open Dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
          <div style={{whiteSpace: 'pre-wrap'}}>{message}</div>
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={handleConfirm}>Confirm</Button>
            <Button appearance="primary" onClick={handleCancel}>Cancel</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default DeleteDataInDBDialog;
