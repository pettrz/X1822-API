const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const port = 8088;

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));

mongoClient.connect(db.url, (err, database) => {

    if(err) return console.log(err);

    require('./app/routes')(app, database);

    app.listen(port, () => {
        console.log('We are live on ' + port);
        
    });

});




