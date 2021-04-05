// Library imports
const express = require('express');
const path = require('path');
const hbs = require('hbs');

// Bringing geocode and forecast
const geocode = require('./utility/geocode');
const forecast = require('./utility/forecast');

// Intitializing the express app
const app = express();
const port = process.env.PORT || 3000;

// Paths for express configuration
const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

//Setting up handlebars engine and views
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

//Setting public directory
app.use(express.static(publicDirPath));

// Setting up different routes

// Root route (index.html)
app.get('/', (req,res) => {
    res.render('index', {
        title : "Weather"
    });
})

//Help route
app.get('/help', (req,res) => {
    res.render('help',{
        title : "Help"
    });
})

//About page
app.get('/about', (req,res) => {
    res.render('about', {
        title : "About"
    });
})

// Fetching weather data
app.get('/weather', (req, res) => {
    if(!req.query.location) {
        return res.send({
            error : "Please provide the location"
        })
    }

    geocode(req.query.location, (error,data) => {
        if (error) {
           res.send({
                error
           })
        } else {
            forecast(data, (error, forecastData) => {
                if (error) {
                    res.send({
                        error
                    })
                } else {
                    res.send({
                        ...forecastData,
                        location : data.place
                    })
                }
            })
        }
    })
})

//Handling particular 404 setup
app.get("/help/*", (req,res) => {
    res.render('error',{
        message : "Help article not found"
    });
})

//404 setup
app.get('*', (req,res) => {
    res.render('error', {
        title : "404 ERROR"
    })
})

// Assigning the port for the development server
app.listen(port, () => {
    console.log("Server is running on port "+port);
})

