const request = require('request');

const apiKey = "e7089300a691da65e9f1cf95f0111940";

const forecast = ({latitude, longitude}, callback) => {
    const url = ("http://api.weatherstack.com/forecast?access_key=e7089300a691da65e9f1cf95f0111940&query="+
                latitude + ',' + longitude);
    
    request({
        url : url,
        json : true
    },
        (error, {body}) => {
            if(error){
                callback("Unable to connect to weather serivces!");
            } else if(body.error){
                callback("Unable to find location! Try another search")
            } else {
                const data = body.current;
                const obj = body.forecast;
                const obj1 = obj[Object.keys(obj)[0]];

                callback(undefined,{
                    description : data.weather_descriptions[0],
                    temperature : data.temperature+"°C",
                    apparent : data.feelslike+"°C",
                    min : obj1.mintemp+"°C",
                    max : obj1.maxtemp+"°C"
                });
            }
        }
    )
}

module.exports = forecast;