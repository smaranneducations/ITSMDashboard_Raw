// ConfirmationDialog.jsx
import React from 'react';
import { Button, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";


const ConfirmationDialog1 = ({ message, isOpen, onOpenChange }) => {

  const handleConfirm = () => {
    onOpenChange(false); // Close dialog
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
            {message}
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={handleConfirm}>Confirm</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ConfirmationDialog1;