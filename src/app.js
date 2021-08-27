const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Goal: Create a partial for the footer
/*
  1. Setup the template for the footer partial "Created by Some Name"
  2. Render the partial at the bottom of the three pages
  3. Test your work by visiting all three pages.
*/

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialPath = path.join(__dirname, "..", "templates", "partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rahul Aggarwal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rahul Aggarwal",
  });
});

// Goal: A help template to render a help message to the screen
/*
    1. Setup a help template to render a help message to the screen.
    2. Setup the help route and render the template with an example message
    3. Visit the route in the browser and see your help message print
*/
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "This is some helpful text!",
    name: "Rahul Aggarwal",
  });
});

// Goal: Create 2 more HTML files
/*
    1. Create a html page for about wuth "About" title.
    2. Create a html page for help with "Help" title.
    3. Remove the old route handler for both.
    4. Visit both in the browser to test your work.
*/

// Goal: Setup two new routes
/*
    1. Setup an about route and render a page title
    2. Setup a weather route and render a page title
    3. Test your work by visiting both in the browser
*/

// Goal: Update two routes
/*
    1. Setup an about route to render a title with HTML
    2. Setup a weather route to send back JSON
        - Objecct with forecast and location strings
    3. Test your work by visiting both in the browser
*/

// Goal : Update weather endpoint to accept address
/*
  1. No address ? send back an error message
  2. Address ? Send bak the static JSON
    - Add address property onto JSON which returns the provided address
  3. Test /weather and /weather?address=Delhi
*/

// Goal: Wire up /weather
/*
  1. require geocode/forecast into app.js
  2. Use the address to geocde 
  3. Use the coordinate to get forcast
  4. send back the real forecast and location
*/

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rahul Aggarwal",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rahul Aggarwal",
    errorMessage: "Page not found",
  });
});

// Goal: Create and render a 404 page with handlebars
/*
  1. Setup the template to render the header and footer
  2. Setup the template to render an error message in a paragraph
  3. Render the template for both 404 routes
    - page not found
    - help article not found
  4. Test your work, visit /what and /help/units
*/

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
