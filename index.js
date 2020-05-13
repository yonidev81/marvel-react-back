const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidableMiddleware());

mongoose.connect("mongodb://localhost/marvel-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome in Marvel test" });
});

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server started");
});
