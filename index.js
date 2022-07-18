const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 7264;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and script
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});
