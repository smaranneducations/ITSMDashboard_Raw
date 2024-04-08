import React, { useState, useContext } from 'react';
import OfficeContext from '../OfficeContext'; // Adjust the import path as necessary
import Header from './Header';
import Footer from "./Footer";
import { Button, Tooltip } from "@fluentui/react-components";
import { ArrowCircleDownRegular, ArrowCircleUpRegular,DeleteDismissRegular,AddCircleRegular } from "@fluentui/react-icons";
import styles from "./Scenario.module.css";
import ConfirmationDialog1 from './generic/ConfirmationDialog1';
import DownloadDataDialog from './generic/DownloadDataDialog';
import { checkTableInNonTableNameSheets } from '../clientLogic/commonFunctions'; // Ensure this is correctly imported
import  TableLineItemDetails  from './generic/TableLineItemDetails';
import { downloadScenarioTable } from '../clientLogic/Scenario/downloadScenarioTable';
import { downloadScenarioTableInfo } from '../clientLogic/Scenario/downloadScenarioTableInfo';
import { updateOrAddScenarioRecords } from '../clientLogic/Scenario/updateOrAddScenarioRecords';
import { resetScenarioRecords } from '../clientLogic/Scenario/resetScenarioRecords';
import { upsertScenarioTable } from '../clientLogic/Scenario/upsertScenarioTable';
import DialogeUserForm from './generic/DialogeUserForm';
import DeleteDataDialog from './generic/DeleteDataDialog';  
import {addScenarioRecords} from '../clientLogic/Scenario/addScenarioRecords';
import { deleteScenarioRecords } from '../clientLogic/Scenario/deleteScenarioRecords';  

