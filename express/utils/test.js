function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return { error: error.message }; // Return an error object
      });
  }
  const data = await fetchData('https://example.com/data.json');
 console.log(data);