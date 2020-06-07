const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicGhhbnRvbWl6ZXIiLCJhIjoiY2s5c3hkMmJ1MTk3dDNocjFhczlvdnM5MSJ9.KkcLw9ImKi7xpScgiBx-ww"
    request({url : url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Failure to Connect", undefined)
        } else if (body.features.length === 0) {
            callback("No results found", undefined)
        } else {
            callback(undefined, 
                {latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                place: body.features[0].place_name})
        }
    })
}

module.exports = geocode
