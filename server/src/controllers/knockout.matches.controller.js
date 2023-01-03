//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const {getQualifiedTeams, loadAllKnockoutMatches, getAllKnockoutMatches} = require('../models/knockout.matches.model');

//-----------FUNCTION----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function httpGetAllKnockoutMatches(req, res) {
    await loadAllKnockoutMatches(await getQualifiedTeams());
    return res.status(200).json(await getAllKnockoutMatches());
};

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    httpGetAllKnockoutMatches,
};