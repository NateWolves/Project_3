<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
=======
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> b
