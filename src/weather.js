const fetchWeather = () => {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hoboken?unitGroup=us&key=HE9MELQJLQJP4P8366SN994DB&contentType=json", {
        mode: 'cors',
        "method": "GET",
        "headers": {
        }
        })
      .then(response => {
        console.log(response.json());
      })
      .catch(err => {
        console.error(err);
      }); 
}; 

fetchWeather();