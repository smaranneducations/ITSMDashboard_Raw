import React, { useState, useContext } from 'react';
import OfficeContext from '../OfficeContext'; // Adjust the import path as necessary
import Header from './Header';
import Footer from "./Footer";
import { Button, Tooltip } from "@fluentui/react-components";
import { ArrowCircleDownRegular, ArrowCircleUpRegular } from "@fluentui/react-icons";
import "./Scenario.css";
import ConfirmationDialog1 from './generic/ConfirmationDialog1';
import { checkTableInNonTableNameSheets } from '../clientLogic/commonFunctions'; // Ensure this is correctly imported

const Scenario = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const officeContext = useContext(OfficeContext); // Use context here

    const handleDownButtonClick = async () => {
        console.log('Checking for problematic tables...');
        // Make sure to check if officeContext is defined before using it
        if (!officeContext) {
            console.error('Office context is not defined');
            return;
        }
        
        const result = await checkTableInNonTableNameSheets(officeContext, "Scenario");

        if (result.found) {
            const message = `In sheet ${result.sheetName}, a table named "${result.tableName}" exists, which is incorrect. Click Confirm to abort the operation.`;
            setDialogMessage(message);
            setIsDialogOpen(true);
        } else {
            console.log('No problematic table found.');
            console.log(result);        }
    };

    // Handle user's acknowledgment (clicking OK in the dialog)
    const handleDialogOk = () => {
        setIsDialogOpen(false);
        // Abort the program or take appropriate action here
        console.log("Operation aborted by the user.");
    };

    return (
        <div>
            <Header logo="assets/logo-filled.png" title="Contoso Task Pane Add-in" message="Scenario Table" />
            <div className="empty-data">sceanrio table</div>
            <div className="edit-data">
                <div className="box-text">
                    <h4>Edit data</h4>
                </div>
                <div className="upload-button">
                    <Tooltip content="Retrieve data from database" relationship="label">
                        <Button size="large" icon={<ArrowCircleDownRegular />} onClick={handleDownButtonClick} />
                    </Tooltip>
                </div>
                <div className="download-button">
                    <Tooltip content="Upload data back to database" relationship="label">
                        <Button size="large" icon={<ArrowCircleUpRegular />} />
                    </Tooltip>
                </div>
            </div>
            <Footer />
            
            {isDialogOpen && (
                <ConfirmationDialog1 
                    message={dialogMessage} 
                    isOpen={isDialogOpen} 
                    onOpenChange={handleDialogOk} // Simplified
                />
            )}
        </div>
    );
};

export default Scenario;
