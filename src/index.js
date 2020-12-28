
let weather = {
  "paris": {
    temp: 19.7,
    humidity: 80
  },
  "tokyo": {
    temp: 17.3,
    humidity: 50
  },
  "lisbon": {
    temp: 30.2,
    humidity: 20
  },
  "sanFrancisco": {
    temp: 20.9,
    humidity: 100
  },
  "moscow": {
    temp: -5,
    humidity: 20
  }
};

function cityWeather() {
    let city = prompt("Enter a city please?");
    city = city.toLowerCase();
    city = city.trim();
if (city === "paris") {
    alert(`It is currently ${weather.paris.temp}C in ${city} with a humidity of ${weather.paris.humidity}%`);
} if (city === "tokyo") {
    alert(`It is currently ${weather.tokyo.temp}C in ${city} with a humidity of ${weather.tokyo.humidity}%`);
} if (city === "lisbon") {
    alert(`It is currently ${weather.lisbon.temp}C in ${city} with a humidity of ${weather.lisbon.humidity}%`);
} if (city === "san francisco") {
    alert(`It is currently ${weather.sanFrancisco.temp}C in ${city} with a humidity of ${weather.sanFrancisco.humidity}%`);
} if (city === "moscow") {
    alert(`It is currently ${weather.moscow.temp}C in ${city} with a humidity of ${weather.moscow.humidity}%`);
}  else {
    alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
}


}

cityWeather(weather);


