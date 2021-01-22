let searchBtn = document.querySelector("#search-form"); //button that will trigger the search inside the API
searchBtn.addEventListener("submit", searchEngine);

let farBtn = document.querySelector("#temp-f");
farBtn.addEventListener("click", displayinImperial);

let celBtn = document.querySelector("#temp-c");
celBtn.addEventListener("click", displayCelsius);

let celsiusTemp = null;

function searchEngine(event) {
    event.preventDefault()

    function formatDate(timestamp) {
        let newTime = timestamp;
        let cityTime = new Date(newTime);
        let date = cityTime.toDateString();
        let hours = cityTime.getHours();

        if (hours < 10) {
            hours = `0${hours}`;
        }
        let mins = cityTime.getMinutes();

        if (mins < 10) {
            mins = `0${mins}`;
        }

        return `Last updated: ${date} at ${hours}:${mins}`;
    }

    function showInfo(response) { //this functions is what gets triggered once the call to the API its made.
        let cityName = response.data.name;
        let countryName = response.data.sys.country;
        celsiusTemp = Math.round(response.data.main.temp);
        let description = response.data.weather[0].description;
        let humidity = response.data.main.humidity;
        let speed = Math.round(response.data.wind.speed);
        let icon = response.data.weather[0].icon;

        let cityDisplay = document.querySelector("#city-name");
        cityDisplay.innerHTML = `${cityName}, ${countryName}`;
        let tempDisplay = document.querySelector("#temp");
        tempDisplay.innerHTML = `${celsiusTemp}°C`;
        let descriptionDisplay = document.querySelector("#description");
        descriptionDisplay.innerHTML = `${description}`;
        let humidityDisplay = document.querySelector("#humidity");
        humidityDisplay.innerHTML = `Humidity: ${humidity}%`;
        let speedDisplay = document.querySelector("#speed");
        speedDisplay.innerHTML = `Speed: ${speed} Km/h`
        let timeDisplay = document.querySelector("#current-time");
        timeDisplay.innerHTML = formatDate(response.data.dt * 1000); //this is the part that will carry the timestamp taken from the API to the function that will format this into a readable string.
        let iconDisplay = document.querySelector("#icon");
        iconDisplay.setAttribute("src", `images/${icon}.png`);

    }

    let cityInput = document.querySelector("#search-city"); //this is where the user's city search arrives the first time
    let city = `${cityInput.value}`;
    let apiKey = "0603e85b4ce086e6bb52d7cdc7bcffb5";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let units = "metric";
    let apiUrl = `${apiEndPoint}${city}&units=${units}&appid=${apiKey}`;

    axios.get(apiUrl).then(showInfo); //this is the axios command that uses the city and the rest of the API call elements to make the call
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