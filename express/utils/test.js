import {fetchDataByFilter, fetchData} from './databaseCRUD/CRUDScenario.js';


const filterConditions = [
  { columnName: 'ScenarioName', filterValue: 'new28' },
  { columnName: 'ScenarioCode', filterValue: '0' },
];

const filteredData = await fetchDataByFilter('Scenario', filterConditions);

