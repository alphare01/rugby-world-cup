const request = require('supertest');
const app = require('../src/app');

describe('TEST POST /forecasts', () => {
    const completeForecasts = [
        {
            id: 1,
            inGameScore: {
                teamA: {
                    convertedTries: 3,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 2,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 2,
            inGameScore: {
                teamA: {
                    convertedTries: 1,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 3,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 0
                },
                teamB: {
                    convertedTries: 3,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 4,
            inGameScore: {
                teamA: {
                    convertedTries: 1,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 0
                },
                teamB: {
                    convertedTries: 3,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 3
                }
            }
        },
        {
            id: 5,
            inGameScore: {
                teamA: {
                    convertedTries: 3,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 6,
            inGameScore: {
                teamA: {
                    convertedTries: 0,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 1
                }
            }
        },
        {
            id: 7,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 1
                }
            }
        },
        {
            id: 8,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 1
                }
            }
        },
        {
            id: 9,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 0
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 1
                }
            }
        },
        {
            id: 10,
            inGameScore: {
                teamA: {
                    convertedTries: 1,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 2,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 11,
            inGameScore: {
                teamA: {
                    convertedTries: 0,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 12,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 13,
            inGameScore: {
                teamA: {
                    convertedTries: 1,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 14,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 2,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 1
                }
            }
        },
        {
            id: 15,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 3
                }
            }
        },
        {
            id: 16,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 0
                },
                teamB: {
                    convertedTries: 2,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 17,
            inGameScore: {
                teamA: {
                    convertedTries: 1,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 0
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 18,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 19,
            inGameScore: {
                teamA: {
                    convertedTries: 3,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 0
                },
                teamB: {
                    convertedTries: 3,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 20,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 21,
            inGameScore: {
                teamA: {
                    convertedTries: 3,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 22,
            inGameScore: {
                teamA: {
                    convertedTries: 3,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 3,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 3
                }
            }
        },
        {
            id: 23,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 24,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 0
                },
                teamB: {
                    convertedTries: 2,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 25,
            inGameScore: {
                teamA: {
                    convertedTries: 0,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 26,
            inGameScore: {
                teamA: {
                    convertedTries: 0,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 3,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 3
                }
            }
        },
        {
            id: 27,
            inGameScore: {
                teamA: {
                    convertedTries: 3,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 3
                }
            }
        },
        {
            id: 28,
            inGameScore: {
                teamA: {
                    convertedTries: 0,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 3,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 3
                }
            }
        },
        {
            id: 29,
            inGameScore: {
                teamA: {
                    convertedTries: 1,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 30,
            inGameScore: {
                teamA: {
                    convertedTries: 0,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 3,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 1
                }
            }
        },
        {
            id: 31,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 0
                },
                teamB: {
                    convertedTries: 2,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 32,
            inGameScore: {
                teamA: {
                    convertedTries: 3,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 33,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 2
                },
                teamB: {
                    convertedTries: 2,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 0
                }
            }
        },
        {
            id: 34,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 3
                }
            }
        },
        {
            id: 35,
            inGameScore: {
                teamA: {
                    convertedTries: 1,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 3,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 36,
            inGameScore: {
                teamA: {
                    convertedTries: 0,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 3
                }
            }
        },
        {
            id: 37,
            inGameScore: {
                teamA: {
                    convertedTries: 2,
                    unconvertedTries: 3,
                    penaltyKicksDropGoals: 1
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 38,
            inGameScore: {
                teamA: {
                    convertedTries: 1,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 2,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 2
                }
            }
        },
        {
            id: 39,
            inGameScore: {
                teamA: {
                    convertedTries: 3,
                    unconvertedTries: 0,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 1,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 1
                }
            }
        },
        {
            id: 40,
            inGameScore: {
                teamA: {
                    convertedTries: 3,
                    unconvertedTries: 2,
                    penaltyKicksDropGoals: 3
                },
                teamB: {
                    convertedTries: 0,
                    unconvertedTries: 1,
                    penaltyKicksDropGoals: 2
                }
            }
        },
    ];

    test('It should send back updated pool tables', async () => {
        const response = await request(app)
            .post('/forecasts')
            .send(completeForecasts)
            .expect('Content-Type', /json/)
            .expect(201);
        
        expect(response.body.sort()).toEqual(

        );

    })
    
    
    
    
    
    // test('It should erase poolTablesDataBase', () => {});
    // test('It should load empty pool tables', () => {});
    // test('It should add inGameScore and Score to each forecast', () => {});
    // test('It should erase load forecastsDataBase', () => {});
    // test('It should count wins, draws and losses', () => {});
    // test('It should count bonus points', () => {});
    // test('It should count points for', () => {});
    // test('It should count points against', () => {});
    // test('It should calculate difference', () => {});
    // test('It should count pool points', () => {});
    // test('It should count scored tries', () => {});
    // test('It should calculate ranks', () => {});
    // test('It should respond with 201 created', () => {});
});

[
    {
        "id":2,
        "pool":"B",
        "teams":[
            {"name":"South-Africa","PL":1,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29b8"},
            {"name":"Ireland","PL":2,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29b9"},
            {"name":"Scotland","PL":3,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29ba"},
            {"name":"Tonga","PL":4,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29bb"},
            {"name":"Romania","PL":5,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29bc"}
        ]
    },
    {
        "id":1,
        "pool":"A",
        "teams":[
            {"name":"New-Zealand","PL":1,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29b2"},
            {"name":"France","PL":2,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29b3"},
            {"name":"Italy","PL":3,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29b4"},
            {"name":"Uruguay","PL":4,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29b5"},
            {"name":"Namibia","PL":5,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29b6"}
        ]
    },
    {
        "id":3,
        "pool":"C",
        "teams":[
            {"name":"Wales","PL":1,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29be"},
            {"name":"Australia","PL":2,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29bf"},
            {"name":"Fiji","PL":3,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29c0"},
            {"name":"Georgia","PL":4,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29c1"},
            {"name":"Portugal","PL":5,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29c2"}
        ]
    },
    {
        "id":4,
        "pool":"D",
        "teams":[
            {"name":"England","PL":1,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29c4"},
            {"name":"Japan","PL":2,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29c5"},
            {"name":"Argentina","PL":3,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29c6"},
            {"name":"Samoa","PL":4,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29c7"},
            {"name":"Chile","PL":5,"W":0,"D":4,"L":0,"PF":0,"PA":0,"DIFF":0,"TF":0,"BP":0,"POINTS":8,"_id":"63c046da42da067023ff29c8"}
        ]
    }
].sort()