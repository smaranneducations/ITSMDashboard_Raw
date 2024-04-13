// Database CRUD operations using Sequelize

import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js'; // Assuming you have your Sequelize instance configured in a separate file

// Suppress SQL logging
sequelize.options.logging = false;

// Define your model here
const Scenario = sequelize.define('Scenario', {
  ScenarioCode: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true
  },
  ScenarioOpen: DataTypes.STRING,
  ScenarioName: {
    type: DataTypes.STRING,
    unique: true // Ensures uniqueness of ScenarioName
  },
  ScenarioDescription: DataTypes.TEXT,
  UD1: DataTypes.STRING,
  UD2: DataTypes.STRING,
  UD3: DataTypes.STRING,
  DocAttachments: DataTypes.INTEGER
}, {
  tableName: 'Scenario',
  timestamps: false // Assuming there are no timestamp fields in your table
});



async function getColumnNames(tableName) {
  // Retrieve column names using Sequelize's describe method
  const columnsInfo = await Scenario.describe();
  const columns = Object.keys(columnsInfo).map(columnName => ({
    name: columnName,
    dataType: columnsInfo[columnName].type
  }));
  return columns;
}

async function fetchData(tableName) {
  // Fetch all records from the table
  const data = await Scenario.findAll();
  return data;
}

async function insertOrUpdateRecord_Sceanrio(tableName, records) {
    const CustomScenario = sequelize.define(
        'CustomScenario',
        {
            ScenarioCode: {
              type: DataTypes.STRING,
              primaryKey: true,
              autoIncrement: true
            },
            ScenarioOpen: DataTypes.STRING,
            ScenarioName: {
              type: DataTypes.STRING,
              unique: true // Ensures uniqueness of ScenarioName
            },
            ScenarioDescription: DataTypes.TEXT,
            UD1: DataTypes.STRING,
            UD2: DataTypes.STRING,
            UD3: DataTypes.STRING,
            DocAttachments: DataTypes.INTEGER
          }, {
            tableName: 'Scenario',
            timestamps: false // Assuming there are no timestamp fields in your table
          });
          CustomScenario.removeAttribute('ScenarioCode');

    let updatedCount = 0;
    let insertedCount = 0;
    let statusText = '';
    let err = '';

    try {
        for (let record of records) {
            // Check if the record has a valid ScenarioName
            if (record.ScenarioName) {
                // Check if the record exists in the table based on the unique identifier (ScenarioName)
                const existingRecord = await CustomScenario.findOne({ where: { ScenarioName: record.ScenarioName }});
                
                if (existingRecord) {
                    // Update the existing record
                    await CustomScenario.update(record, { where: { ScenarioName: record.ScenarioName } });
                    updatedCount++;
                } else {
                    // Insert a new record
                    await CustomScenario.create(record);
                    insertedCount++;
                }
            } else {
                console.warn('Skipping record without a valid ScenarioName:', record);
            }
        }

        statusText = `${updatedCount} records updated successfully, ${insertedCount} records inserted successfully.`;
    } catch (error) {
        err = error; // Capture the error message
        console.error("Error:", err);
    }

    console.log(statusText);
    // Return both statusText and err (if any error occurred)
    return { statusText, err };
}

  
  
async function deleteRecordsByScenarioCode(tableName, scenarioCodes) {
  // Delete records based on the ScenarioCode
  const rowsAffected = await Scenario.destroy({
    where: {
      ScenarioCode: scenarioCodes
    }
  });
  return { statusText: `${rowsAffected} records deleted successfully.` };
}

export { getColumnNames, fetchData, insertOrUpdateRecord_Sceanrio, deleteRecordsByScenarioCode };
