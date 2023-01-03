import './main.scss';

import { useState, useEffect } from 'react';

import PoolTablesComponent from './core/pool-tables/pool-tables';
import HomeComponent from './core/home/home';
import KnockoutStageComponent from './core/knockout-stage/knockout-stage';
import ForecastComponent from './core/forecast/forecast';
import { usePostForecasts } from '../services/postForecastsApi';
// import HeaderComponent from './common/header/header';

const MainComponent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [{ tableData, isTableDataLoading }, postForecasts] = usePostForecasts();
    const [isLoading, setIsLoading] = useState(false);

    const goNextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const getResultsForecasts = (data) => {
        postForecasts({data: data});
        goNextStep();
    }

    useEffect(() => {
        setIsLoading(isTableDataLoading);
    }, [isTableDataLoading])

    // const goPreviousStep = () => {
    //     setCurrentStep(currentStep - 1)
    // }

    return (
        <div>
            {/* <HeaderComponent></HeaderComponent> */}
            {/* <button onClick={goPreviousStep}>Previous</button> */}
            <div className={"main-container " + (currentStep === 2 ? 'no-border' : '')}>
                {isLoading &&
                    <div>LOADING</div>
                }
                {currentStep === 0 && <>
                    <HomeComponent goNext={goNextStep}></HomeComponent>
                </>}

                {currentStep === 1 && <>
                    <ForecastComponent setLoader={setIsLoading} goNext={getResultsForecasts}></ForecastComponent>
                </>}

                {currentStep === 2 && <>
                    <PoolTablesComponent data={tableData} goNext={goNextStep}></PoolTablesComponent>
                </>}

                {currentStep === 3 && <>
                    <KnockoutStageComponent setLoader={setIsLoading}></KnockoutStageComponent>
                </>}
            </div>
        </div>
    )
};

export default MainComponent;
