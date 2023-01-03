//----------REQUIRE------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const poolTablesDataBase = require('./src/schemata/pool.tables.mongo');
const {getAllForecasts} = require('./src/models/forecasts.model');
const {getAllPoolMatches} = require('./src/models/pool.matches.model');

//----------POOL TABLES DATA---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const poolTables = [
    {
        id: 1,
        pool: 'A',
        teams: [
            {name:'New-Zealand', PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'France',      PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Italy',       PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Uruguay',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Namibia',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0}
        ]
    },
    {
        id: 2,
        pool: 'B',
        teams: [
            {name:'South-Africa', PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Ireland',      PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Scotland',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Tonga',        PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Romania',      PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0}
        ]
    },
    {
        id: 3,
        pool: 'C',
        teams: [
            {name:'Wales',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Australia', PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Fiji',      PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Georgia',   PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Portugal',  PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0}
        ]
    },
    {
        id: 4,
        pool: 'D',
        teams: [
            {name:'England',   PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Japan',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Argentina', PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Samoa',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0},
            {name:'Chile',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, BP: 0, POINTS: 0}
        ]
    }
];

//----------FUNCTION-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const allForecasts = await getAllForecasts();
const allPoolMatches = await getAllPoolMatches();


function countWDL() {
    allPoolMatches.forEach((poolMatch) => {
        const foundForecast = allForecasts.find((forecast) => forecast.id == poolMatch.id);
        const poolToUpdate = poolTables.find((pool) => pool.pool == poolMatch.pool);
        const teamAToUpdate = poolToUpdate.teams.find((team) => team.name == poolMatch.teamA);
        const teamBToUpdate = poolToUpdate.teams.find((team) => team.name == poolMatch.teamB);
        if(foundForecast.score.teamA > foundForecast.score.teamB) {
            teamAToUpdate.W ++;
            teamBToUpdate.L ++;
        };
        if(foundForecast.score.teamA < foundForecast.score.teamB) {
            teamAToUpdate.L ++;
            teamBToUpdate.W ++;
        };
        if(foundForecast.score.teamA == foundForecast.score.teamB) {
            teamAToUpdate.D ++;
            teamBToUpdate.D ++;
        };
    });
    console.log(poolTables);
};

countWDL();