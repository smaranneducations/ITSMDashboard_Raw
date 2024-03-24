import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from "./Footer";
import { Button, Tooltip } from "@fluentui/react-components";
import { ArrowCircleDownRegular, ArrowCircleUpRegular } from "@fluentui/react-icons";
import "./Scenario.css";
import { defineScenarioTable } from '../clientLogic/Scenario/defineScenarioTable.js';
import ConfirmationDialog from './generic/ConfirmationDialog'; // Adjust the import path as necessary
import { checkTableInNonScenarioSheets } from '../clientLogic/commonFunctions.js';


const Scenario = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dialogResponse = useSelector((state) => state.dialog.response);

    useEffect(() => {
        if (dialogResponse) {
            console.log("User response:", dialogResponse);
            // Additional logic based on the response
        }
    }, [dialogResponse]);

    const handleDownButtonClick = async () => {
        try {
            const columns = await defineScenarioTable("Scenario");
            // Console.log('Columns:', columns); is commented out, but you can uncomment to use
        } catch (error) {
            // Console.error('Error:', error); is commented out, but you can uncomment to use
        }
    };

    const handleUpButtonClick = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleConfirm = () => {
        console.log('Uploading data...');
        setIsDialogOpen(false);
        // Additional logic for what happens after confirmation
    };

    return (
        <div>
            <Header logo="assets/logo-filled.png" title="Contoso Task Pane Add-in" message="Scenario Table" />
            <div className="empty-data">hahahahah</div>
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
                        <Button size="large" icon={<ArrowCircleUpRegular />} onClick={handleUpButtonClick} />
                    </Tooltip>
                </div>
            </div>
            <Footer />
            
            <ConfirmationDialog 
                message="Are you sure you want to upload data?" 
                isOpen={isDialogOpen} 
                onOpenChange={setIsDialogOpen} 
            />
        </div>
    );
};

export default Scenario;
