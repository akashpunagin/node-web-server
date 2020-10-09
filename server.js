const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


//Setup middleware
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `NOW: ${now}, REQUEST: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", (err) => {
    if(err) {
      console.log("Unable to append to server.log file");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintainence.hbs");
// });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return  text.toUpperCase();
});


// Setup handlera
app.get("/", (request, response) => {
  // response.send("<h1>Hello Express</h1>");

  // NOTE: To send json data
  // response.send({
  //   name: "Akash",
  //   age: 30,
  //   subjects : [
  //     "English",
  //     "Kannada",
  //     "Hindi",
  //   ],
  // });

  response.render("home.hbs", {
    name: "Akash",
  });
});

app.get("/about", (request, response) => {
  // response.send("<h1>About Page</h1>");
  response.render("about.hbs", {
    name: "Akash",
  });
});

app.get("/bad", (request, response) => {
  response.send({
    errorMessage: "Unable to send request"
  });
});


// Start listen
app.listen(3000, () => {
  console.log("Server is up on port 300");
});
