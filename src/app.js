const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

const express = require('express');
const hbs = require('hbs')
const path = require('path');

const app = express();
const port=process.env.port || 3000


//paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static("public"));


app.get("", (req, res) => {
    res.render("index", {
        title: 'Weather',
        name: 'christel'
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: 'About me',
        name: 'christel'
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: 'Help',
        name: 'christel',
        message: 'this is a help message'
    })
})

app.get("/weather", (req, res) => {

    let weatherForecast;

    if(!req.query.address){
        return res.send({"error": "adress is mandatory"})
    }
    
        geocode(req.query.address, (error, data)=>{
            if(error){
                return   res.send(error)
            } 
        
            forecast(data.lat, data.long, (error, forecastData)=>{
                if(error){
                    return res.send(error);
                }
            
                res.json({
                    "forecast":forecastData,
                    "location": data.location,
                    "address": req.query.address
                })
      
     
            });
        
        })
});

app.get("/products")



app.get("*", (req, res) => {
    res.render("404", {
        title: '404',
        name: 'christel',
        error: 'page not found'
    })
})


//start server
app.listen(port, () => console.log("listening"));