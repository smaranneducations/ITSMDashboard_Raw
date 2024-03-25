import React, { useState } from 'react';
import Header from './Header';
import Footer from "./Footer";
import { Button, Tooltip } from "@fluentui/react-components";
import { ArrowCircleDownRegular, ArrowCircleUpRegular } from "@fluentui/react-icons";
import "./Scenario.css";
import ConfirmationDialog1 from './generic/ConfirmationDialog1'; // Adjust the import path as necessary

const Scenario = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDownButtonClick = () => {
        setIsDialogOpen(true); // Use setState to change visibility
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
                        <Button size="large" icon={<ArrowCircleUpRegular />} />
                    </Tooltip>
                </div>
            </div>
            <Footer />
            
            <ConfirmationDialog1 
                message="Are you sure you want to upload data?" 
                isOpen={isDialogOpen} 
                onOpenChange={setIsDialogOpen} 
            />
        </div>
    );
};

export default Scenario;
