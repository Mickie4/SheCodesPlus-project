
//Current time function


let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

let formatTime = `${hours}:${minutes}`;

let htmlTime = document.querySelector("#current-time");

htmlTime.innerHTML = formatTime;

//Search Engine 

function searchFunction(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-name");
    let cityName = cityInput.value;
    let cityH2 = document.querySelector("#city-name");

    cityH2.innerHTML = `${cityName}`;

    //City Temperature 

    function cityTempCelsius(response) {
        let tempResult = Math.round(response.data.main.temp);
        let tempDisplay = document.querySelector("#temp-display");
        tempDisplay.innerHTML = `${tempResult}°C`
    }
    
    
    //API to search for cityInput temperature in Celsius

    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
    let apiKey = "0603e85b4ce086e6bb52d7cdc7bcffb5";
    let celsius = "metric"
    let fahrenheit = "imperial"
    let apiUrl = `${apiEndPoint}${cityName}&units=${celsius}&appid=${apiKey}`

    axios.get(apiUrl).then(cityTempCelsius);
}

//Search engine function ends here!

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", searchFunction);



//Geolocation button for current temp
function findCurrentLocation(event) {
    event.preventDefault();

    function currentTemperature(response) {
        let temperature = Math.round(response.data.main.temp);
        let currentCity = response.data.name;
        let displayCity = document.querySelector("#city-name");
        displayCity.innerHTML = `${currentCity}`
        let displayTemp = document.querySelector("#temp-display");
        displayTemp.innerHTML = `${temperature}°C`
        console.log(currentCity);

    }

    function positionData(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let units = "metric";
        let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?"
        let apiKey = "0603e85b4ce086e6bb52d7cdc7bcffb5"
        let apiUrl =`${apiEndPoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
        axios.get(apiUrl).then(currentTemperature);
    }

    navigator.geolocation.getCurrentPosition(positionData);
}


let locationBtn= document.querySelector("#current-location");
locationBtn.addEventListener("click", findCurrentLocation);
    


//Change the temperature

function TempInF(event) {
    event.preventDefault();
    let currentTemp = 9;
    let conversionToF = (currentTemp * 9/5) + 32;
    let tempDisplay = document.querySelector("#temp-display");
    tempDisplay.innerHTML = `${conversionToF}°F`;

}

let farButton = document.querySelector("#temp-f");
farButton.addEventListener("click", TempInF);

//Change back to Celsius

function changeBack(event) {
    event.preventDefault();
    let orginalTemp = 9;
    let tempDisplay = document.querySelector("#temp-display");
    tempDisplay.innerHTML = `${orginalTemp}°C`
}

let celButton = document.querySelector("#temp-c");
celButton.addEventListener("click", changeBack);




