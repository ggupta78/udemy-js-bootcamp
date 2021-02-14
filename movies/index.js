const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com', {
    params: {
      apikey: 'd6915f',
      s: 'avengers',
    },
  });

  console.log(response);
};

fetchData();
