//set global variables.
let APIKey = "3c7eb4d8c3977b0477c702748ecc9908"
let city = "austin"
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
let query5Day = "https://api.openweathermap.org/data/2.5/forecast?lat=30.2672&lon=-97.7431&appid=3c7eb4d8c3977b0477c702748ecc9908" + "&units=imperial";
let weatherData = {};
let searchCityName = ["Atlanta", "Denver", "Seattle", "San Francisco", "Orlando","New York","Chicago", "Austin"]
//This function gets the value entered into the search box and sets it to a variable. executes API function
function searchCity(){
  let cityNameElm = document.getElementById("cityNameSearch");
  showWeather(cityNameElm.value);

};
//fetches the queryURL api using the link and populates the main container for the selected city
async function getWeather() {

    const response = await fetch(queryURL);
     weatherData = await response.json();
      let lon = weatherData.coord.lon;
      let lat = weatherData.coord.lat;
     query5Day = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat + "&lon=" + lon + "&appid=3c7eb4d8c3977b0477c702748ecc9908" + "&units=imperial";

    let cityNameElm = document.getElementById("weathercityname");
    let cityTempElm = document.getElementById("citytemp");
    let cityWindElm = document.getElementById("citywind");
    let cityHumidityElm = document.getElementById("cityhumidity");

     if (weatherData.cod == "404" || weatherData.cod == "400"){
      cityNameElm.innerHTML = weatherData.message;
      cityTempElm.innerHTML = "";
      cityWindElm.innerHTML = "";
      cityHumidityElm.innerHTML = "";
      return;
    
     }
  

    cityNameElm.innerHTML = weatherData.name;
    cityTempElm.innerHTML = weatherData.main.temp;
    cityWindElm.innerHTML = weatherData.wind.speed;
    cityHumidityElm.innerHTML = weatherData.main.humidity;


    fiveDayForecast();
  }
//gets the data for the 5 day forecast by looping over the forecast data from the weather API
   async function fiveDayForecast() {
    document.getElementById("forecatContainer").style.display = "none";
      const response = await fetch(query5Day)
      weatherData = await response.json();
      let currentDate =new Date();

      for (let i = 1; i <= 5; i++) {

        let forecastCityId = 'forecastCity' + i;
        let forecastCityElem = document.getElementById(forecastCityId);
        forecastCityElem.innerHTML = weatherData.city.name;

        let loopForcastId = 'forecastdate' + i;
        let forecastElem = document.getElementById(loopForcastId);
        forecastElem.innerHTML = getTomorrow(i);

        let loopforecastTempId = 'forecastTemp' + i;
        let forecastTempElem = document.getElementById(loopforecastTempId);
        forecastTempElem.innerHTML = "Temperature: " + weatherData.list[i].main.temp;

        let loopforecastWindId = 'forecastWind' + i;
        let forecastWindElem = document.getElementById(loopforecastWindId);
        forecastWindElem.innerHTML = "Wind Speed: " + weatherData.list[i].wind.speed + " mph";

        let foreHumidityId = 'foreHumidity' + i;
        let foreHumidityElem = document.getElementById(foreHumidityId);
        foreHumidityElem.innerHTML = "Humidity: " + weatherData.list[i].main.humidity + '%';

      }
      document.getElementById("forecatContainer").style.display = "block";
    
   };

//This function just gets tommorws date. 
//got function from : https://stackoverflow.com/questions/9444745/javascript-how-to-get-tomorrows-date-in-format-dd-mm-yy
   function getTomorrow(nextDay) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + nextDay);
    return `${tomorrow.getFullYear()}/${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`;
}

//dynamically creates the new queryURL for the API of the selected city then executes getWeather();
  async function showWeather(selectedCity){
   

     queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + selectedCity + "&appid=" + APIKey + "&units=imperial";
     getWeather();

  };

 
  function load(){
  
  }
// This will execute on page load. blank for now
  load();


