import './home.scss';


const HomeComponent = ({ goNext }) => {
    return (
        <>
            <div className="home-page">
                <div className="title">Bienvenue sur mon application de pronostics pour la coupe du monde de rugby 2023.</div>
                <button onClick={goNext}>Commencer les pronostics</button>
            </div>
        </>
    )
};

export default HomeComponent
;
