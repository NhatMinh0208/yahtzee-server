const models = require('./models');
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

function submitScore(data, callback) {
    if (data.time === undefined) {
        data.time = new Date();
    }
    if (data.score === undefined) {
        callback('ERROR: Score not found');
    }
    if (data.name === undefined) {
        callback('ERROR: Name not found');
    }
    if (data.apiKey !== process.env.API_SECRET) { 
        callback('ERROR: API Key not found or does not match API_SECRET');
    }
    const newScore = new models.Score({
        name: data.name, 
        time: data.time,
        score: data.score
    });
    const timeOut = setTimeout(function () {
        callback('ERROR: Request timed out');
    }, 10000);

    newScore.save().then(() => {
        clearTimeout(timeOut);
        callback(null, {
            status: 'SUCCESS',
        })
    });
}

exports.submitScore = submitScore;