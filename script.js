// Add a valid API key and Base URL to make this web-app functional

const form = document.getElementById("input-form");
const cityInput = document.getElementById("city-input");
const dynamicSection = document.querySelector(".dynamic-section");
const saveButton = document.getElementById("fav-city-button");
const themeButton = document.getElementById("night-mode-button");
const body = document.body;
const tempElement = document.getElementById("temprature");
const descElement = document.getElementById("weather-description");
const iconElement = document.getElementById("icon");
const city = document.getElementById("city");
const apiKey = "" // Add API key here 

// Checking for theme Preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('light');
}

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme')
        themeButton.textContent = 'Light Mode 🔆';
    } else {
        body.classList.remove('dark-theme') 
        themeButton.textContent = 'Dark Mode 🌙'; 
    }
}

//Theme toggle button 
themeButton.addEventListener("click", () => {
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        setTheme('light');
        localStorage.setItem('theme', 'light')
    } else {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
});

form.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value; 
    clearError();

    if(city) {
        try{
           const data = await getWeather(city);
           displayWeather(data);
        }
        catch(error) {
            console.error(error.message)
            showError(error);
        }
    } 
    else {
        showError("Input can't be empty!")
    }
});

function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function clearError() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

async function getWeather(city) {
    // Add base URL here
    const apiUrl = ``;

    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error(`Weather data not available for ${city}.`)
    };

    const weatherData = await response.json();
    return weatherData
};

function displayWeather(data) {

// Access weather data
    const cityName = data.name

// Possible to more temprature detail(max-temp, min-temp, feels-like, etc..) dependig on use
    const mainTemp= Math.round(data.main.temp)
    const description = data.weather[0].description
    const weatherId = data.weather[0].id

    tempElement.textContent = `${mainTemp}℃`;
    city.textContent = cityName;
    descElement.textContent = description;
    iconElement.textContent = emojiAssignment(weatherId);
}

function emojiAssignment(weatherId) {

    const id = weatherId; 
    
    if (id >= 200 && id < 300) {
        return '⛈️'; 
    } else if (id >= 300 && id < 600) { 
        return '🌧️'; 
    } else if (id >= 600 && id < 700) { 
        return '❄️'; 
    } else if (id >= 700 && id < 800) { 
        return '🌫️'; 
    } else if (id === 800) {
        return '🌞';  
    } else if (id >= 801 && id < 810) { 
        return '☁️'; 
    } else {
        return '❓';
    }
};

