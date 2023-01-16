//----------REQUIRE------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const poolTablesDataBase = require('../schemata/pool.tables.mongo');
const {getPoolMatch, getAllPoolMatches} = require('../models/pool.matches.model');

//----------POOL TABLES DATA---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let poolTables = [
    {
        id: 1,
        pool: 'A',
        teams: [
            {name:'New-Zealand', PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'France',      PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Italy',       PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Uruguay',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Namibia',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0}
        ]
    },
    {
        id: 2,
        pool: 'B',
        teams: [
            {name:'South-Africa', PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Ireland',      PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Scotland',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Tonga',        PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Romania',      PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0}
        ]
    },
    {
        id: 3,
        pool: 'C',
        teams: [
            {name:'Wales',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Australia', PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Fiji',      PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Georgia',   PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Portugal',  PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0}
        ]
    },
    {
        id: 4,
        pool: 'D',
        teams: [
            {name:'England',   PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Japan',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Argentina', PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Samoa',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0},
            {name:'Chile',     PL: 0, W: 0, D: 0, L: 0, PF: 0, PA: 0, DIFF: 0, TF: 0, TA: 0, BP: 0, POINTS: 0}
        ]
    }
];

//----------FUNCTION-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function loadPoolTablesData() {
    poolTables.forEach(async (element) => {
        await poolTablesDataBase.updateOne({
            id: element.id
        },
        {
            id: element.id,
            pool: element.pool,
            teams: element.teams
        },
        {
            upsert: true
        });
    });
};

function countWDL(forecasts) {
    forecasts.forEach((element) => {

        const match = getPoolMatch(element.id);
        const pool = match.pool;
        const teamA = match.teamA;
        const teamB = match.teamB;

        if(element.score.teamA > element.score.teamB) {
            poolToUpdate = poolTables.find((element) => {element.pool == pool});
            teamAToUpdate = poolToUpdate.teams.find((element) => {element.name == teamA});
            teamBToUpdate = poolToUpdate.teams.find((element) => {element.name == teamB});
            teamAToUpdate.W++;
            teamBToUpdate.L++;
        };
        if(element.score.teamA < element.score.teamB) {
            poolToUpdate = poolTables.find((element) => {element.pool == pool});
            teamAToUpdate = poolToUpdate.teams.find((element) => {element.name == teamA});
            teamBToUpdate = poolToUpdate.teams.find((element) => {element.name == teamB});
            teamAToUpdate.L++;
            teamBToUpdate.W++;
        };
        if(element.score.teamA == element.score.teamB) {
            poolToUpdate = poolTables.find((element) => {element.pool == pool});
            teamAToUpdate = poolToUpdate.teams.find((element) => {element.name == teamA});
            teamBToUpdate = poolToUpdate.teams.find((element) => {element.name == teamB});
            teamAToUpdate.D++;
            teamBToUpdate.D++;
        };
    });
};

function countBP(forecasts) {
    forecasts.forEach((element) => {

        const match = getPoolMatch(element.id);
        const pool = match.pool;
        const teamA = match.teamA;
        const teamB = match.teamB;
        const scoreDelta = element.score.teamA - element.score.teamB;

        if((element.inGameScore.teamA.convertedTries + element.inGameScore.teamA.unconvertedTries) >= 4) {
            poolToUpdate = poolTables.find((element) => {element.pool == pool});
            teamAToUpdate = poolToUpdate.teams.find((element) => {element.name == teamA});
            teamAToUpdate.BP++;
        };
        if((element.inGameScore.teamB.convertedTries + element.inGameScore.teamB.unconvertedTries) >= 4) {
            poolToUpdate = poolTables.find((element) => {element.pool == pool});
            teamBToUpdate = poolToUpdate.teams.find((element) => {element.name == teamB});
            teamBToUpdate.BP++;
        };
        if(scoreDelta>0 && scoreDelta<=7) {
            poolToUpdate = poolTables.find((element) => {element.pool == pool});
            teamBToUpdate = poolToUpdate.teams.find((element) => {element.name == teamB});
            teamBToUpdate.BP++;
        };
        if(scoreDelta<0 && scoreDelta>=-7) {
            poolToUpdate = poolTables.find((element) => {element.pool == pool});
            teamAToUpdate = poolToUpdate.teams.find((element) => {element.name == teamA});
            teamAToUpdate.BP++;
        };
    });
};

function countPF(forecasts) {
    forecasts.forEach((element) => {
           
        const match = getPoolMatch(element.id);
        const pool = match.pool;
        const teamA = match.teamA;
        const teamB = match.teamB;
        
        poolToUpdate = poolTables.find((element) => {element.pool == pool});
        teamAToUpdate = poolToUpdate.teams.find((element) => {element.name == teamA});
        teamBToUpdate = poolToUpdate.teams.find((element) => {element.name == teamB});
        teamAToUpdate.PF = ++element.score.teamA;
        teamBToUpdate.PF = ++element.score.teamB;     
    });
};

