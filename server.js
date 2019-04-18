const express = require("express");
const mongoose = require("mongoose");

const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 8080;

const db = require("./models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/project3";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
