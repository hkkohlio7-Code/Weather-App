const addBtn = document.getElementById("addbtn");
const weatherApp = document.querySelector(".weather-app");
const searchWrapper = document.querySelector(".searchWrapper");
const cityinput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const welcomeText = document.querySelector(".welcome-text");
const weatherCard = document.querySelector(".weather-card");
const img = document.getElementById("img");
const temp = document.getElementById("temp");
const AQI = document.getElementById("aqi");
const Chances = document.getElementById("c-rain");
const feelTemp = document.getElementById("feel-temp");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity-%");

const cityName = document.getElementById("city");


async function getWeather(){

        const URL = `https://api.weatherapi.com/v1/current.json?key=341cf30f881743feaa7102631261006&q=${cityName.innerText}&aqi=yes`;

        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        temp.innerText = `${data.current.temp_c}°C`;
        const pm25 = data.current.air_quality.pm2_5;
        if(pm25 <= 50){
            AQI.innerText = `AQI: ${pm25} 😊 (Good)`;
        }else if(pm25 <= 100){
            AQI.innerText = `AQI: ${pm25} 🙂 (Moderate)`;
        }else if(pm25 <= 150){
            AQI.innerText = `AQI: ${pm25} 😐 (Unhealthy)`;
        }else if(pm25 <= 200){
            AQI.innerText = `AQI: ${pm25} 😷 (Very Unhealthy)`
        }else if(pm25 <= 250){
            AQI.innerText = `AQI: ${pm25} 🤢 (Very Unhealthy)`;
        }else{
            AQI.innerText = `AQI: ${pm25} ☠️ (Hazardous)`;
        }
        Chances.innerText =`Chances of 🌧️: ${data.current.chance_of_rain}%`;
        feelTemp.innerText= `feels like: ${data.current.feelslike_c}°C`;
        windSpeed.innerText = `${data.current.wind_mph}Km/h`;
        humidity.innerText = `${data.current.humidity}%`;
        const iconUrl = "https:" + data.current.condition.icon;
        img.src = iconUrl.replace("64x64", "128x128");
        const weather = data.current.condition.text;
        console.log(weather);
        const code = data.current.condition.code;
        console.log(code);
        const isDay = data.current.is_day;
        console.log(isDay)
        weatherApp.classList.remove(
        "sunny-day",
        "clear-night",
        "cloudy-day",
        "cloudy-night",
        "rainy-day",
        "rainy-night",
        "snowy",
        "stormy"
        );
        if(code === 1000){
            if(isDay == 1){
                weatherApp.classList.add("sunny-day");
            }else {
                weatherApp.classList.add("clear-night");
            }
        }else if([1003,1006,1009].includes(code)){
           if(isDay == 1){
                weatherApp.classList.add("cloudy-day");
            }else {
                weatherApp.classList.add("cloudy-night");
            }
        }else if([1063,1180,1183,1186,1189,1192,1195].includes(code)){
           if(isDay == 1){
                weatherApp.classList.add("rainy-day");
            }else {
                weatherApp.classList.add("rainy-night");
            }
        }else if([1210,1213].includes(code)){

            weatherApp.classList.add("snowy");

        }else if([1273,1276].includes(code)){

            weatherApp.classList.add("stormy");
        }else if([1030].includes(code)){
            weatherApp.classList.add("misty");
        }
    }

    function updateWeather(){
    
    
    if(cityinput.value.trim()== ""){
        alert("Please Enter a city");
        return;
    }
    cityName.innerText = cityinput.value;
     weatherCard.style.height = "auto";
    welcomeText.style.display = "none";

    getWeather();
    cityinput.value ="";
    }
searchBtn.addEventListener("click", () =>{
    updateWeather();
})

cityinput.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        updateWeather();
    }
})





addBtn.addEventListener("click", () => {
    addBtn.classList.toggle("active");
    searchWrapper.classList.toggle("show");
})
