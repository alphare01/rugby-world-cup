//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const forecastsDataBase = require('../schemata/forecasts.mongo');

//-----------FUNCTION----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function finalScore(object) {
    object.score = {
        teamA: 7*(object.inGameScore.teamA.convertedTries) + 5*(object.inGameScore.teamA.unconvertedTries) + 3*(object.inGameScore.teamA.penaltyKicksDropGoals),
        teamB: 7*(object.inGameScore.teamB.convertedTries) + 5*(object.inGameScore.teamB.unconvertedTries) + 3*(object.inGameScore.teamB.penaltyKicksDropGoals)
    };
    return object;
};

function postForecasts(array) {
    return new Promise((resolve, reject) => {
        array.forEach(async (element) => {
            await forecastsDataBase.updateOne(
            {
                id: finalScore(element).id
            },
            {
                inGameScore: finalScore(element).inGameScore,
                score: finalScore(element).score
            },
            {
                upsert: true
            });
        });
        resolve();
    });
            
};

async function getAllForecasts() {
    return await forecastsDataBase.find({}, {'_id': 0, '__v': 0});
};

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    postForecasts,
    getAllForecasts
};