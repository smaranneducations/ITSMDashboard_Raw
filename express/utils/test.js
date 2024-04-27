import {fetchDataByFilter} from './databaseCRUD/CRUDScenario.js';


const filterConditions = [
  { columnName: 'ScenarioName', filterValue: 'new2' },
  { columnName: 'ScenarioCode', filterValue: '0' },
];

const filteredData = await fetchDataByFilter('Scenario', filterConditions);