const apiKey = "ba605efc18f1572f61892fe426f18a1a";
/* const api_country_URL = `https://flagsapi.com/${ds}/flat/32.png`;
 */
const city_input = document.querySelector("#city-input");
const search_btn = document.querySelector("#search");
const city_ = document.querySelector("#city_");
const container = document.querySelector(".container");
const background = document.querySelector("#background");

const loading = document.querySelector(".fa-solid.fa-spinner.fa-spin.fa-2xl");
const main = document.querySelector("#weather-data");
const city_element = document.querySelector("#city");
const temp_element = document.querySelector("#temperature span");
const desc_element = document.querySelector("#description");
const weather_icon_element = document.querySelector("#weather-icon");
const country_element = document.querySelector("#country");
const max_element = document.querySelector("#max span");
const min_element = document.querySelector("#min span");
const humidity_element = document.querySelector("#umidity span");
const wind_element = document.querySelector("#wind span");
const screen_width = screen.width;
const screen_height = screen.height;

const get_weather_data = async (city) => {
    try {
        container.style.display = "none";
        loading.style.display = "inline-block";
        const api_weather_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
        const [response_weather, response_back] = await Promise.all([
            fetch(api_weather_URL),
            fetch(
                `https://source.unsplash.com/${screen_width}x${screen_height}/?${city.replace(
                    /\s+/g,
                    "+"
                )}`
            ),
        ]);
        const data_weather = await response_weather.json();
        if (!response_weather.ok || !response_back.ok) {
            loading.style.display = "none";
            container.style.display = "inline-block";
            throw new Error("Network response was not ok");
        }
        loading.style.display = "none";
        container.style.display = "inline-block";
        console.log(data_weather);
        background.style.backgroundImage = `url(${response_back.url})`;
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundPosition = "center center";
        background.style.backgroundSize = "cover";
        city_element.textContent = `${data_weather.name}, ${data_weather.sys.country}`;
        temp_element.textContent = Math.round(data_weather.main.temp) + "ºC";
        desc_element.textContent = data_weather.weather[0].description;
        country_element.src = `https://flagsapi.com/${data_weather.sys.country}/flat/32.png`;
        weather_icon_element.src = `http://openweathermap.org/img/wn/${data_weather.weather[0].icon}.png`;
        max_element.textContent = data_weather.main.temp_max + "ºC";
        min_element.textContent = data_weather.main.temp_min + "ºC";
        humidity_element.textContent =
            Math.round(data_weather.main.humidity) + "%";
        wind_element.textContent = Math.round(data_weather.wind.speed) + "Km/h";
        main.classList.remove("hide");
        city_.textContent = "Check out the climate of a city:";
    } catch (error) {
        background.style.backgroundImage =
            "url('img/error-computer-lock-screen-9ga1hfyj2zeb892b.jpg')";
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundPosition = "center center";
        background.style.backgroundSize = "cover";
        main.classList.add("hide");
        city_.textContent = "Please enter a valid city name:";
    }
};
const show_weather_data = (city) => {
    get_weather_data(city);
};
const input_value = () => {
    const city = city_input.value;
    show_weather_data(city);
};
city_input.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (event.keyCode === 13) {
        input_value();
    }
});
search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    input_value();
});