function countPA(forecasts) {
    forecasts.forEach((element) => {

        const match = getPoolMatch(element.id);
        const pool = match.pool;
        const teamA = match.teamA;
        const teamB = match.teamB;
        
        poolToUpdate = poolTables.find((element) => {element.pool == pool});
        teamAToUpdate = poolToUpdate.teams.find((element) => {element.name == teamA});
        teamBToUpdate = poolToUpdate.teams.find((element) => {element.name == teamB});
        teamAToUpdate.PA = ++element.score.teamB;
        teamBToUpdate.PA = ++element.score.teamA;
    });
};

function countDIFF() {
    poolTables.forEach((elementX) => {
        elementX.teams.forEach((elementY) => {
            elementY.DIFF = elementY.PF - elementY.PA;
        });
    });
};

function countPOINTS() {
    poolTables.forEach((elementX) => {
        elementX.teams.forEach((elementY) => {
            elementY.POINTS = elementY.W*4 + elementY.D*2 + elementY.BP;
        });
    });
};

function countTF(forecasts){
    forecasts.forEach((element) => {
        
        const match = getPoolMatch(element.id);
        const pool = match.pool;
        const teamA = match.teamA;
        const teamB = match.teamB;

        poolToUpdate = poolTables.find((element) => {element.pool == pool});
        teamAToUpdate = poolToUpdate.teams.find((element) => {element.name == teamA});
        teamBToUpdate = poolToUpdate.teams.find((element) => {element.name == teamB});
        teamAToUpdate.TF = ++(element.inGameScore.teamA.convertedTries + element.inGameScore.teamA.unconvertedTries);
        teamBToUpdate.TF = ++(element.inGameScore.teamB.convertedTries + element.inGameScore.teamB.unconvertedTries);

    });
};

function countTA(forecasts){
    forecasts.forEach((element) => {
        
        const match = getPoolMatch(element.id);
        const pool = match.pool;
        const teamA = match.teamA;
        const teamB = match.teamB;

        poolToUpdate = poolTables.find((element) => {element.pool == pool});
        teamAToUpdate = poolToUpdate.teams.find((element) => {element.name == teamA});
        teamBToUpdate = poolToUpdate.teams.find((element) => {element.name == teamB});
        teamAToUpdate.TA = ++(element.inGameScore.teamB.convertedTries + element.inGameScore.teamB.unconvertedTries);
        teamBToUpdate.TA = ++(element.inGameScore.teamA.convertedTries + element.inGameScore.teamA.unconvertedTries);

    });
};

function winnerOf(a, b) {
    const match = poolMatches.find((element) => {(element.teamA == a && element.teamB == b) || (element.teamA == b && element.teamB == a)});
    const forecast = forecasts.find((element) => {element.id == match.id});
    if(forecast.score.teamA > forecast.score.teamB) {
        return 1;
    };
    if(forecast.score.teamA > forecast.score.teamB) {
        return -1;
    };
    if(forecast.score.teamA > forecast.score.teamB) {
        return 'draw';
    };
};

function countPL() {
    poolTables.forEach((elementX) => {
        elementX.teams.sort((a,b) => {
            if(a.POINTS != b.POINTS) {
                return a.POINTS - b.POINTS;
            }
            else if(winnerOf(a, b) != 'draw') {
                return winnerOf(a, b);
            }
            else if(a.DIFF != b.DIFF) {
                return a.DIFF - b.DIFF;
            }
            else if((a.TF - a.TA) != (b.TF - b.TA)) {
                return (a.TF - a.TA) - (b.TF - b.TA);
            }
            else if(a.PF != b.PF) {
                return a.PF - b.PF;
            }
            else if(a.TF != b.TF) {
                return a.TF - b.TF;
            };
        })
    });  
};

// 1 -- le plus grand nombre de points marqués à l'issue de tous les matchs de poule
// 2 -- en cas d'égalité de points, le vainqueur du match ayant opposé les équipes concernées
// 3 -- la meilleure différence de points terrain, marqués et concédés lors de tous les matchs disputés au sein de la poule
// 4 -- la meilleure différence entre les essais marqués et concédés lors de tous les matchs de poule
// 5 -- l'équipe ayant marqué le plus grand nombre de points terrain lors de tous les matchs de poule
// 6 -- l'équipe ayant marqué le plus grand nombre d'essais lors de tous les matchs de poule

function getAllPoolTables() {
    return poolTablesDataBase.find({}, {'__v': 0, '_id': 0});
};

//----------EXPORT-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    loadPoolTablesData,
    countWDL,
    countBP,
    countPF,
    countPA,
    countDIFF,
    countPOINTS,
    countTF,
    countTA,
    countPL,
    getAllPoolTables,
    poolTables
};