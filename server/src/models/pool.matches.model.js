//-----------REQUIRE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const poolMatchesDataBase = require('../schemata/pool.matches.mongo');

//-----------POOL MATCHES DATA-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const poolMatches = [
    {
        id: 1,
        pool: 'A',
        teamA: 'France',
        teamB: 'New-Zealand',
        date: new Date('September 8, 2023'),
        place: 'Stade de France' 
    },
    {
        id: 2,
        pool: 'A',
        teamA: 'Italy',
        teamB: 'Namibia',
        date: new Date('September 9, 2023'),
        place: 'Stade Geoffroy Guichard' 
    },
    {
        id: 3,
        pool: 'A',
        teamA: 'France',
        teamB: 'Uruguay',
        date: new Date('September 14, 2023'),
        place: 'Stade Pierre Mauroy'
    },
    {
        id: 4,
        pool: 'A',
        teamA: 'New-Zealand',
        teamB: 'Namibia',
        date: new Date('September 15, 2023'),
        place: 'Stadium de Toulouse'
    },
    {
        id: 5,
        pool: 'A',
        teamA: 'Italy',
        teamB: 'Uruguay',
        date: new Date('September 20, 2023'),
        place: 'Stade de Nice'
    },
    {
        id: 6,
        pool: 'A',
        teamA: 'France',
        teamB: 'Namibia',
        date: new Date('September 21, 2023'),
        place: 'Stade Vélodrome'
    },
    {
        id: 7,
        pool: 'A',
        teamA: 'Uruguay',
        teamB: 'Namibia',
        date: new Date('September 27, 2023'),
        place: 'OL Stadium'
    },
    {
        id: 8,
        pool: 'A',
        teamA: 'New-Zealand',
        teamB: 'Italy',
        date: new Date('September 29, 2023'),
        place: 'OL Stadium'
    },
    {
        id: 9,
        pool: 'A',
        teamA: 'New-Zealand',
        teamB: 'Uruguay',
        date: new Date('October 5, 2023'),
        place: 'OL Stadium'
    },
    {
        id: 10,
        pool: 'A',
        teamA: 'France',
        teamB: 'Italy',
        date: new Date('October 6, 2023'),
        place: 'OL Stadium'
    },
    {
        id: 11,
        pool: 'B',
        teamA: 'Ireland',
        teamB: 'Romania',
        date: new Date('September 9, 2023'),
        place: 'Stade de Bordeaux'
    },
    {
        id: 12,
        pool: 'B',
        teamA: 'South-Africa',
        teamB: 'Scotland',
        date: new Date('September 10, 2023'),
        place: 'Stade Vélodrome'
    },
    {
        id: 13,
        pool: 'B',
        teamA: 'Ireland',
        teamB: 'Tonga',
        date: new Date('September 16, 2023'),
        place: 'Stade de la Beaujoire'
    },
    {
        id: 14,
        pool: 'B',
        teamA: 'South-Africa',
        teamB: 'Romania',
        date: new Date('September 17, 2023'),
        place: 'Stade de Bordeaux'
    },
    {
        id: 15,
        pool: 'B',
        teamA: 'South-Africa',
        teamB: 'Ireland',
        date: new Date('September 23, 2023'),
        place: 'Stade de France'
    },
    {
        id: 16,
        pool: 'B',
        teamA: 'Scotland',
        teamB: 'Tonga',
        date: new Date('September 24, 2023'),
        place: 'Stade de Nice'
    },
    {
        id: 17,
        pool: 'B',
        teamA: 'Scotland',
        teamB: 'Romania',
        date: new Date('September 30, 2023'),
        place: 'Stade Pierre Mauroy'
    },
    {
        id: 18,
        pool: 'B',
        teamA: 'South-Africa',
        teamB: 'Tonga',
        date: new Date('October 1, 2023'),
        place: 'Stade Vélodrome'
    },
    {
        id: 19,
        pool: 'B',
        teamA: 'Ireland',
        teamB: 'Scotland',
        date: new Date('October 7, 2023'),
        place: 'Stade de France'
    },
    {
        id: 20,
        pool: 'B',
        teamA: 'Tonga',
        teamB: 'Romania',
        date: new Date('October 8, 2023'),
        place: 'Stade Pierre Mauroy'
    },
    {
        id: 21,
        pool: 'C',
        teamA: 'Australia',
        teamB: 'Georgia',
        date: new Date('September 9, 2023'),
        place: 'Stade de France'
    },
    {
        id: 22,
        pool: 'C',
        teamA: 'Wales',
        teamB: 'Fiji',
        date: new Date('September 10, 2023'),
        place: 'Stade de Bordeaux'
    },
    {
        id: 23,
        pool: 'C',
        teamA: 'Wales',
        teamB: 'Portugal',
        date: new Date('September 16, 2023'),
        place: 'Stade de Nice'
    },
    {
        id: 24,
        pool: 'C',
        teamA: 'Australia',
        teamB: 'Fiji',
        date: new Date('September 17, 2023'),
        place: 'Stade Geoffroy Guichard'
    },
    {
        id: 25,
        pool: 'C',
        teamA: 'Georgia',
        teamB: 'Portugal',
        date: new Date('September 23, 2023'),
        place: 'Stadium de Toulouse'
    },
    {
        id: 26,
        pool: 'C',
        teamA: 'Wales',
        teamB: 'Australia',
        date: new Date('September 24, 2023'),
        place: 'OL Stadium'
    },
    {
        id: 27,
        pool: 'C',
        teamA: 'Fiji',
        teamB: 'Georgia',
        date: new Date('September 30, 2023'),
        place: 'Stade de Bordeaux'
    },
    {
        id: 28,
        pool: 'C',
        teamA: 'Australia',
        teamB: 'Portugal',
        date: new Date('October 1, 2023'),
        place: 'Stade Geoffroy Guichard'
    },
    {
        id: 29,
        pool: 'C',
        teamA: 'Wales',
        teamB: 'Georgia',
        date: new Date('October 7, 2023'),
        place: 'Stade de la Beaujoire'
    },
    {
        id: 30,
        pool: 'C',
        teamA: 'Fiji',
        teamB: 'Portugal',
        date: new Date('October 8, 2023'),
        place: 'Stadium de Toulouse'
    },
    {
        id: 31,
        pool: 'D',
        teamA: 'England',
        teamB: 'Argentina',
        date: new Date('September 9, 2023'),
        place: 'Stade Vélodrome'
    },
    {
        id: 32,
        pool: 'D',
        teamA: 'Japan',
        teamB: 'Chile',
        date: new Date('September 10, 2023'),
        place: 'Stadium de Toulouse'
    },
    {
        id: 33,
        pool: 'D',
        teamA: 'Samoa',
        teamB: 'Chile',
        date: new Date('September 16, 2023'),
        place: 'Stade de Bordeaux'
    },
    {
        id: 34,
        pool: 'D',
        teamA: 'England',
        teamB: 'Japan',
        date: new Date('September 17, 2023'),
        place: 'Stade de Nice'
    },
    {
        id: 35,
        pool: 'D',
        teamA: 'Argentina',
        teamB: 'Samoa',
        date: new Date('September 22, 2023'),
        place: 'Stade Geoffroy Guichard'
    },
    {
        id: 36,
        pool: 'D',
        teamA: 'England',
        teamB: 'Chile',
        date: new Date('September 23, 2023'),
        place: 'Stade Pierre Mauroy'
    },
    {
        id: 37,
        pool: 'D',
        teamA: 'Japan',
        teamB: 'Samoa',
        date: new Date('September 28, 2023'),
        place: 'Stadium de Toulouse'
    },
    {
        id: 38,
        pool: 'D',
        teamA: 'Argentina',
        teamB: 'Chile',
        date: new Date('September 30, 2023'),
        place: 'Stade de la Beaujoire'
    },
    {
        id: 39,
        pool: 'D',
        teamA: 'England',
        teamB: 'Samoa',
        date: new Date('October 7, 2023'),
        place: 'Stade Pierre Mauroy'
    },
    {
        id: 40,
        pool: 'D',
        teamA: 'Japan',
        teamB: 'Argentina',
        date: new Date('October 8, 2023'),
        place: 'Stade de la Beaujoire'
    }
];

//-----------FUNCTION----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function loadPoolMatchesData() {
    poolMatches.forEach(async (element) => {
        await poolMatchesDataBase.updateOne({
            id: element.id
        },
        {
            id: element.id,
            pool: element.pool,
            teamA: element.teamA,
            teamB: element.teamB,
            date: element.date,
            place: element.place
        },
        {
            upsert: true
        });
    });
};

function getPoolMatch(number) {
    return poolMatches.find((element) => element.id == number);
};

function getAllPoolMatches() {
    return poolMatchesDataBase.find({}, {'_id': 0, '__v': 0});
};

//-----------EXPORT------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
    loadPoolMatchesData,
    getPoolMatch,
    getAllPoolMatches
};