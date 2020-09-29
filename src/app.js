// Require some modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Get new express application
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Serve all static assets on the public directory
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and view location 
app.set('view engine', 'hbs'); // Tell Express which templating engine we installed
app.set('views', viewsPath); // Customizing the Views Directory
hbs.registerPartials(partialsPath); // Setup the partials 

// Render a view from our handelbar's templates 
// Render the home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Hossam Mohamed'
    });
});

// Render about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Hossam Mohamed'
    });
});

// Render help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Hossam Mohamed',
        message: 'Hey, I\'m here to help you.' 
    });
});


// Listen for request of Weather route
app.get('/weather', (req, res) => {
    // Check if the address exists or not 
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address;

    geocode(address, (error, {latitude, longitude, location} = {} )=> {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude,(error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        });
    })
});

app.get('/products', (req, res) => {

    if(! req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    });
});

// Setup 404 Error  page
// * --> means match everything that hasn't been matched 
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404 Error',
        message: 'Help article not found',
        name: 'Hossam Mohamed'
    });
});

app.get('*', (req, res) => {
    res.render('404',{
        title: '404 Error',
        message: 'Page not found',
        name: 'Hossam Mohamed'
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});