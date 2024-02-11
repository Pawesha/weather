
document.getElementById("getWeatherBtn").addEventListener("click", function() {
    // Get the existing weatherData container
    var weatherContainer = document.getElementById("weatherData");

    // If the weather data container exists, clear its content
    if (weatherContainer) {
        weatherContainer.innerHTML = ""; // Clear the content
    } else {
        // If the weather data container doesn't exist, create it
        weatherContainer = document.createElement("div");
        weatherContainer.id = "weatherData"; // Set the id of the div
        document.body.appendChild(weatherContainer); // Append the div to the document body
    }

    // Call the API function to fetch weather data
    api();
});

document.getElementById("getForecast").addEventListener("click", function() {
   
    var forecastContainer = document.getElementById("weatherForecast");


    if (forecastContainer) {
        forecastContainer.innerHTML = ""; 
    } else {
       
        forecastContainer = document.createElement("div");
        forecastContainer.id = "weatherForecast"; 
        document.body.appendChild(forecastContainer); 
    }

    // Call the API function to fetch new forecast data
    apiforecast();
});

  //making api function and fetching it 
function api() {
    var inputCountry = document.getElementById("cname").value; // Get the value of the input field
    var apiUrl = "http://api.weatherapi.com/v1/current.json?key=c504541f35b7468baf384014240802&q=" + encodeURIComponent(inputCountry);
   
    fetch(apiUrl)
    
        .then(res => res.json())
       
        .then(data => {
            // console.log(data)
            displayWeather(data); // Call displayWeather with fetched data
        })
        .catch(error => console.error('Error fetching weather data:', error));

}
function apiforecast(){
    var inputCountry = document.getElementById("cname").value;
   
    var apiURL="http://api.weatherapi.com/v1/forecast.json?key=c504541f35b7468baf384014240802&q=" + encodeURIComponent(inputCountry)+         "&days=9&aqi=yes&alerts=yes";
    fetch(apiURL)
    .then(response=>response.json())
    //convert response to json and store
    .then (data=>{
        console.log(data);
        displayForecast(data);
    })

    
}
apiforecast();

function displayWeather(weatherData) {
  
  

    var weatherContainer = document.getElementById("weatherData");

    // Check if weatherData
    if (weatherData ) {
        // Create elements to display the weather information
        var locationName = document.createElement("h1");
        // take the value weatherData.location.name from api and add it the element text
        locationName.textContent = "Location: " + weatherData.location.name;
        locationName.classList.add("weather-location");

        var temperature = document.createElement("p");
        temperature.textContent = "Temperature: " + weatherData.current.temp_c + "°C";
        temperature.classList.add("weather-temperature");

        var temperatureF = document.createElement("p");
        temperatureF.textContent = "Temperature: " + weatherData.current.temp_f + "°F";
        temperatureF.classList.add("weather-temperature");

        var condition = document.createElement("p");
        condition.textContent = "Condition: " + weatherData.current.condition.text;
        condition.classList.add("weather-condition");

        var date=document.createElement("h2");
        date.textContent=weatherData.current.last_updated;
        date.classList.add("weather-date");


        var weatherIcon = document.createElement("img");
        weatherIcon.src =   weatherData.current.condition.icon;
        weatherIcon.classList.add("weather-Icon");

        // Append elements to the weather container
        weatherContainer.innerHTML = ""; // Clear previous weather data
        weatherContainer.appendChild(weatherIcon);
        weatherContainer.appendChild(locationName);
        weatherContainer.appendChild(date);
        weatherContainer.appendChild(temperature);
        weatherContainer.appendChild(temperatureF);
       
       
        weatherContainer.appendChild(condition);
       
    } else {
        // If weatherData or location is undefined, display an error message
        weatherContainer.innerHTML = "Error: Weather data not available.";
    }
}
function displayForecast(weatherForecast) {
    var forecastContainer = document.getElementById("weatherForecast");

    if (weatherForecast ) {
        // each day ko data
        var forecastData = weatherForecast.forecast.forecastday;
        // console.log(forecastData);

        // Clear previous forecast data
        forecastContainer.innerHTML = "";

        // Iterate over each forecast day
        forecastData.forEach(day => {
            // Create elements for forecast data
            var date = document.createElement("h3");
            date.textContent = "Date: " + day.date;

            var condition = document.createElement("p");
            condition.textContent = "Condition: " + day.day.condition.text;

            var temperature = document.createElement("p");
            temperature.textContent = "Temperature: " + day.day.avgtemp_c + "°C";

            var temperat = document.createElement("p");
            temperat.textContent = "Temperature: " + day.day.avgtemp_f + "°F";

            var sunrise = document.createElement("p");
            sunrise.textContent = "Sunrise: " + day.astro.sunrise;

            var sunset = document.createElement("p");
            sunset.textContent = "Sunset: " + day.astro.sunset;
            // for icon
            var Icon = document.createElement("img");
            Icon.src = day.day.condition.icon;
            Icon.width = "100";
            Icon.height = "100";
            Icon.style.display = "block";
            Icon.style.margin = "auto";
            

            // Create a container for each day's forecast
            var dayContainer = document.createElement("div");
            dayContainer.classList.add("forecast-day");

            // Append elements to the day container
            dayContainer.appendChild(Icon);
            dayContainer.appendChild(date);
            dayContainer.appendChild(condition);
            dayContainer.appendChild(temperature);
            dayContainer.appendChild(temperat);
            dayContainer.appendChild(sunrise);
            dayContainer.appendChild(sunset);

            // Append the day container to the forecast container
            forecastContainer.appendChild(dayContainer);
        });
    } else {
        // If forecast data is not available, display an error message
        forecastContainer.innerHTML = "Error: Forecast data not available.";
    }
}


// function api(){
//     fetch("http://api.weatherapi.com/v1/current.json?key=c504541f35b7468baf384014240802" )
//     q="Nepal"
//     .then(res=> res.json())
//     //parameter res respone is in json
//     .then(data=> console.log(data))
//     // .then(data=> console.log(data.current.temp_c))
//     // .then(data=>console.log(data.location.country))
//     // .then(data=>console.log(data.current.condition.icon))
//     // .then(data=>console.log(data.location.name))
//     //data is object


// }
// api();

