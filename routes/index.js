
var express = require('express');
var router = express.Router();

// Mongoose import
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/comma_maps', { useNewUrlParser: true }, function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
const Schema = mongoose.Schema;

//Mongoose Schema Example
const JsonSchema = new Schema({
    name: String,
    type: Schema.Types.Mixed
});
// Mongoose Model Example
const Json = mongoose.model('JString', JsonSchema, 'layercollection');

//comma Schema
const CommaSchema = new Schema({
    startTime: String,
    type: Array,
    EndTime: String
});

//comma model
const Comma = mongoose.model('CommaSchema', CommaSchema, 'trips');

var a = 0;


//adds object id, longitude, and latitude of each starting point to an object
//this object is saved in memory for quick access to give to the user
//when an object is clicked, the corresponding points of the route are rendered
var trips = {
    coords:[

    ]
};

Comma.find({},function (err, docs) {
    for(var i in docs){
        trips.coords[a] = [docs[i].toObject()._id, docs[i].toObject().coords[0].lat, docs[i].toObject().coords[0].lng]; 
        a++;
    } 
    //console.log(trips) 
    //console.log(a) 
});



/* GET default view */
router.get('/', function(req, res, next) {
  Comma.find({}, function(err,docs){
    res.render('map', {
        title: 'San Fransisco', 
        "jmap" : docs,
        lat : trips.coords[0][1],
        lng : trips.coords[0][2]
    });
  });
});



/* Comma map layers json*/
router.get('/trips', function(req, res){
    res.json(trips);
});


router.get('/trip/:name', function(req, res){
    Comma.findById(req.params.name, function(er, doc){
        res.json(doc)
    })
});


//error handler
router.get('*', function(req, res, next) {
    res.send('invalid request')    
});



module.exports = router;