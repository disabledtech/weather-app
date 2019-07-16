const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/1d34d4fbdb9db06f2994279fdcee0dd4/${lat},${long}?units=si`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);        
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = `${body.daily.data[0].summary} It is currently ${body.currently.temperature}C.`
            const precip = body.currently.precipProbability === 0 ? '' : ` There is a ${body.currently.precipProbability}% of ${body.currently.precipType}`;
            callback(undefined, data + precip);
        }
    });
}

module.exports = forecast;