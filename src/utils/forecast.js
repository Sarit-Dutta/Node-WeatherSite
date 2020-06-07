const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e03cf1d6be4e0ff3d75ac277e8f1a539&query=' + lat + ',' + long + '&units=m'

    request({url: url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Failure to connect to API.", undefined)
        } else if (body.error){
            callback(body.error, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. Feels like " + body.current.feelslike + " degrees. There is a " + body.current.precip + "% chance of rain.")
        }
    })
}

module.exports = forecast