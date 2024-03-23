import * as React from 'react';
import Header from './Header';
import Footer from "./Footer";
import { Button, Tooltip } from "@fluentui/react-components";
import { ArrowCircleDownRegular, ArrowCircleUpRegular } from "@fluentui/react-icons";
import "./Scenario.css"; // Import CSS file for styles

const Scenario = () => {
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
                        <Button size="large" icon={<ArrowCircleDownRegular />} />
                    </Tooltip>
                </div>
                <div className="download-button">
                    <Tooltip content="Upload data back to database" relationship="label">
                        <Button size="large" icon={<ArrowCircleUpRegular />} />
                    </Tooltip>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Scenario;
