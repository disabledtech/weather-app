const request = require('request');
const moment = require('moment');

// Gets the temperature from one year ago.
const forecast = (lat, long, past, callback) => {

    let url;
    if (past) {
        const oneYearAgo = moment().subtract(1, 'years');
        url = `https://api.darksky.net/forecast/1d34d4fbdb9db06f2994279fdcee0dd4/${lat},${long},${oneYearAgo.unix()}?units=si`;
    } else {
        url = `https://api.darksky.net/forecast/1d34d4fbdb9db06f2994279fdcee0dd4/${lat},${long}?units=si`;
    }

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body.currently.temperature;
            callback(undefined, data);
        }
    });
}

module.exports = forecast;