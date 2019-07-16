const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Taylor Danielson'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Taylor Danielson'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Taylor Danielson',
        message: 'Help message here.'
    });
});

app.get('/weather', (req, res) => {
    address = req.query.address;
    if (!address) {
        return res.send({
            error: 'Please enter an address.'
        });
    }
    geocode(address, (error, locationData) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(locationData.latitude, locationData.longitude, (error, data) => {
            if (error) {
                return console.log(error);
            }
            return res.send({
                location: locationData.location,
                weather: data
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Need search term.'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article Not Found',
        error: 'Sorry, that help article was not found.',
        name: 'Taylor Danielson'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        error: 'Sorry, that page was not found.',
        name: 'Taylor Danielson'
    });
});

app.listen(port, () => console.log(`Server running on port ${port}.`));