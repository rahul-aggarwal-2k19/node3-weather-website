const request = require("request");

// Goal : Add new data to forecast
/*
  1. Update the forecast string to include new data.
  2. Commit your changes
  3. Push your changes to github and deploy to heroku
  4. Test your work in the live application.
*/

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=bbdb461a132142463eda3f9c31c55dac&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      const currentData = body.current;
      const temperature = currentData.temperature;
      const feelsLike = currentData.feelslike;
      const humidity = currentData.humidity;
      const weatherDescription = currentData.weather_descriptions[0];
      const data = `${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out. Humidity is about ${humidity}.`;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
