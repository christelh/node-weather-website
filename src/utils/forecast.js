const request = require('postman-request');

const forecast = (lat, long, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=7161a605c15064d170083f78c9e631d0&query="+lat+",%20" +long
    
    request({
            url: url,
            json: true
        }, (error, response) => {
            if (error) {
                callback("unable to connect to weather service", undefined)
            } else if (response.body.error) {
                callback("location not correct", undefined)
            } else {
                const temp = response.body.current.temperature;
                const feelTemp = response.body.current.feelslike;
                callback(
                    undefined, `The current temperature is ${temp} degrees Celsius and it feels like ${feelTemp} degrees Celsius`
                    
                )
              
                
            }
        
        
        })

}



module.exports=forecast;