// ConfirmationDialog.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";
import { userResponse } from '../../store/slices/dialogSlice'; // Update the import path as necessary

const ConfirmationDialog = ({ message, isOpen, onOpenChange }) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(userResponse('confirmed'));
    onOpenChange(false); // Close dialog
  };

  const handleCancel = () => {
    dispatch(userResponse('cancelled'));
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
            {message} 4


            4
            
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={handleCancel}>Merge</Button>
            <Button appearance="primary" onClick={handleConfirm}>Reset</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default ConfirmationDialog;
