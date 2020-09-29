const request = require('request');

/**
 * This function takes the latitude and longitude of an location and get its forecast information
 * @param {*latitude}  The latitude
 * @param {*longitude} The longitude 
 * @param {*callback} The callback function  
 */
const forecast = (lat, long, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=696d51c7a63e4ef52108c0162c29ddfc`
    const requestOptions = {
        url,
        json: true
    }

    // Making the request
    request(requestOptions, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.message) {
            callback('Unable to find location!. Try another search');
        } else {
            const data = `${body.weather[0].description}. It is currently ${body.main.temp} degrees out. There is a ${body.clouds.all}% chance of rain.`

            callback(undefined, data);
        }
    })
}

module.exports = forecast;
