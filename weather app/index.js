// Define the base URL for OpenWeatherMap API
const url = 'https://api.openweathermap.org/data/2.5/weather';

// Define your API key
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

// Execute the weatherFn function when the document is ready
$(document).ready(function () {// the dollar sign is another character that can be used in variables name
    weatherFn('#'); 
});
// (we are using asynchronus function to show our data for a given city and also add a try catch function where try function is used is used to fetched n weather 
//data  where catch function is used for an occurs error during fetching a data ,log the error to the console

// Define an asynchronous function to fetch weather data for a given city
async function weatherFn(cName) {
    // Construct the URL with the city name and API key, and set units to metric for Celsius temperature
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;

    try { //(the try statement allows you to define a block of code to be  tested foe errors while it is being executed.)
        // Fetch weather data from the API
        const res = await fetch(temp);
        const data = await res.json();

        // If the response is successful (HTTP status code 200), call weatherShowFn to display the data
        if (res.ok) {
            weatherShowFn(data);
        } else {
            // If the response is not successful, display an alert indicating that the city was not found
            alert('City not found. Please try again.');
        }
    } catch (error) {
        // If an error occurs during fetching or parsing the data, log the error to the console
        console.error('Error fetching weather data:', error);
    }
}

// Define a function to display weather information on the webpage
function weatherShowFn(data) {
    // Update the HTML elements with weather data
    $('#city-name').text(data.name); // Display the city name
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a')); // Display the current date and time
    $('#temperature').html(`${data.main.temp}°C`); // Display the temperature in Celsius
    $('#description').text(data.weather[0].description); // Display the weather description
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`); // Display the wind speed

    // Get the icon code from the API response
    const iconCode = data.weather[0].icon;
    // Construct the URL for the weather icon using the icon code
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    // Set the src attribute of the weather icon element to display the weather icon
    $('#weather-icon').attr('src', iconUrl);

    // Fade in the weather information on the webpage
    $('#weather-info').fadeIn();
}
