const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

const dbServer = 'mongodb://localhost:27017';

MongoClient.connect(dbServer, { useUnifiedTopology: true },  (err, database) => {
    db = database.db('test');
    app.listen(3000, function () {
    });
})

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/www/index.html');
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
});

app.get('/quotes', (req, res) => {
    var cursor = db.collection('quotes').find().toArray((err, result) => {
        if (err) { return console.log(err) }
        res.status(200).json(result);
    });
})
