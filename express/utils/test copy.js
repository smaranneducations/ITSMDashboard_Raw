const filterkeyword = [
  { "columnName": "ScenarioName", "filterValue": "v3" },
  { "columnName": "ScenarioCode", "filterValue": "0" }
];




fetch('http://localhost:3001/api/fetchdata/Scenario')
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      console.error('Expected JSON but received:', contentType);
      return response.text(); // or handle binary data if expected
    }
  })
  .then(data => {
    console.log('Data received:', data);
  })
  .catch(error => {
    console.error('Error parsing response:', error);
  });

