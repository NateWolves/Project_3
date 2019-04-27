import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

ReactDOM.render(<App />, document.getElementById('root'));
