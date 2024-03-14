import React from 'react';
import { defineScenarioTable } from '../clientLogic/Scenario/defineScenarioTable.js';
import { upsertScenarioTable } from '../clientLogic/Scenario/upsertScenarioTable.js';

class CreateExcelTable1 extends React.Component {
    handleClickFetchColumns = async () => {
        try {
            const columns = await defineScenarioTable("Scenario");
            /* console.log('Columns:', columns); */
        } catch (error) {
            /* console.error('Error:', error); */
        }
    }

    handleClickSubmitData = async () => {
        try {
            const columns = await upsertScenarioTable("Scenario");
            /* console.log('Columns:', columns); */
        } catch (error) {
            /* console.error('Error:', error); */
        }
    }

    render() {
        const containerStyle = {
            width: '100%', // Span full width of the screen
            height: 'calc(4 / 14 * 100vh)', // Take 4/14 of the screen height
            border: '1px solid #000', // Thin border
        };

        return (
            <div style={containerStyle}>
                <button onClick={this.handleClickFetchColumns}>Fetch Column Names</button>
                <button onClick={this.handleClickSubmitData}>Submit data</button>
            </div>
        );
    }
}

export default CreateExcelTable1;
