import './pool-tables.scss';

import translate from '../../../assets/nations.json';


const PoolTablesComponent = ({ goNext, data }) => {

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

    return (
        <div style={{overflow: 'scroll', height: '100%'}}>
            <div className="data-pool-container">
                {!!data && 
                    <>
                        {data.map(pool => 
                            <div className="data-pool-content" key={pool.pool}>
                            <div className="pool-header">POULE {pool.pool}</div>
                            <div className="row header">
                                    <span className='cell rank' style={{padding: '10px'}}>RANG</span>
                                    <div className="block">
                                        <span className='cell' style={{width: '150px'}}>EQUIPES</span>
                                        <span className='cell'>V</span>
                                        <span className='cell'>N</span>
                                        <span className='cell'>D</span>
                                        <span className='cell'>P</span>
                                        <span className='cell'>PC</span>
                                        <span className='cell'>+/-</span>
                                        <span className='cell'>EM</span>
                                        <span className='cell'>PB</span>
                                    </div>
                                    <span className='cell score' style={{padding: '10px'}}>POINTS</span>
                                </div>
                                {pool.teams.map((team, i) =>
                                    <div key={i} className={"row " + (i === 0 || i === 1 ? "accent" : '')}>
                                        <span className='cell rank'>{team.PL}</span>
                                        <div className="block">
                                            <span className='cell' style={{width: '150px'}}><span className={`fi fi-${getFlagKey(team.name)}`}></span>{formatTeamName(team.name)}</span>
                                            <span className='cell'>{team.W}</span>
                                            <span className='cell'>{team.D}</span>
                                            <span className='cell'>{team.L}</span>
                                            <span className='cell'>{team.PF}</span>
                                            <span className='cell'>{team.PA}</span>
                                            <span className='cell'>{team.DIFF}</span>
                                            <span className='cell'>{team.TF}</span>
                                            <span className='cell'>{team.BP}</span>
                                        </div>
                                        <span className='cell score'>{team.POINTS}</span>
                                    </div>
                                    
                                )}
                            </div>
                        )}
                    </>
                }
            </div>
            {!!data && <button style={{margin: "15px auto"}} onClick={goNext}>Acceder aux phases finales</button>}
        </div>
    )
};

export default PoolTablesComponent;
