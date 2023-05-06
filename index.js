const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

// Set up middleware to verify working hours
const verifyWorkingHours = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hourOfDay = date.getHours();

  if (dayOfWeek > 0 && dayOfWeek < 7 && hourOfDay >= 9 && hourOfDay <= 17) {
    next();
  } else {
    res.send(
      "Sorry, this website is only available during working hours (Monday to Friday, from 9 to 17)."
    );
  }
};

// Define routes
app.get("/", verifyWorkingHours, (req, res) => {
  res.render("homepage");
});

app.get("/services", verifyWorkingHours, (req, res) => {
  res.render("services");
});

app.get("/contact", verifyWorkingHours, (req, res) => {
  res.render("contact");
});

app.listen(8000, () => {
  console.log("Sever listening to 8000");
});
