//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const poolTablesDataBase = require('../schemata/pool.tables.mongo');
const {postForecasts, getAllForecasts, finalScore} = require('../models/forecasts.model');
const {loadPoolTablesData, countWDL, countBP, countPF, countPA, countDIFF, countPOINTS, countTF, countPL, getAllPoolTables, poolTables} = require('../models/pool.tables.model');

//-----------FUNCTION----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function httpPostAllForecasts(req, res) {
    const forecasts = req.body;
    const forecastsWithScore = finalScore(forecasts);
    countWDL(forecastsData);
    countBP(forecastsData);
    countPF(forecastsData);
    countPA(forecastsData);
    countDIFF();
    countPOINTS();
    countTF(forecastsData);
    countPL(forecastsData);
    return res.status(201).json(await getAllPoolTables());
};

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    httpPostAllForecasts
};