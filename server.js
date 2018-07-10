const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) console.log("Unable to append to server.log");
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (request, response) => {
  // response.send("<h1>Hello Express!</h1>");
  // response.send({
  //   name: "John",
  //   likes: ["Biking", "Cities"]
  // });
  response.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Hello, welcome to the website!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Project Page",
    projectMessage: "Welcome to my projects page"
  });
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "Nope" });
});

app.listen(/*3000 if not using Heroku*/ port, () => {
  console.log(`Server is up on port ${port}`);
});
