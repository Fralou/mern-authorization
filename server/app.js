const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const v1 = require('./routes/v1');

const app = express();

const db = require('./config/keys').mongoURI;
mongoose.Promise = global.Promise;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/v1', v1);

app.listen(4000, function(){
    console.log('Listening on port 4000');
})