//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const path = require('path');
const express = require('express');
const cors = require('cors');
const poolMatchesRouter = require('./routes/pool.matches.router');
const forecastsRouter = require('./routes/forecasts.router');
const knockoutMatchesRouter = require('./routes/knockout.matches.router');

//-----------EXPRESS SETUP-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const app = express();

//-----------MIDDLEWARES-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(poolMatchesRouter);
app.use(forecastsRouter);
app.use(knockoutMatchesRouter);

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = app;