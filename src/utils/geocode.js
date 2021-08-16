const request = require('postman-request');

const geocode = (adress, callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoiY2hhZXgyNTcwIiwiYSI6ImNrcml4c2dzeTM4Ym4ydXA4Z3Z4MmY0N20ifQ.CTjpf0Afz1jrcgoZPXz4bQ';
    
    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }
        else if(response.body.features.length==0){
            console.log(response.body.features.length)
            callback('unable to find location', undefined)
        }
        else{
            callback(undefined, {
                long: response.body.features[0].center[0],
                lat: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports=geocode;