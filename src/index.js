function searchEngine(event) {
    event.preventDefault()

    function showInfo(response) {
        let cityName = response.data.name;
        let countryName = response.data.sys.country;
        let cityTemp = Math.round(response.data.main.temp);
        let description = response.data.weather[0].description;
        let humidity = response.data.main.humidity;
        let speed = response.data.wind.speed;

        let cityDisplay = document.querySelector("#city-name");
        cityDisplay.innerHTML = `${cityName}, ${countryName}`;
        let tempDisplay = document.querySelector("#temp");
        tempDisplay.innerHTML = `${cityTemp}°C`;
        let descriptionDisplay = document.querySelector("#description");
        descriptionDisplay.innerHTML = `${description}`;
        let humidityDisplay = document.querySelector("#humidity");
        humidityDisplay.innerHTML = `${humidity}%`;
        let speedDisplay = document.querySelector("#speed");
        speedDisplay.innerHTML = `${speed} Km/h`


    }

    let cityInput = document.querySelector("#search-city");
    let city = `${cityInput.value}`;
    let apiKey = "0603e85b4ce086e6bb52d7cdc7bcffb5";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let cel = "metric";
    let far = "imperial";
    let apiUrl = `${apiEndPoint}${city}&units=${cel}&appid=${apiKey}`;

    axios.get(apiUrl).then(showInfo);
}

let searchBtn = document.querySelector("#search-form");
searchBtn.addEventListener("submit", searchEngine);