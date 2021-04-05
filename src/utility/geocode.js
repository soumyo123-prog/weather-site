const request = require('request');

const mapApi = "pk.eyJ1Ijoic291bXlvMTIzIiwiYSI6ImNrbXJtem53bDA5Z2Qyb3BtcGV0N3JodGcifQ.F9nj7WDzzf7HEP-_wuiZdQ";

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(location) +".json?access_token=pk.eyJ1Ijoic291bXlvMTIzIiwiYSI6ImNrbXJtem53bDA5Z2Qyb3BtcGV0N3JodGcifQ.F9nj7WDzzf7HEP-_wuiZdQ&limit=1";

    request({
            url : url,
            json : true
        },
            (error, response) => {
                if(error){
                    callback("Unable to connect to location services!");
                } else if(response.body.features.length === 0){
                    callback("Location not found! Try another location");
                } else {
                    const data = {
                        place : response.body.features[0].place_name,
                        latitude : response.body.features[0].center[1],
                        longitude : response.body.features[0].center[0]
                    }
                    callback(undefined, data);
                }
            }
    )
}

module.exports = geocode;