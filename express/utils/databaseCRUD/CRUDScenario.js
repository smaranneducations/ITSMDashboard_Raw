// Database CRUD operations using Sequelize

import { DataTypes,Op } from 'sequelize';
import { sequelize } from '../sequelize.js'; // Assuming you have your Sequelize instance configured in a separate file
import pkg from 'lodash';
const { isEqual } = pkg;


function normalizeValue(value) {
  return value == null || value === "" ? null : value;
}

// Suppress SQL logging
sequelize.options.logging = false;

// Define your model here
const Scenario = sequelize.define('Scenario', {
  ScenarioCode: {
    type: DataTypes.INTEGER,
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

async function fetchDataByFilter(tableName, filterConditions) {
  try {
    if (!filterConditions || filterConditions.length === 0) {
      const data = await Scenario.findAll();
      return data;
    }

    const whereClause = {
      [Op.and]: filterConditions.map((condition) => ({
        [condition.columnName]: {
          [Op.like]: `%${condition.filterValue}%`, // Default: like search with wildcards
        },
      })),
    };

    const filteredData = await Scenario.findAll({ where: whereClause });
    console.log(filteredData);
    return filteredData;
    
   
  } catch (error) {
    console.error(error);
    throw error;
  }
}






async function insertOrUpdateRecord_Sceanrio(tableName, records) {
  // Exclude ScenarioCode from the records before logging or returning
  const modifiedRecords = records.map(record => {
    const { ScenarioCode, IsUnique, ...rest } = record;
    return rest;
});


  let updates = [];
  let inserts = [];
    let updatedCount = 0;
    let insertedCount = 0;
    let statusText = '';
    let err = '';

    try {
        for (let record of modifiedRecords) {
                // Check if the record exists in the table based on the unique identifier (ScenarioName)
                const existingRecord = await Scenario.findOne({ where: { ScenarioName: record.ScenarioName }});
                if ( normalizeValue(existingRecord)) {
                  const { ScenarioCode, ...rest } = existingRecord.dataValues;
                  existingRecord.dataValues = rest;
                  if( !isEqual(existingRecord.dataValues, record)){
                  const updatedRecord = await Scenario.update(record, { where: { ScenarioName: record.ScenarioName } });
                  updatedCount++;
                  updates.push({ ScenarioCode: existingRecord.ScenarioCode, from: existingRecord.dataValues, to: record });
                  }
                } else if (!existingRecord) {
                  // Insert a new record
                  const inserted = await Scenario.create(record, { returning: true });
                  insertedCount++;
                  inserts.push({ ScenarioCode: inserted.ScenarioCode, created: inserted.dataValues });
                }
        }

        statusText = `${updatedCount} records updated successfully \n, ${insertedCount} records inserted successfully.`;
        // Return both statusText and err (if any error occurred)
        return { statusText: statusText, updates : updates, inserts: inserts };
    } catch (error) {   
      throw new Error(error)  
    }
   
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

export { getColumnNames, fetchData, fetchDataByFilter, insertOrUpdateRecord_Sceanrio, deleteRecordsByScenarioCode };
