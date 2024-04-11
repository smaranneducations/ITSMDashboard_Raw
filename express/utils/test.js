import { deleteRecordsByScenarioCode } from './databaseCRUD/CRUDScenario.js';

let records = [{"scenariocode":48},{"scenariocode":43}]
let result = deleteRecordsByScenarioCode("Scenario", records);

console.log(result);