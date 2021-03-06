var path = require('path');
var express = require('express');
var app = express();

var router = express.Router();

var Race = require('./src/client/app/models/race');
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
router.get('/', function(req, res) {
    res.json({message: 'hoorway! welcome to our api!'});
});

router.route('/races/:race_id')
.get(function(req, res) {
    Race.findById(req.params.race_id, function (err, races) {
        if (err) {
            res.sent(err);
        }
        res.json(races);
    });
});

router.route('/races')
.get(function(req, res) {
    var query = {}
    if (req.query.gender) {
        query.gender = req.query.gender;
    }
    if (req.query.skill) {
        query.skill = req.query.skill;
    }
    Race.find(query, function (err, races) {
        if (err) {
            res.sent(err);
        }
        res.json(races);
    });
});


app.use('/api', router);

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'src')));

var server = app.listen(app.get('port'), function() {
        var port = server.address().port;
        console.log('Magic happens on port ' + port);
});
