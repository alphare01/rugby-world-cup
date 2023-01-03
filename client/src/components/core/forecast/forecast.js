import './forecast.scss';
import { useState, useEffect, useRef } from 'react';
import { useGetPoolMatches } from '../../../services/getPoolMatchesApi';
import translate from '../../../assets/nations.json';

const ForecastComponent = ({ goNext, setLoader }) => {
    const matchesRef = useRef([]);
    const [forecast, setForecast] = useState([]);
    const [{ poolMatches, isPoolMatchesLoading }, getPoolMatches] = useGetPoolMatches();
    const [values, setValues] = useState([]);
    const [calendarData, setCalendarData] = useState([]);
    const [totals, setTotals] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [openedPool, setOpenedPool] = useState('A');
    const [currentRef, setCurrentRef] = useState(null);

    const [popupMessage, setPopUpMessage] = useState('');
    const [displayPopUp, setDisplayPopUp] = useState(false);

    useEffect(() => {
        if (!poolMatches) {
            getPoolMatches();
        }
    }, [])

    useEffect(() => {
        setLoader(isPoolMatchesLoading);
    }, [isPoolMatchesLoading])

    useEffect(() => {
        if (poolMatches) {
            setForecast(orderForecastsByPools(poolMatches));

            setDefaultsValues(poolMatches);
            getCalendarData(poolMatches);
            checkValues();
        }
    }, [poolMatches])

    useEffect(() => {
        if (currentRef || currentRef === 0) {
            if (matchesRef && matchesRef.current) {
                const div = document.getElementById('matches-container');
                if (!!div) {
                    div.scrollTo(0, 0);
                    matchesRef.current[currentRef].scrollIntoView({behavior: 'smooth'});

                }

            }
        }
    }, [currentRef])

    const orderForecastsByPools = (poolMatches) => {
        const poolsMatches = [];
        if (!!poolMatches && poolMatches.length) {
            poolMatches.forEach(match => {
                if (poolMatches.length === 0) {
                    let firstPool = {
                        pool: match.pool,
                        matches: [{
                            teamA: match.teamA,
                            teamB: match.teamB,
                            date: match.date,
                            id: match.id,
                            pool: match.pool,
                            place: match.place
                        }]
                    }
                    poolsMatches.push(firstPool);
                } else if (poolsMatches.map(el => el.pool).indexOf(match.pool) === -1) {
                    let tempPool = {
                        pool: match.pool,
                        matches: [{
                            teamA: match.teamA,
                            teamB: match.teamB,
                            date: match.date,
                            id: match.id,
                            place: match.place,
                            pool: match.pool
                        }]
                    }
                    poolsMatches.push(tempPool);
                } else {
                    const index = poolsMatches.map(el => el.pool).indexOf(match.pool);
                    poolsMatches[index].matches.push({teamA: match.teamA, teamB: match.teamB, date: match.date, id: match.id, place: match.place, pool: match.pool,})
                }
            })
        }
        return poolsMatches;
    }

    const getCalendarData = (poolMatches) => {
        let dates = [];
        if (poolMatches && poolMatches.length) {
            poolMatches.forEach(match => {
                const index = dates.map(el => el.date).indexOf(match.date);
                if (index !== -1) {
                    dates[index].matches.push({teamA:match.teamA, teamB:match.teamB, id: match.id, pool: match.pool})
                } else {
                    dates.push({
                        date: match.date,
                        matches: [
                            {
                                teamA:match.teamA, 
                                teamB:match.teamB, 
                                id: match.id,
                                pool: match.pool
                            }
                        ]
                    })
                }
            })
            setCalendarData(dates);
        }
    }

    const setDefaultsValues = (poolMatches) => {
        if (!values || !values.length) {
            let emptyValues = [];
            poolMatches.forEach(match => {
                const emptyValue = {
                    id: match.id,
                    inGameScore: {
                        teamA: {
                            convertedTries: 0,
                            unconvertedTries: 0,
                            penaltyKicksDropGoals: 0
                        },
                        teamB: {
                            convertedTries: 0,
                            unconvertedTries: 0,
                            penaltyKicksDropGoals: 0
                        }
                    }
                }
                emptyValues.push(emptyValue);
            })
            setValues(emptyValues);
        }
    }

    const formatDate = (date) => {
        if (date) {
            return new Date(date).toDateString();
        } else {
            return 'pas de date';
        }
    }

    // const getInputValue = (matchId, team, pointsType) => {
    //     if (!values || !values.length) {
    //         return 0;
    //     } else {
    //         const currentMatch = values.find(el => el.id === matchId);
    //         return !!currentMatch ? Number(currentMatch.inGameScore[team][pointsType]) : 0;
    //     }
    // }

    const setCurrentValue = (value, matchId, team, pointsType) => {
        if (!values || !values.length) {
            return; 
        }

        let currentValues = values;
        currentValues.map(score => {
            if (score.id === matchId) {
                return score.inGameScore[team][pointsType] = Number(value);
            } else { return score }
        })

        // Save totalsScore
        const key = matchId + '-' + team;
        const tempsTotalValue = getTotal(matchId, team);
        setTotals((current) => ({
            ...current,
            [key]: tempsTotalValue,
        }));

        console.log('total', totals)

        checkValues();
        setValues(currentValues);
    }

    const checkValues = () => {
        const isMissingSome = values.some(value => {
            return (!value.inGameScore.teamA.convertedTries && value.inGameScore.teamA.convertedTries !== 0)
            || (!value.inGameScore.teamA.penaltyKicksDropGoals && value.inGameScore.teamA.penaltyKicksDropGoals !== 0)
            || (!value.inGameScore.teamA.unconvertedTries && value.inGameScore.teamA.unconvertedTries !== 0)
            || (!value.inGameScore.teamB.convertedTries && value.inGameScore.teamB.convertedTries !== 0)
            || (!value.inGameScore.teamB.penaltyKicksDropGoals && value.inGameScore.teamB.penaltyKicksDropGoals !== 0)
            || (!value.inGameScore.teamB.unconvertedTries && value.inGameScore.teamB.unconvertedTries !== 0);
        })
        setIsValid(!isMissingSome);
    }

    const submit = () => {
        if (!totals) {
            setPopUpMessage('Aucun score n\'a été renseigné. Voulez vous valider ?')
            setDisplayPopUp(true);
            return;
        } else {
            const keys = Object.keys(totals);
            const haveScoreNull = false;
            keys.forEach(key => {
                if (totals[key] === 0) {
                    haveScoreNull = true;
                }
            })
            if (keys.length < 80 || haveScoreNull) {
                setPopUpMessage('Certains score sont à O. Voulez vous valider vos pronotics?');
                setDisplayPopUp(true);
                return;
            } else {
                goNext(values);
            }
        } 
    }


    const formatTeamName = (name) => {
        return (!!translate && translate[name]) ? translate[name].frenchName : name;
    }

    const getFlagKey = (name) => {
        return (!!translate && translate[name]) ? translate[name].code : '';
    }
    
    const getTotal = (matchId, team)  => {
        const currentMatch = values.find(el => el.id === matchId);
        return !!currentMatch ? (Number(currentMatch.inGameScore[team].convertedTries) * 7 + Number(currentMatch.inGameScore[team].unconvertedTries) * 5 + Number(currentMatch.inGameScore[team].penaltyKicksDropGoals * 3)) : 0;
    }

    const openPool = (pool, fromCalendar = false) => {
        if (pool === openedPool && !fromCalendar) {
            setOpenedPool('');
        } else {
            setOpenedPool(pool);
        }
    }

    const handleCalendarClick = (match) => {
        openPool(match.pool, true);
        let multiplicator = 0;
        switch(match.pool) {
            case 'A': multiplicator = 0;
                break;
            case 'B': multiplicator = 1;
                break;
            case 'C': multiplicator = 2;
                break;
            case 'D': multiplicator = 3;
                break;
        }

        setCurrentRef(match.id - 1 - (multiplicator*10));
    }

    const setRef = (el, matchId, visible, pool) => {
        if (!el || !visible) { return; }
        let multiplicator = 0;
        switch(pool) {
            case 'A': multiplicator = 0;
                break;
            case 'B': multiplicator = 1;
                break;
            case 'C': multiplicator = 2;
                break;
            case 'D': multiplicator = 3;
                break;
        }

        const index = matchId - 1 - (multiplicator*10);
        matchesRef.current[index] = el
    }

    return (
        <div>
            {(!!forecast && forecast.length && !!values) && 
            <div className="forecast-container">
                <div className="calendar-section">
                    {/* calendar */}
                    {calendarData.map(date => 
                        <div className="date-block" key={date.date}>
                            <span className="date-label">
                                {formatDate(date.date)}
                            </span>
                            <ul className="match-list">
                                {date.matches.map(match =>
                                    <li key={match.id} onClick={() => handleCalendarClick(match)}>
                                        <span className={`fi fi-${getFlagKey(match.teamA)}`}></span>{formatTeamName(match.teamA)}
                                        &nbsp;-&nbsp;
                                        {formatTeamName(match.teamB)}<span className={`fi fi-${getFlagKey(match.teamB)}`}></span></li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="matches-container" id='matches-container'>
                    <div className="matches-content">
                        {forecast.map((pool) => <div className="pool-block" key={pool.pool}>
                            <div onClick={() => openPool(pool.pool)} className='pool-block--header'><span>Poule {pool.pool}</span><i className={"arrow " + ((openedPool === pool.pool) ? 'down' : 'up')}></i></div>
                            <div className={"pool-card " + ((openedPool === pool.pool) ? 'open' : '')}>
                            {pool.matches.map((match, i) =>
                                <div className="match-card" key={match.id} ref={el => setRef(el, match.id, openedPool === pool.pool, match.pool)}>
                                    <div className="match-card--header">
                                    <div className="date left">{formatDate(match.date)}</div>
                                    <div className="place center">Poule {match.pool}</div>
                                    <div className="place right">{match.place}</div>
                                </div>
                                    <div className="match-card--teams">
                                        <div className="team-block">
                                            <div className="team-name">
                                                <span>{formatTeamName(match.teamA)}</span>
                                                <span className={`fi fi-${getFlagKey(match.teamA)}`}></span>
                                                </div>
                                            <div className="pronostics">
                                                <div className="pronostic">
                                                    Essai(s) transformé(s)
                                                    <div className="co-input">
                                                        <input
                                                            name={`${match.id}-teamA`}
                                                            // value={getInputValue(match.id, 'teamA', 'convertedTries')}
                                                            placeholder="0"
                                                            onChange={(e) => setCurrentValue(e.target.value, match.id, 'teamA', 'convertedTries')}
                                                            type="number"
                                                            min="0"
                                                        //   ref={inputRef}
                                                        //   disabled={disabled}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="pronostic">
                                                    Essai(s) non transformé(s)
                                                    <div className="co-input">
                                                        <input
                                                            name={`${match.id}-teamA`}
                                                            // value={getInputValue(match.id, 'teamA', 'unconvertedTries')}
                                                            placeholder="0"
                                                            onChange={(e) => setCurrentValue(e.target.value, match.id, 'teamA', 'unconvertedTries')}
                                                            type="number"
                                                            min="0"
                                                            //   ref={inputRef}
                                                            //   disabled={disabled}
                                                            />
                                                        </div>
                                                    </div>
                                                <div className="pronostic">
                                                    Drop(s) / Pénalité(s)
                                                    <div className="co-input">
                                                        <input
                                                            name={`${match.id}-teamA`}
                                                            // value={getInputValue(match.id, 'teamA', 'penaltyKicksDropGoals')}
                                                            placeholder="0"
                                                            onChange={(e) => setCurrentValue(e.target.value, match.id, 'teamA', 'penaltyKicksDropGoals')}
                                                            type="number"
                                                            min="0"
                                                            //   ref={inputRef}
                                                            //   disabled={disabled}
                                                            />
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="between">VS</div>
                                        <div className="team-block">
                                            <div className="team-name">
                                                <span>{formatTeamName(match.teamB)}</span>
                                                <span className={`fi fi-${getFlagKey(match.teamB)}`}></span>
                                                </div>
                                            <div className="pronostics">
                                                <div className="pronostic">
                                                    Essai(s) transformé(s)
                                                    <div className="co-input">
                                                        <input
                                                            name={`${match.id}-teamB`}
                                                            // value={getInputValue(match.id, 'teamB', 'convertedTries')}
                                                            placeholder="0"
                                                            onChange={(e) => setCurrentValue(e.target.value, match.id, 'teamB', 'convertedTries')}
                                                            type="number"
                                                            min="0"
                                                        //   ref={inputRef}
                                                        //   disabled={disabled}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="pronostic">
                                                    Essai(s) non transformé(s)
                                                    <div className="co-input">
                                                        <input
                                                            name={`${match.id}-teamB`}
                                                            // value={getInputValue(match.id, 'teamB', 'unconvertedTries')}
                                                            placeholder="0"
                                                            onChange={(e) => setCurrentValue(e.target.value, match.id, 'teamB', 'unconvertedTries')}
                                                            type="number"
                                                            min="0"
                                                            //   ref={inputRef}
                                                            //   disabled={disabled}
                                                            />
                                                        </div>
                                                    </div>
                                                <div className="pronostic">
                                                    Drop(s)/ Pénalité(s)
                                                    <div className="co-input">
                                                        <input
                                                            name={`${match.id}-teamB`}
                                                            // value={getInputValue(match.id, 'teamB', 'penaltyKicksDropGoals')}
                                                            placeholder="0"
                                                            onChange={(e) => setCurrentValue(e.target.value, match.id, 'teamB', 'penaltyKicksDropGoals')}
                                                            type="number"
                                                            min="0"
                                                            //   ref={inputRef}
                                                            //   disabled={disabled}
                                                            />
                                                        </div>
                                                    </div>
                                            </div>
                                        </div> 
                                    </div>

                                    <div className="match-card--score">
                                        <span className="score-label">score</span>
                                        {totals && <div className="score">{totals[`${match.id}-teamA`] ? totals[`${match.id}-teamA`] : 0}</div>}
                                        &nbsp;-&nbsp;
                                        {totals && <div className="score">{totals[`${match.id}-teamB`] ? totals[`${match.id}-teamB`] : 0}</div>}
                                    </div>
                                    
                                    
                                </div>
                            )}
                            </div>
                        </div>)}
                        </div>
                </div>
                
            </div>
            
            }
            <button className={"submit-button" + (!isValid ? " disabled" : "")} onClick={() => submit()}>Submit</button>
            {displayPopUp && 
                <div className="infos-popup">
                    <div className="dark-background" onClick={() => setDisplayPopUp(false)}></div>
                    <div className="popup-container">
                        <div className="popup-content">{popupMessage}</div>
                        <div className="buttons">
                            <button onClick={() => setDisplayPopUp(false)}>Annuler</button>
                            <button onClick={() => goNext(values)}>Valider</button>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
};

export default ForecastComponent
;
