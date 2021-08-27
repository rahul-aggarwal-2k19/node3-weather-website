const request = require("request");

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
      const weatherDescription = currentData.weather_descriptions[0];
      const data = `${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
