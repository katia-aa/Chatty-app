// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx'; 

// props is something like a style (attributes)
// 3rd arg is children - what goes b/w the tag
// components -> functions that embue functionality
// functions always have to return an element
// setState calls render for us
// class is a special way of defining an object




ReactDOM.render(<App />, document.getElementById('react-root'));
