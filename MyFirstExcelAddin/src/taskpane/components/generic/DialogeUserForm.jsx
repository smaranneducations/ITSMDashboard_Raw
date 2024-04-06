import React, { useState } from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
  input: {
    width: "10vw", // Adjusted for example, ensure this fits your design
  },
});

// Assume setIsDialogeUserFormOpen is passed to handle the opening/closing of the dialog
const DialogeUserForm = ({ isDialogeUserFormOpen, setIsDialogeUserFormOpen, handleDialogeUserFormRecordNumber }) => {
  const styles = useStyles();
  const [code, setCode] = useState("1"); // Initialize with default code "1"

  const handleSubmit = (ev) => {
    ev.preventDefault();
    handleDialogeUserFormRecordNumber(code); // Pass the code to the handler
  };

  // Function to close the dialog without performing any action
  const handleClose = () => {
    setIsDialogeUserFormOpen(false);
  };

  const handleCodeChange = (ev) => {
    setCode(ev.target.value);
  };

  

  return (
    <Dialog open={isDialogeUserFormOpen} modalType="non-modal">
      <DialogSurface>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>Enter 4-digit code</DialogTitle>
            <DialogContent className={styles.content}>
              <Label required htmlFor="number-input">
                4-digit Code
              </Label>
              <Input
                className={styles.input}
                required
                type="number"
                id="number-input"
                min="1"
                max="9999"
                title="Please enter Number of records to be added (1 to 9999)"
                value={code}
                onChange={handleCodeChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} appearance="secondary">
                Close
              </Button>
              <Button type="submit" appearance="primary">
                Submit
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default DialogeUserForm;
