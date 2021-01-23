let searchBtn = document.querySelector("#search-form"); //button that will trigger the search engine
searchBtn.addEventListener("submit", searchEngine);

let farBtn = document.querySelector("#temp-f"); //Button that displays the current temperature in fahrenheit
farBtn.addEventListener("click", displayinImperial);

let celBtn = document.querySelector("#temp-c"); //Button that displays the current temperature in celsius
celBtn.addEventListener("click", displayCelsius);

let locationBtn = document.querySelector("#current-location");
locationBtn.addEventListener("click", locationSearch);

let celsiusTemp = null; // global variable that takes its value from the showInfo function within the searchEngine function and it is needed to support the correct function of the unit buttons.

function searchEngine(event) {
    event.preventDefault()

    function formatDate(timestamp) { //this functions its the one currently showing the date".
        let cityTime = new Date(timestamp);
        let date = cityTime.getDate();
        let week = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        let months = [
            "January",
            "February",
            "March",
            "Apri",
            "May",
            "June",
            "July",
            "August",
            "September",
            "November",
            "December"
        ];
        let day = week[cityTime.getDay()];
        let month = months[cityTime.getMonth()];

        return `${day} ${date} ${month} ${formatHours(timestamp)}`;
    }

    function formatHours(timestamp) {
        let newTime = timestamp;
        let forecastTime = new Date(newTime);
        let hours = forecastTime.getHours();
        let mins = forecastTime.getMinutes();
        if (hours < 10) {
            hours = `0${hours}`;
        }

        if (mins < 10) {
            mins = `0${mins}`;
        }

        return `${hours}:${mins}`
    }

    function showForecast(response) {
        let forecastDisplay = document.querySelector("#forecast-display");
        let forecast = null;
        forecastDisplay.innerHTML = null;

        for (let index = 0; index < 6; index++) {
            forecast = response.data.list[index];
            forecastDisplay.innerHTML += `
        <div class="col-sm-2 text-center date-large mb-5">
                <h3 class="date-large">
                ${formatHours(forecast.dt * 1000)}
            </h3>
            <img src="images/${forecast.weather[0].icon}.png" alt="forecast icon" class="img-fluid forecast-icon">
            <div class="forecast-temperatures">
                <strong>
                         ${Math.round(forecast.main.temp_max)}°
                 </strong> 
                  ${Math.round(forecast.main.temp_min)}°
            </div>
        </div>`;

        }

    }

    function showInfo(response) { //this functions is what gets triggered once the call to the API its made.
        let cityName = response.data.name;
        let countryName = response.data.sys.country;
        celsiusTemp = Math.round(response.data.main.temp);
        let description = response.data.weather[0].description;
        let humidity = response.data.main.humidity;
        let speed = Math.round(response.data.wind.speed);
        let icon = response.data.weather[0].icon;
        let dayTime = response.data.dt * 1000;

        let cityDisplay = document.querySelector("#city-name");
        cityDisplay.innerHTML = `${cityName}, ${countryName}`;
        let tempDisplay = document.querySelector("#temp");
        tempDisplay.innerHTML = `${celsiusTemp}°C`;
        let descriptionDisplay = document.querySelector("#description");
        descriptionDisplay.innerHTML = `${description}`;
        let humidityDisplay = document.querySelector("#humidity");
        humidityDisplay.innerHTML = `Humidity: ${humidity}%`;
        let speedDisplay = document.querySelector("#speed");
        speedDisplay.innerHTML = `Speed: ${speed} Km/h`;
        let timeDisplay = document.querySelector("#current-time");
        timeDisplay.innerHTML = formatDate(dayTime); //this is the part that will carry the timestamp taken from the API to the function that will format this into a readable string.
        let iconDisplay = document.querySelector("#icon");
        iconDisplay.setAttribute("src", `images/${icon}.png`);

    }

    let cityInput = document.querySelector("#search-city"); //this is where the user's city search arrives the first time
    let city = `${cityInput.value}`;
    let apiKey = "0603e85b4ce086e6bb52d7cdc7bcffb5";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let units = "metric";
    let apiUrl = `${apiEndPoint}${city}&units=${units}&appid=${apiKey}`;
    let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=0603e85b4ce086e6bb52d7cdc7bcffb5`;

    axios.get(apiUrl).then(showInfo); //this is the axios command that uses the city and the rest of the API call elements to make the call.

    axios.get(apiForecast).then(showForecast);
}

function locationSearch(event) {

    function showForecast(response) {
        let forecastDisplay = document.querySelector("#forecast-display");
        let forecast = null;
        forecastDisplay.innerHTML = null;

        for (let index = 0; index < 6; index++) {
            forecast = response.data.list[index];
            forecastDisplay.innerHTML += `
        <div class="col-sm-2 text-center date-large mb-5">
                <h3 class="date-large">
                ${formatHours(forecast.dt * 1000)}
            </h3>
            <img src="images/${forecast.weather[0].icon}.png" alt="forecast icon" class="img-fluid forecast-icon">
            <div class="forecast-temperatures">
                <strong>
                         ${Math.round(forecast.main.temp_max)}°
                 </strong> 
                  ${Math.round(forecast.main.temp_min)}°
            </div>
        </div>`;

        }

    }

    function formatHours(timestamp) {
        let newTime = timestamp;
        let forecastTime = new Date(newTime);
        let hours = forecastTime.getHours();
        let mins = forecastTime.getMinutes();
        if (hours < 10) {
            hours = `0${hours}`;
        }

        if (mins < 10) {
            mins = `0${mins}`;
        }

        return `${hours}:${mins}`
    }

    function formatDate(timestamp) { //this functions its the one currently showing the date".
        let cityTime = new Date(timestamp);
        let date = cityTime.getDate();
        let week = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        let months = [
            "January",
            "February",
            "March",
            "Apri",
            "May",
            "June",
            "July",
            "August",
            "September",
            "November",
            "December"
        ];
        let day = week[cityTime.getDay()];
        let month = months[cityTime.getMonth()];

        return `${day} ${date} ${month} ${formatHours(timestamp)}`;
    }

    function showLocationInfo(response) {
        let cityName = response.data.name;
        let countryName = response.data.sys.country;
        celsiusTemp = Math.round(response.data.main.temp);
        let description = response.data.weather[0].description;
        let humidity = response.data.main.humidity;
        let speed = Math.round(response.data.wind.speed);
        let icon = response.data.weather[0].icon;
        let dayTime = response.data.dt * 1000;

        let cityDisplay = document.querySelector("#city-name");
        cityDisplay.innerHTML = `${cityName}, ${countryName}`;
        let tempDisplay = document.querySelector("#temp");
        tempDisplay.innerHTML = `${celsiusTemp}°C`;
        let descriptionDisplay = document.querySelector("#description");
        descriptionDisplay.innerHTML = `${description}`;
        let humidityDisplay = document.querySelector("#humidity");
        humidityDisplay.innerHTML = `Humidity: ${humidity}%`;
        let speedDisplay = document.querySelector("#speed");
        speedDisplay.innerHTML = `Speed: ${speed} Km/h`;
        let timeDisplay = document.querySelector("#current-time");
        timeDisplay.innerHTML = formatDate(dayTime);
        let iconDisplay = document.querySelector("#icon");
        iconDisplay.setAttribute("src", `images/${icon}.png`);
    }

    function currentPosition(response) {
        let lat = response.coords.latitude;
        let lon = response.coords.longitude;
        let units = "metric";
        let apiKey = "0603e85b4ce086e6bb52d7cdc7bcffb5";
        let apiUrlcurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
        let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`

        axios.get(apiUrlcurrentLocation).then(showLocationInfo);

        axios.get(apiForecast).then(showForecast);
    }

    navigator.geolocation.getCurrentPosition(currentPosition);



}

function displayinImperial(event) {
    event.preventDefault();
    farBtn.classList.add("active");
    celBtn.classList.remove("active");
    let fahrTemp = Math.round((celsiusTemp * 9 / 5) + 32);
    let tempDisplay = document.querySelector("#temp");
    tempDisplay.innerHTML = `${fahrTemp}°F`;
}

function displayCelsius(event) {
    event.preventDefault();
    celBtn.classList.add("active");
    farBtn.classList.remove("active");
    let tempDisplay = document.querySelector("#temp");
    tempDisplay.innerHTML = `${celsiusTemp}°C`;
}