const Scenario = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [downloadDataDialogIsOpen, setDownloadDataDialogIsOpen] = useState(false);
    const [downloadDataDialogMessage, setDownloadDataDialogMessage] = useState("");
    const [isDialogeUserFormOpen, setIsDialogeUserFormOpen] = useState(false);
    const [deleteDataDialogIsOpen, setDeleteDataDialogIsOpen] = useState(false);
    const [deleteDataDialogMessage, setDeleteDataDialogMessage] = useState('');
   

    const officeContext = useContext(OfficeContext); // Use context here

    const handleDownButtonClick = async () => {
        if (!officeContext) {
            console.error('Office context is not defined');
            return;
        }
        
        const result = await checkTableInNonTableNameSheets(officeContext, "Scenario");


        if (result.found) {
            const message = result.message;
            setDialogMessage(message);
            setIsDialogOpen(true);
        } else if (result.message === "Sheet does not exist"){
            console.log("Sheet does not exist");
            await downloadScenarioTable (officeContext, "Scenario");
        } else if (result.message === "sheet exists and table setup is correct"){
            console.log("sheet exists and table setup is correct");
            const result1 = await downloadScenarioTableInfo (officeContext, "Scenario");
            setDownloadDataDialogIsOpen(true);
            setDownloadDataDialogMessage("Do you want to merge or reset the data? Excel " + result1.info1);
            
        }
    };

    const handleUpButtonClick = async () => {
        if (!officeContext) {
            console.error('Office context is not defined');
            return;
        }
        
        const result = await upsertScenarioTable(officeContext, "Scenario");
        console.log(result);

    };

    const handleDialogeUserFormRecordNumber = async (code, booleanValue, actionString) => {
        setIsDialogeUserFormOpen(booleanValue); // This will always close the dialog based on the booleanValue provided
        if (actionString === "insert record") {
          console.log("Code entered by the user: ", code);
          setIsDialogeUserFormOpen(false);
          const result = await addScenarioRecords(officeContext, "Scenario", code);
          console.log("Number of records added to the table: ", result);
        } else if (actionString === "close prompt") {
            setIsDialogeUserFormOpen(false);
            console.log("Operation aborted by the user.");
        }
      };
      

    const handleAddButtonClick = async () => {
        if (!officeContext) {
            console.error('Office context is not defined');
            return;
        }
        
        setIsDialogeUserFormOpen(true);
        console.log("Add button clicked");

    };
    handleDialogeUserFormRecordNumber

    const onOpenChangeDeleteDataDialog = async (isOpen, actionType) => {
        setDeleteDataDialogIsOpen(isOpen); // Always update dialog visibility based on the isOpen argument
    
        switch (actionType) {
            case 'Cancel':
                console.log('Cancel button clicked');
                // Handle Cancel action here
                break;
            case 'DeleteInExcel':
                console.log('Delete in Excel button clicked');
                await deleteScenarioRecords(officeContext, "Scenario");
                // Logic to delete data in Excel
                break;
            case 'DeleteInDB':
                console.log('Delete in Database button clicked');
                // Logic to delete data in the database
                break;
            default:
                console.log('Unknown action');
                // Handle any unknown actions
        }
    };

    const handleDeleteButtonClick = async () => {
        if (!officeContext) {
            console.error('Office context is not defined');
            return;
        }
        
        setDeleteDataDialogIsOpen(true);

    };

    // Handle user's acknowledgment (clicking OK in the dialog)
    const handleDialogOk = () => {
        setIsDialogOpen(false);
        // Abort the program or take appropriate action here
        console.log("Operation aborted by the user.");
    }; 

    //Handle user response on merge or reset
    const handleUserResponseDownloadDataDialog = async (downloadDataDialogIsOpen, action) => {
        setDownloadDataDialogIsOpen(downloadDataDialogIsOpen);
        if (action === 'merge') {
            // Merge data
            console.log("Merging data...");
           
            await updateOrAddScenarioRecords(officeContext, "Scenario");
            
        } else if (action === 'reset') {
            // Reset data
            console.log("Resetting data...");
            await resetScenarioRecords(officeContext, "Scenario");
        }
    };

    return (
        <div>
            <Header logo="assets/logo-filled.png" title="Contoso Task Pane Add-in" message="Scenario Table" />

            <div className={styles.empty_data}>
                <TableLineItemDetails
                    documentContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos est quidem velit quas laboriosam. Nulla pariatur illum dolorem iste, atque dolores aliquam qui accusantium molestias eveniet nemo facere cupiditate quae!"
                    conversationContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque inventore corrupti ducimus sed eveniet ipsum amet veniam facere vel! Voluptatem id commodi ullam ipsam autem laudantium excepturi quisquam ea vitae."
                    addinContent="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores rerum natus omnis? Aperiam, dolorem commodi autem nostrum inventore ex tempore amet nesciunt! Aspernatur consequatur hic unde rerum officiis vero beatae."
                />
            </div>
                
            <div className={styles.edit_data}>
                <div className={styles.box_text}>
                    <h4>Edit data</h4>
                </div>
                <div className={styles.addRecord_button}>
                    <Tooltip content="Add records to the excel table" relationship="label">
                        <Button size="large" icon={<AddCircleRegular />} onClick={handleAddButtonClick} />
                    </Tooltip>
                </div>
                <div className={styles.deleteRecord_button}>
                    <Tooltip content="Delete records from the table" relationship="label">
                        <Button size="large" icon={<DeleteDismissRegular />} onClick={handleDeleteButtonClick} />
                    </Tooltip>
                </div>
                <div className={styles.upload_button}>
                    <Tooltip content="Retrieve data from database" relationship="label">
                        <Button size="large" icon={<ArrowCircleDownRegular />} onClick={handleDownButtonClick} />
                    </Tooltip>
                </div>
                <div className={styles.download_button}>
                    <Tooltip content="Upload data back to database" relationship="label">
                        <Button size="large" icon={<ArrowCircleUpRegular />} onClick={handleUpButtonClick} />
                    </Tooltip>
                </div>
            </div>
            <Footer />
            
            {isDialogOpen && (
                <ConfirmationDialog1 
                    message={dialogMessage} 
                    isOpen={isDialogOpen} 
                    onOpenChange={handleDialogOk} 
                />
            )}

            {downloadDataDialogIsOpen && (
                <DownloadDataDialog 
                    downloadDataDialogIsOpen={downloadDataDialogIsOpen}
                    downloadDataDialogMessage={downloadDataDialogMessage}
                    onOpenChangeDataDialog={handleUserResponseDownloadDataDialog} 
                />
            )}

            {isDialogeUserFormOpen && (
                <DialogeUserForm 
                    isDialogeUserFormOpen={isDialogeUserFormOpen}
                    handleDialogeUserFormRecordNumber={handleDialogeUserFormRecordNumber} 
                />
            )}
            {deleteDataDialogIsOpen && (
                <DeleteDataDialog 
                    deleteDataDialogIsOpen={deleteDataDialogIsOpen}
                    deleteDataDialogMessage={"choose from the options below"} 
                    onOpenChangeDeleteDataDialog={onOpenChangeDeleteDataDialog}
                />
            )}
        </div>
    );
};

export default Scenario;
