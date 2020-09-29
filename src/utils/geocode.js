const request = require('request')

/**
 * This function take an address and get it's latitude and longitude 
 * @param {*address} This is the address which will get it's 
 * @param {*callback}  This is the call back function 
 */
const geoCode = (address, callback) => {
    // use encodeURIComponent method to encoded the special characters like (? ==> %3F) 
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaG9zc2FtbW9oYW1lZCIsImEiOiJja2Znem0xcGUwZzE4MnhzMjF0ZTRpcGd5In0.eTuFyM_ytANKO9nrrqo5_Q&limit=1`
    const requestOptions = {
        url,
        json: true // * json property: to auto parse the json data on the body property 
    } 
    // Making the request
    request(requestOptions, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if ( body.features.length === 0) // Check if the location is correct or not 
        {
            callback('Unable to find location!. Try another search', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
} 

module.exports = geoCode;