import './knockout-stage.scss';
import { useState, useEffect } from 'react';

import translate from '../../../assets/nations.json';
import { useGetKnockoutMatches } from '../../../services/getKnockoutsApi';
const KnockoutStageComponent = ({setLoader}) => {
    const [{ knockoutMatches, isKnockOutMatchesLoading }, getKnockoutMatches] = useGetKnockoutMatches();
    const [quarterfinals, setQuarterfinals] = useState([]);
    const [semifinals, setSemifinals] = useState({});
    const [finals, setFinals] = useState({});
    const [forecast, setForecast] = useState({})
    const [winners, setWinners] = useState({})
    const [isFinalDraw, setIsFinalDraw] = useState(false);
    const [forbiddenValues, setForbiddenValues] = useState({});
    const [popupTeams, setPopUpTeams] = useState(null);
    const [displayPopUp, setDisplayPopUp] = useState(false);

    useEffect(() => {
        if (!knockoutMatches) {
            getKnockoutMatches();
        } else {
            formatKnockout(knockoutMatches);
        }
    }, [knockoutMatches])

    useEffect(() => {
        setLoader(isKnockOutMatchesLoading);
    }, [isKnockOutMatchesLoading])


    const getFlagKey = (name) => {
        let flag = (!!translate && translate[name]) ? translate[name].code : '';
        if (flag === 'nz') {
            flag = flag + ' bigger'
        };
        return flag;
    }

    const formatTeamName = (name) => {
        return (!!translate && translate[name]) ? translate[name].frenchName : name;
    }

    const formatKnockout = (matches) => {
        let firstKnockoutQuarter = [];
        let secondKnockoutQuarter = [];
        let knockoutQuarter = [];
        if (matches && matches.length) {
            matches.forEach((el, i) => {
                if (i < 2) {
                    firstKnockoutQuarter.push(el);
                } else if (i > 1) {
                    secondKnockoutQuarter.push(el);
                }
            })
            knockoutQuarter.push(firstKnockoutQuarter, secondKnockoutQuarter);
            setQuarterfinals(knockoutQuarter);
        } else {
            return;
        }
    }

    const setEqualityWinner = (winnerTeam, teams, phase ) => {
        console.log(winners['semifinals-45'])
        console.log(winners)
        const matchKey = phase + '-' + winnerTeam.matchId;
        setPopUpTeams(null);
        setDisplayPopUp(false);
        winnerTeam.isWinner = true;
        winnerTeam['tab'] = true;
        

        setWinners((current) => ({
            ...current,
            [matchKey]: winnerTeam,
        }));
    }

    const setCurrentValue = (phase, team, score, matchId, teamKey) => {
        const key = phase + '-' + matchId + '-' + teamKey;
        const opponentTeamKey = teamKey === 'a' ? 'b' : 'a';
        const opponentKey = phase + '-' + matchId + '-' + opponentTeamKey;
        console.log('score', score)

        if (score == '1' || score == '2' || score == '4') {
            let forbiddenKey = matchId + '-team' + teamKey;
            const obj = {};
            console.log(forbiddenValues)
            setForbiddenValues((current) => ({
                ...current,
                [forbiddenKey]: true
            }));
            return;
        } else {
            let forbiddenKey = matchId + '-team' + teamKey;
            if (forbiddenValues[forbiddenKey] === true) {
                setForbiddenValues((current) => ({
                    ...current,
                    [forbiddenKey]: false
                }));
            }
        }

        let currentTeam = {
            name: team,
            score: score,
            matchId: matchId,
            isWinner: false
        }
        if (!!forecast[opponentKey] && Number(forecast[opponentKey].score) < Number(score)) {
            if (phase === 'finals') {
                setIsFinalDraw(false);
            }
            currentTeam.isWinner = true;
            const winnerKey = phase + '-' + matchId;
            setWinners((current) => ({
                ...current,
                [winnerKey]: currentTeam,
            }));

            setForecast((current) => ({
                ...current,
                [key]: currentTeam,
            }));
        } else if (forecast[opponentKey] && Number(forecast[opponentKey].score) === Number(score)) {
            // Handle la pop up
            if (phase === 'finals') {
                setIsFinalDraw(true);
                setDisplayPopUp(true);
                setPopUpTeams({teams: [currentTeam, forecast[opponentKey]], phase: phase});
            } else {
                setDisplayPopUp(true);
                setPopUpTeams({teams: [currentTeam, forecast[opponentKey]], phase: phase});
            }
        } else if (forecast[opponentKey] && Number(forecast[opponentKey].score) > Number(score)) {
            if (phase === 'finals') {
                setIsFinalDraw(false);
            } 
            let opponentTeam = forecast[opponentKey];
            opponentTeam.isWinner = true;
            const winnerKey = phase + '-' + matchId;
                setWinners((current) => ({
                    ...current,
                    [winnerKey]: opponentTeam,
                }))

            setForecast((current) => ({
                ...current,
                [key]: currentTeam,
                [opponentKey]: opponentTeam
            }));
        } else {
            setForecast((current) => ({
                ...current,
                [key]: currentTeam
            }));
        }
    }

    return (
        <div>
            <div className="knockout-container">
                <div className="bracket">
    
                    {quarterfinals && 
                    <section className="round quarterfinals">
                        {/* debut des quarts */}
                        {quarterfinals.map((quarterMatch, i) => 
                            <div className="winners" key={i}>
                                <div className="matchups">
                                    {quarterMatch.map((match, j) => 
                                        <div className="matchup" key={j}>
                                            <div className="participants">
                                                <div className={"participant " + (!!winners['quarterfinals-' + match.id] && winners['quarterfinals-' + match.id].name === match.teamA ? 'winner' : '') + (forbiddenValues[`${match.id}-teama`] ? ' invalid' : '')}>
                                                    <span>
                                                    <span className={`fi fi-${getFlagKey(match.teamA)}`}></span>
                                                    {formatTeamName(match.teamA)}
                                                        <div className="co-input">
                                                            <input
                                                                name={`${match.id}-teamA`}
                                                                placeholder="Score"
                                                                onBlur={(e) => setCurrentValue('quarterfinals', match.teamA, e.target.value, match.id, 'a')}
                                                                type="number"
                                                                min="0"
                                                            />
                                                            {(!forbiddenValues[`${match.id}-teama`] && !!winners['quarterfinals-' + match.id] && winners['quarterfinals-' + match.id].tab && winners['quarterfinals-' + match.id].name === match.teamA) && <div className="tab-label">T.A.B</div>}
                                                            {forbiddenValues[`${match.id}-teama`] && <div className="tab-label">invalide</div>}
                                                        </div>
                                                    </span>
                                                </div>
                                                <div className={"participant " + (winners['quarterfinals-' + match.id] && winners['quarterfinals-' + match.id].name === match.teamB ? 'winner' : '') + (forbiddenValues[`${match.id}-teamb`] ? ' invalid' : '')}>
                                                    <span>
                                                    <span className={`fi fi-${getFlagKey(match.teamB)}`}></span>
                                                    {formatTeamName(match.teamB)}
                                                        <div className="co-input">
                                                            <input
                                                                name={`${match.id}-teamB`}
                                                                placeholder="Score"
                                                                onBlur={(e) => setCurrentValue('quarterfinals', match.teamB, e.target.value, match.id, 'b')}
                                                                type="number"
                                                                min="0"
                                                            />
                                                            {(!forbiddenValues[`${match.id}-teamb`] && !!winners['quarterfinals-' + match.id] && winners['quarterfinals-' + match.id].tab && winners['quarterfinals-' + match.id].name === match.teamB) && <div className="tab-label">T.A.B</div>}
                                                            {forbiddenValues[`${match.id}-teamb`] && <div className="tab-label">invalide</div>}
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="connector">
                                    <div className="merger"></div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        )}
                        
                        {/* Fin des quarts */}
                    </section>
                    }

                    <section className="round semifinals">
                        {/* debut des demi */}
                        <div className="winners">
                            <div className="matchups">

                                <div className="matchup">
                                    <div className="participants">
                                        <div className={"participant " + (!!winners['semifinals-45'] && winners['semifinals-45'].name === winners['quarterfinals-41'].name ? 'winner' : '') + (forbiddenValues[`45-teama`] ? ' invalid' : '')}>
                                            {!!winners['quarterfinals-41'] &&
                                            <span>
                                                <span className={`fi fi-${getFlagKey(winners['quarterfinals-41'].name)}`}></span>
                                                {formatTeamName(winners['quarterfinals-41'].name)}
                                                <div className="co-input">
                                                    <input
                                                        name='41'
                                                        placeholder="Score"
                                                        onBlur={(e) => setCurrentValue('semifinals', winners['quarterfinals-41'].name, e.target.value, 45, 'a')}
                                                        type="number"
                                                        min="0"
                                                    />
                                                    {(!forbiddenValues[`45-teama`] && !!winners['semifinals-45'] && winners['semifinals-45'].tab && winners['semifinals-45'].name === winners['quarterfinals-41'].name) && <div className="tab-label">T.A.B</div>}
                                                    {forbiddenValues[`45-teama`] && <div className="tab-label">invalide</div>}
                                                </div>
                                            </span>}
                                        </div>
                                        <div className={"participant " + (!!winners['semifinals-45'] && winners['semifinals-45'].name === winners['quarterfinals-42'].name ? 'winner' : '') + (forbiddenValues[`45-teamb`] ? ' invalid' : '')}>
                                            {!!winners['quarterfinals-42'] &&
                                            <span>
                                                <span className={`fi fi-${getFlagKey(winners['quarterfinals-42'].name)}`}>
                                                </span>{formatTeamName(winners['quarterfinals-42'].name)}
                                                <div className="co-input">
                                                    <input
                                                        name='42'
                                                        placeholder="Score"
                                                        onBlur={(e) => setCurrentValue('semifinals', winners['quarterfinals-42'].name, e.target.value, 45, 'b')}
                                                        type="number"
                                                        min="0"
                                                    />
                                                    {(!forbiddenValues[`45-teamb`] && !!winners['semifinals-45'] && winners['semifinals-45'].tab && winners['semifinals-45'].name === winners['quarterfinals-42'].name) && <div className="tab-label">T.A.B</div>}
                                                    {forbiddenValues[`45-teamb`] && <div className="tab-label">invalide</div>}
                                                </div>
                                            </span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="matchup">
                                    <div className="participants">
                                        <div className={"participant " + (!!winners['semifinals-46'] && winners['semifinals-46'].name === winners['quarterfinals-43'].name ? 'winner' : '') + (forbiddenValues[`46-teama`] ? ' invalid' : '')}>
                                            {!!winners['quarterfinals-43'] &&
                                            <span>
                                                <span className={`fi fi-${getFlagKey(winners['quarterfinals-43'].name)}`}></span>
                                                {formatTeamName(winners['quarterfinals-43'].name)}
                                            <div className="co-input">
                                                    <input
                                                        name="43"
                                                        placeholder="Score"
                                                        onBlur={(e) => setCurrentValue('semifinals', winners['quarterfinals-43'].name, e.target.value, 46, 'a')}
                                                        type="number"
                                                        min="0"
                                                    />
                                                {(!forbiddenValues[`46-teama`] && !!winners['semifinals-46'] && winners['semifinals-46'].tab && winners['semifinals-46'].name === winners['quarterfinals-43'].name) && <div className="tab-label">T.A.B</div>}
                                                {forbiddenValues[`46-teama`] && <div className="tab-label">invalide</div>}
                                                </div>
                                            </span>}
                                        </div>
                                        <div className={"participant " + (!!winners['semifinals-46'] && winners['semifinals-46'].name === winners['quarterfinals-44'].name ? 'winner' : '') + (forbiddenValues[`46-teamb`] ? ' invalid' : '')}>
                                            {!!winners['quarterfinals-44'] &&
                                            <span>
                                                <span className={`fi fi-${getFlagKey(winners['quarterfinals-44'].name)}`}></span>
                                                {formatTeamName(winners['quarterfinals-44'].name)}
                                                <div className="co-input">
                                                    <input
                                                        name="44"
                                                        placeholder="Score"
                                                        onBlur={(e) => setCurrentValue('semifinals', winners['quarterfinals-44'].name, e.target.value, 46, 'b')}
                                                        type="number"
                                                        min="0"
                                                    />
                                                    {(!!winners['semifinals-46'] && winners['semifinals-46'].tab && winners['semifinals-46'].name === winners['quarterfinals-44'].name) && <div className="tab-label">T.A.B</div>}
                                                    {forbiddenValues[`46-teamb`] && <div className="tab-label">invalide</div>}
                                                </div>
                                            </span>}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="connector">
                                <div className="merger"></div>
                                <div className="line"></div>
                            </div>
                        </div>
                        {/* Fin des demi */}
                    </section>

                    <section className="round finals">
                        {/* debut final */}
                        <div className="winners">
                            <div className="matchups">

                                <div className="matchup">
                                    <div className="participants">
                                        <div className={"participant " + (!!winners['finals-47'] && winners['finals-47'].name === winners['semifinals-45'].name ? 'winner' : '') + (forbiddenValues[`47-teama`] ? ' invalid' : '')}>
                                            {!!winners['semifinals-45'] && 
                                                <span>
                                                    <span className={`fi fi-${getFlagKey(winners['semifinals-45'].name)}`}></span>
                                                    {formatTeamName(winners['semifinals-45'].name)}
                                                    <div className="co-input">
                                                        <input
                                                            name="45"
                                                            placeholder="Score"
                                                            onBlur={(e) => setCurrentValue('finals', winners['semifinals-45'].name, e.target.value, 47, 'a')}
                                                            type="number"
                                                            min="0"
                                                        />
                                                        {(!forbiddenValues[`47-teama`] && !!winners['finals-47'] && winners['finals-47'].tab && winners['finals-47'].name === winners['semifinals-45'].name) && <div className="tab-label">T.A.B</div>}
                                                        {forbiddenValues[`47-teama`] && <div className="tab-label">invalide</div>}
                                                    </div>
                                                </span>
                                                
                                            }
                                            {!isFinalDraw && <div className='crown'><span>WINNER</span><img src={require('../../../assets/cup.png')} /> </div>}
                                        </div>
                                        <div className={"participant " + (!!winners['finals-47'] && winners['finals-47'].name === winners['semifinals-46'].name ? 'winner' : '') + (forbiddenValues[`47-teamb`] ? ' invalid' : '')}>
                                            {winners['semifinals-46'] && 
                                                <span>
                                                    <span className={`fi fi-${getFlagKey(winners['semifinals-46'].name)}`}></span>
                                                    {formatTeamName(winners['semifinals-46'].name)}
                                                    <div className="co-input">
                                                        <input
                                                            name="46"
                                                            placeholder="Score"
                                                            onBlur={(e) => setCurrentValue('finals', winners['semifinals-46'].name, e.target.value, 47, 'b')}
                                                            type="number"
                                                            min="0"
                                                        />
                                                        {(!forbiddenValues[`47-teamb`] && !!winners['finals-47'] && winners['finals-47'].tab && winners['finals-47'].name === winners['semifinals-46'].name) && <div className="tab-label">T.A.B</div>}
                                                        {forbiddenValues[`47-teamb`] && <div className="tab-label">invalide</div>}
                                                    </div>                                   
                                                </span>
                                            }
                                        {!isFinalDraw && <div className='crown'><span>WINNER</span><img src={require('../../../assets/cup.png')} /></div>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Fin final */}
                    </section>
                </div>
                
            </div>
                                            
            {(displayPopUp && popupTeams) && 
                <div className="infos-popup">
                    <div className="dark-background"></div>
                    <div className="popup-container">
                        <div className="popup-content">Qui remporter la s??ance de tir aux buts?</div>
                        <div className="buttons">
                            {popupTeams.teams.map((team, i) =>
                                <button key={i} onClick={() => setEqualityWinner(team, popupTeams.teams, popupTeams.phase)}>{formatTeamName(team.name)}</button>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default KnockoutStageComponent;
