// Goal: fetch weather

/*
    1. Setup a call to fetch to fetch weather for delhi
    2. Get the parse JSON response
        - If error propery, print error
        - If no error property, print location and forecast
    3. Refresh the browser and test your work
*/
// fetch("http://localhost:3000/weather?address=!").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "From JavaScript";

// Goal: Render content to paragraph
/*
  1. Select the second message p from JS
  2. just before the fetch, render loading message nd empty p
  3. If error, render error
  4. if no error, render the location and forecast.
  5. Test your work! Search for errors nd for valid locations
*/

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = searchElement.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});

// Goal: Use the input value to get weather
/*
  1. Migrate the fetch call into the submit callback
  2. Use the search text as the query s addresstring value
  3. Submit the form with a valid and invalid to test
*/
