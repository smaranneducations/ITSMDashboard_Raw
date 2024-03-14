import { getColumnNames, fetchData, insertOrUpdateRecord_Sceanrio } from '../utils/databaseCRUD/CRUDScenario.js';

// Example usage:
const tableName = 'Scenario';

const records = [
  {"ScenarioCode":38,"ScenarioOpen":"Open","ScenarioName":"Actual_new2","ScenarioDescription":"Budget Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0},
  {"ScenarioCode":3,"ScenarioOpen":"Open","ScenarioName":"Actual_new3","ScenarioDescription":"Forecast Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0},
  {"ScenarioCode":2,"ScenarioOpen":"Open","ScenarioName":"Actual_new4","ScenarioDescription":"Budget Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0},
  {"ScenarioCode":3,"ScenarioOpen":"Open","ScenarioName":"Actual_new5","ScenarioDescription":"Forecast Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0},
  {"ScenarioCode":8,"ScenarioOpen":"closed","ScenarioName":"Actual_new6","ScenarioDescription":"Forecast Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0},
  {"ScenarioCode":9,"ScenarioOpen":"closed","ScenarioName":"Actual_new7","ScenarioDescription":"Forecast Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0},
  {"ScenarioCode":10,"ScenarioOpen":"closed","ScenarioName":"Actual_new8","ScenarioDescription":"Forecast Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0},
  {"ScenarioCode":2,"ScenarioOpen":"Open","ScenarioName":"Actual_new9","ScenarioDescription":"Budget Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0},
  {"ScenarioCode":3,"ScenarioOpen":"Open","ScenarioName":"Actual_new10","ScenarioDescription":"Forecast Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0},
  {"ScenarioCode":4,"ScenarioOpen":"Open","ScenarioName":"Actual_new11","ScenarioDescription":"Forecast Scenario","UD1":"","UD2":"","UD3":"","DocAttachments":0}
];

getColumnNames(tableName);
fetchData(tableName);
// insertOrUpdateRecord_Sceanrio(tableName, records); // Uncomment this line if needed
