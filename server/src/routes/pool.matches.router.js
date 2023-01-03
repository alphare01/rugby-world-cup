//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const express = require('express');
const {httpGetAllPoolMatches} = require('../controllers/pool.matches.controller');

//-----------ROUTER------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const poolMatchesRouter = express.Router();
poolMatchesRouter.get('/poolMatches', httpGetAllPoolMatches);

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = poolMatchesRouter;