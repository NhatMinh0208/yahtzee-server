const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const actions = require("./actions");

var corsOptions = {
    
};

const app = express();

app.use(function(req, res, next){
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(bodyParser.json());
  
app.use(cors(corsOptions));


app.get('/', function(req, res){
    res.json({
        error: "Not a valid path. Please read documentation for more details"
    });
});

app.get('/api/score', function(req, res){ 
    // TO BE IMPLEMENTED
});

app.post('/api/score', function(req, res){
    actions.submitScore(req.body, function(err, data){
        if (err === null) res.json({status: 'SUCCESS'});
        else res.json({status: err});
    });
});

app.listen(3000, function() { 
    console.log('Server now listening on port 3000');
});