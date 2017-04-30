var path = require('path');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var router = express.Router();

//app.get('/', function (req, res) {
  //res.send('Hello Josh!');
//})

var Race = require('./src/client/app/models/race');

router.get('/', function(req, res) {
    res.json({message: 'hoorway! welcome to our api!'});
});

router.route('/races')
.get(function(req, res) {
    Race.find(function (err, races) {
        if (err) {
            res.sent(err);
        }
        res.json(races);
    });
});

app.use('/api', router);

app.set('port', 3000);

mongoose.connect('mongodb://localhost/nndb');

app.use(express.static(path.join(__dirname, 'src')));

var server = app.listen(app.get('port'), function() {
        var port = server.address().port;
        console.log('Magic happens on port ' + port);
});
