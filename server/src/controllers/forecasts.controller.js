//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const poolTablesDataBase = require('../schemata/pool.tables.mongo');
const {postForecasts, getAllForecasts} = require('../models/forecasts.model');
const {loadPoolTablesData, countWDL, countBP, countPF, countPA, countDIFF, countPOINTS, countTF, countPL, getAllPoolTables} = require('../models/pool.tables.model');

//-----------FUNCTION----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function httpPostAllForecasts(req, res) {
    const forecasts = req.body;
    await poolTablesDataBase.deleteMany({});
    await loadPoolTablesData();
    await postForecasts(forecasts);
    const forecastsData = await getAllForecasts();
    await countWDL(forecastsData);
    await countBP(forecastsData);
    await countPF(forecastsData);
    await countPA(forecastsData);
    await countDIFF();
    await countPOINTS();
    await countTF(forecastsData);
    await countPL(forecastsData);
    return res.status(201).json(await getAllPoolTables());
};

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    httpPostAllForecasts
};