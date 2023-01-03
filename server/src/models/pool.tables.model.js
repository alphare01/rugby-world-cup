//----------REQUIRE------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const poolTablesDataBase = require('../schemata/pool.tables.mongo');
const {getPoolMatch, getAllPoolMatches} = require('../models/pool.matches.model');

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

async function countWDL(array) {
    return new Promise((resolve, reject) => {
        array.forEach(async (element, index) => {
            const match = await getPoolMatch(element.id);
            if(element.score.teamA > element.score.teamB) {
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamA}, {$inc: {'teams.$.W': 1}}, {upsert: true});
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamB}, {$inc: {'teams.$.L': 1}}, {upsert: true});
            };
            if(element.score.teamA < element.score.teamB) {
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamB}, {$inc: {'teams.$.W': 1}}, {upsert: true});
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamA}, {$inc: {'teams.$.L': 1}}, {upsert: true});
            };
            if(element.score.teamA == element.score.teamB) {
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamA}, {$inc: {'teams.$.D': 1}}, {upsert: true});
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamB}, {$inc: {'teams.$.D': 1}}, {upsert: true});
            };
            if(index == (array.length - 1)) {
                resolve();
            };
        });
    });
    
};

async function countBP(array) {
    return new Promise ((resolve, reject) => {
        array.forEach(async (element, index) => {
            const match = await getPoolMatch(element.id);
            const scoreDelta = element.score.teamA - element.score.teamB;
            if((element.inGameScore.teamA.convertedTries + element.inGameScore.teamA.unconvertedTries) >= 4) {
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamA}, {$inc: {'teams.$.BP': 1}}, {upsert: true});            
            };
            if((element.inGameScore.teamB.convertedTries + element.inGameScore.teamB.unconvertedTries) >= 4) {
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamB}, {$inc: {'teams.$.BP': 1}}, {upsert: true});        
            };
            if(scoreDelta > 0 && scoreDelta <= 7) {
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamB}, {$inc: {'teams.$.BP': 1}}, {upsert: true});        
            };
            if(scoreDelta < 0 && scoreDelta >= -7) {
                await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamA}, {$inc: {'teams.$.BP': 1}}, {upsert: true});        
            };
            if(index == (array.length - 1)) {
                resolve();
            };
        });
    });
};

async function countPF(array) {
    return new Promise((resolve, reject) => {
        array.forEach(async (element, index) => {
            const match = await getPoolMatch(element.id);
            await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamA}, {$inc: {'teams.$.PF': element.score.teamA}}, {upsert: true});
            await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamB}, {$inc: {'teams.$.PF': element.score.teamB}}, {upsert: true});
            if(index == (array.length - 1)) {
                resolve();
            };                   
        });
    });
};

async function countPA(array) {
    return new Promise((resolve, reject) => {
        array.forEach(async (element, index) => {
            const match = await getPoolMatch(element.id);
            await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamA}, {$inc: {'teams.$.PA': element.score.teamB}}, {upsert: true});
            await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamB}, {$inc: {'teams.$.PA': element.score.teamA}}, {upsert: true});
            if(index == (array.length - 1)) {
                resolve();
            };
        });
    }); 
};

async function countDIFF() {
    await poolTablesDataBase.updateMany({}, [
        {
            "$set": {
                "teams": {
                    "$map": {
                        "input": "$teams",
                        "as": "team",
                        "in": {
                            "$mergeObjects": [
                                "$$team",
                                {
                                    DIFF: {
                                        "$subtract": [
                                            "$$team.PF",
                                            "$$team.PA"
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    ]);
};

async function countPOINTS() {
    await poolTablesDataBase.updateMany({}, [
        {
            "$set": {
                "teams": {
                    "$map": {
                        "input": "$teams",
                        "as": "team",
                        "in": {
                            "$mergeObjects": [
                                "$$team",
                                {
                                    POINTS: {
                                        "$add": [
                                            {
                                                "$multiply": [
                                                    "$$team.W",
                                                    4
                                                ]
                                            },
                                            {
                                                "$multiply": [
                                                    "$$team.D",
                                                    2
                                                ]
                                            },
                                            "$$team.BP"
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    ]);
};

async function countTF(array){
    return new Promise((resolve, reject) => {
        array.forEach(async (element, index) => {
            const match = await getPoolMatch(element.id);
            await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamA}, {$inc: {'teams.$.TF': (element.inGameScore.teamA.convertedTries + element.inGameScore.teamA.unconvertedTries)}}, {upsert: true});
            await poolTablesDataBase.updateOne({pool: match.pool, 'teams.name': match.teamB}, {$inc: {'teams.$.TF': (element.inGameScore.teamB.convertedTries + element.inGameScore.teamB.unconvertedTries)}}, {upsert: true});
            if(index == (array.length - 1)) {
                resolve();
            };
        });
    });
};

function winnerOf(a, b, arrayX, arrayY) {
    const match = arrayY.find((element) => {
        return (element.teamA == a && element.teamB == b) || (element.teamA == b && element.teamB == a);  
    });
    const forecast = arrayX.find((element) => {
        return element.id == match.id;
    });
    if(forecast.score.teamA > forecast.score.teamB) {
        return 1;
    };
    if(forecast.score.teamA < forecast.score.teamB) {
        return -1;
    };
    if(forecast.score.teamA == forecast.score.teamB) {
        return 'draw';
    };
};

async function countPL(array) {
    return new Promise(async (resolve, reject) => {
        const matches = await getAllPoolMatches();
        const allPools = await getAllPoolTables();
        allPools.forEach((element) => {
            element.teams.sort((a, b) => {
                if(b.POINTS != a.POINTS) {
                    return b.POINTS - a.POINTS;
                } else if(winnerOf(a.name, b.name, array, matches) != 'draw') {
                    return winnerOf(a.name, b.name, array, matches); 
                } else if(b.DIFF != a.DIFF) {
                    return b.DIFF - a.DIFF;
                } else if(b.PF != a.PF) {
                    return b.PF - a.PF;
                } else {
                    return b.TF - a.TF;
                };
            }); 
        });
        allPools.forEach((elementX, indexX) => {
            elementX.teams.forEach(async (elementY, indexY) => {
                elementY.PL = indexY + 1;
                await poolTablesDataBase.updateOne({pool: elementX.pool, 'teams.name': elementY.name}, {'teams.$.PL': elementY.PL}, {upsert: true});
                if((indexY == elementX.teams.length - 1) && (indexX == allPools.length - 1)) {
                    resolve();
                }; 
            });
        });  
    });
};

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
    countPL,
    getAllPoolTables
};