import React, { useState } from 'react';
import Header from './Header';
import Footer from "./Footer";
import { Button, Tooltip, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent } from "@fluentui/react-components";
import { ArrowCircleDownRegular, ArrowCircleUpRegular } from "@fluentui/react-icons";
import "./Account.css"; // Import CSS file for styles
import { defineScenarioTable } from '../clientLogic/Scenario/defineScenarioTable.js';

const Scenario = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            <Header logo="assets/logo-filled.png" title="Contoso Task Pane Add-in" message="Account Table" />
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
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                    <Button style={{display: 'none'}}>Open Dialog</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Confirm Upload</DialogTitle>
                        <DialogContent>
                            Are you sure you want to upload data?
                        </DialogContent>
                        <DialogActions>
                            <Button appearance="secondary" onClick={handleDialogClose}>Cancel</Button>
                            <Button appearance="primary" onClick={handleConfirm}>Confirm</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </div>
    );
};

export default Scenario;
