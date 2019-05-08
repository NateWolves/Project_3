require("dotenv").config();
const express = require("express");
const session = require('express-session')
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 8080;
const db = require("./models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/project3";
const cors = require('cors');
const cookieParser= require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')



const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Passport.js setup
app.use(session({
  secret: 'my-secret',
  resave:false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session())


app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
