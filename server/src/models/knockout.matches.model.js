//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const knockoutMatchesDataBase = require('../schemata/knockout.matches.mongo');
const {getAllPoolTables} = require('./pool.tables.model');

//----------FUNCTION-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function getQualifiedTeams() {
    const qualified = [];
    const poolTables = await getAllPoolTables();
    poolTables.forEach((elementX) => {
        elementX.teams.forEach((elementY) => {
            if(elementY.PL == 1 || elementY.PL == 2) {
                qualified.push({
                    team: elementY.name,
                    pool: elementX.pool,
                    place: elementY.PL
                });
            };
        });
    });
    return qualified;
};

async function loadAllKnockoutMatches(array) {
    let qualified_1 = {};
    let qualified_2 = {};
    let qualified_3 = {};
    let qualified_4 = {};
    let qualified_5 = {};
    let qualified_6 = {};
    let qualified_7 = {};
    let qualified_8 = {};
    array.forEach((element) => {
        if((element.pool == 'A') && (element.place == 1)) {
            qualified_1 = element;
        };
        if((element.pool == 'B') && (element.place == 1)) {
            qualified_2 = element;
        }; 
        if((element.pool == 'C') && (element.place == 1)) {
            qualified_3 = element;
        }; 
        if((element.pool == 'D') && (element.place == 1)) {
            qualified_4 = element;
        }; 
        if((element.pool == 'A') && (element.place == 2)) {
            qualified_5 = element;
        }; 
        if((element.pool == 'B') && (element.place == 2)) {
            qualified_6 = element;
        }; 
        if((element.pool == 'C') && (element.place == 2)) {
            qualified_7 = element;
        }; 
        if((element.pool == 'D') && (element.place == 2)) {
            qualified_8 = element;
        };  
    });
    await knockoutMatchesDataBase.updateOne(
        {
            id: 41
        },
        {
            id: 41,
            stage: 'Quarter-final',
            teamA: qualified_3.team,
            teamB: qualified_8.team,
            date: new Date('October 14, 2023'),
            place: 'Stade Vélodrome'
        },
        {
            upsert: true
        }
    );
    await knockoutMatchesDataBase.updateOne(
        {
            id: 42
        },
        {
            id: 42,
            stage: 'Quarter-final',
            teamA: qualified_2.team,
            teamB: qualified_5.team,
            date: new Date('October 14, 2023'),
            place: 'Stade de France'
        },
        {
            upsert: true
        }
    );
    await knockoutMatchesDataBase.updateOne(
        {
            id: 43
        },
        {
            id: 43,
            stage: 'Quarter-final',
            teamA: qualified_4.team,
            teamB: qualified_7.team,
            date: new Date('October 15, 2023'),
            place: 'Stade Vélodrome'
        },
        {
            upsert: true
        }
    );
    await knockoutMatchesDataBase.updateOne(
        {
            id: 44
        },
        {
            id: 44,
            stage: 'Quarter-final',
            teamA: qualified_1.team,
            teamB: qualified_6.team,
            date: new Date('October 15, 2023'),
            place: 'Stade de France'
        },
        {
            upsert: true
        }
    );
};

async function getAllKnockoutMatches() {
    return knockoutMatchesDataBase.find({}, {'_id': 0, '__v': 0});
};

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    getQualifiedTeams,
    loadAllKnockoutMatches,
    getAllKnockoutMatches,
};