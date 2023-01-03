//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const mongoose = require('mongoose');

//-----------SCHEMA------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const forecastSchema = new mongoose.Schema({
    id: Number,
    inGameScore: {
        teamA:{
            convertedTries: Number,
            unconvertedTries: Number,
            penaltyKicksDropGoals: Number,
        },
        teamB:{
            convertedTries: Number,
            unconvertedTries: Number,
            penaltyKicksDropGoals: Number,
        } 
    },
    score: {
        teamA: Number,
        teamB: Number
    }
});

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = mongoose.model('Forecast', forecastSchema);