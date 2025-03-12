// API Key//
const API_KEY = 'HE9MELQJLQJP4P8366SN994DB';

//DOM elements//
let locationInput;
let getWeatherButton;
let weatherResults;

//Initialize the app// 
document.addEventListener('DOMContentLoaded', () => {
    //get DOM elements//
    locationInput = document.getElementById('location-input');
    getWeatherButton = document.getElementById('get-weather');
    weatherResults = document.getElementById('weather-results');


    //event listener for get weather button//
    getWeatherButton.addEventListener('click', () => {
        handleWeatherRequest();

    })

    //event listener for input//
    locationInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleWeatherRequest();
        }
    });
});


//handle weather request//
function handleWeatherRequest() {
    const location = locationInput.value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        showError("Please enter a location");
    }
}

//function to fetch weather data 

async function getWeatherData(location) {
    //show loading message//
    weatherResults.innerHTML = '<div class="loading">Loading weather data...</div>';

    try {
        //create API URL//
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=us&key=${API_KEY}&include=current`;
        
        //fetch data from API//
        const response = await fetch(apiUrl);

        //check response successful or not//

        if(!response.ok) {
            throw new Error(`API returned status code ${response.status}`);
        }

        //parse JSON//
        const data = await response.json();

        //display weather data//
        displayWeatherData(data);
    } catch(error) {
        console.error('Error fetching weather data:', error);
        showError('Failed to fetch weather data. Please check the location and try again.');
    }
}

function displayWeatherData(data) {
    const location = data.resolvedAddress;
    const current = data.currentConditions;
    const temperature = current.temp;
    const feelsLike = current.feelslike;
    const datetime = new Date(current.datetimeEpoch * 1000).toLocaleString();

    //create HTML for weather card//
    const weatherHTML = `
        <div class="weather-card">
            <h2>${location}</h2>
            <p><strong>Date & Time:</strong> ${datetime}</p>
            <p><strong>Temperature:</strong> ${temperature}°F</p>
            <p><strong>Feels Like:</strong> ${feelsLike}°F</p>
        </div>
    `;

    //update results container with weather//
    weatherResults.innerHTML = weatherHTML;
}

function showError(message) {
    weatherResults.innerHTML = `<div class="error">${message}</div>`;
}