//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const mongoose = require('mongoose');

//-----------SCHEMA------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const knockoutMatchSchema = new mongoose.Schema({
    id: Number,
    stage: String,
    teamA: String,
    teamB: String,
    date: Date,
    place: String
});

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = mongoose.model('KnockoutMatch', knockoutMatchSchema);