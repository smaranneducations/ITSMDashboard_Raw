import React from 'react';
import { createExcelTable, insertDataInTable } from '../office-document';

class CreateExcelTable1 extends React.Component {
    handleClickFetchColumns = async () => {
        try {
            const columns = await createExcelTable("Scenario");
            /* console.log('Columns:', columns); */
        } catch (error) {
            /* console.error('Error:', error); */
        }
    }

    handleClickSubmitData = async () => {
        try {
            const columns = await insertDataInTable("Scenario");
            /* console.log('Columns:', columns); */
        } catch (error) {
            /* console.error('Error:', error); */
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClickFetchColumns}>Fetch Column Names</button>
                <button onClick={this.handleClickSubmitData}>Submit data</button>
            </div>
        );
    }
}

export default CreateExcelTable1;
