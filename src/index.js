
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
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", searchFunction);

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




