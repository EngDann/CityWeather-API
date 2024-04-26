// Chave de API para acessar o serviço de dados meteorológicos OpenWeatherMap.
const apiKey = "ba605efc18f1572f61892fe426f18a1a";

// Seleciona elementos do DOM para interagir com a entrada do usuário, botão de busca, e outros elementos da UI.
const city_input = document.querySelector("#city-input");
const search_btn = document.querySelector("#search");
const city_ = document.querySelector("#city_");
const container = document.querySelector(".container");
const background = document.querySelector("#background");

// Seleciona o elemento de loading e os elementos onde os dados meteorológicos serão exibidos.
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

// Obtém a largura e altura da tela do usuário para buscar uma imagem de fundo adequada.
const screen_width = screen.width;
const screen_height = screen.height;

// Função assíncrona para buscar dados meteorológicos e uma imagem de fundo.
const get_weather_data = async (city) => {
    try {
        // Esconde o container principal e mostra o ícone de loading.
        container.style.display = "none";
        loading.style.display = "inline-block";

        // Constrói URLs para a API meteorológica e para buscar uma imagem de fundo do Unsplash.
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

        // Processa a resposta da API meteorológica.
        const data_weather = await response_weather.json();

        // Verifica se ambas as respostas da API estão ok.
        if (!response_weather.ok || !response_back.ok) {
            loading.style.display = "none";
            container.style.display = "inline-block";
            throw new Error("Network response was not ok");
        }

        // Atualiza a UI com os dados meteorológicos e a imagem de fundo.
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
        // Em caso de erro, mostra uma imagem de erro e esconde os dados meteorológicos.
        background.style.backgroundImage =
            "url('img/error-computer-lock-screen-9ga1hfyj2zeb892b.jpg')";
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundPosition = "center center";
        background.style.backgroundSize = "cover";
        main.classList.add("hide");
        city_.textContent = "Please enter a valid city name:";
    }
};

// Função para iniciar a busca de dados meteorológicos.
const show_weather_data = (city) => {
    get_weather_data(city);
};

// Função para obter o valor inserido pelo usuário e chamar a função de busca.
const input_value = () => {
    const city = city_input.value;
    show_weather_data(city);
};

// Adiciona event listeners para buscar dados quando o usuário pressiona 'Enter' ou clica no botão de busca.
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
