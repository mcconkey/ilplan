import './App.css';
import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import { Fade } from 'react-reveal';

import { AiOutlineFileText, AiFillCloseCircle } from 'react-icons/ai';

import { useRecoilState, useRecoilValue } from 'recoil';

import ChooseLanguageCard from './cards/ChooseLanguageCard';
import PreviousScoresCard from './cards/PreviousScoresCard';
import GoalCard from './cards/GoalCard';
import WhyCard from './cards/WhyCard';
import FocusCard from './cards/FocusCard';
import ActivitiesCard from './cards/ActivitiesCard';
import FrequencyCard from './cards/FrequencyCard';
import WhoCard from './cards/WhoCard';



import visibilityState from './atoms/visibilityState';
import progressState from './atoms/progressState';
import surveyState from './atoms/surveyState';
import CompleteCard from './cards/CompleteCard';
import ILTPCard from './cards/ILTPCard';

function App() {

    const [isVisible, setVisibilityState] = useRecoilState(visibilityState);
    const progress = useRecoilValue(progressState);
    const survey = useRecoilValue(surveyState);

    let vis = { ...isVisible };

    const hideCard = (name = "") => {
        console.log("hiding..." + name);
        vis[name] = false;
        setVisibilityState(vis);
        return Promise.resolve();
    };

    const showCard = async (name = "") => {
        console.log("showing... " + name);
        let visible = { ...vis };
        visible[name] = true;
        setVisibilityState(visible);
        return Promise.resolve(visible);
    };

    const hideThenShow = (hide, show) => {

        console.log("show hide called");

        console.log(isVisible);
        hideCard(hide).then(
            setTimeout(() => { showCard(show).then(console.log(isVisible)); }, 1000)
        );
    }

    return (
        <div class="App" style={{ overflow: 'hidden', 
                                  backgroundImage: "url(/monterey_trail.jpeg)",
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",  }}>
            <div className="Header">
                <p>ILTP-Helper</p>
                <ProgressBar now={progress} label={`${progress}%`} />
            </div>
            <div className="Content">
                <div className="Cards">
                    <Fade left collapse opposite when={isVisible.intro} duration={500} delay={200} >
                        <Card className="SlidingCard">
                            <Card.Body>
                                <Card.Title>Welcome!</Card.Title>
                                <Card.Text>
                                    This app is designed to make it easier for linguists to develop an
                                    Individualized Language Training Plan.  This program will ask you a series of
                                    questions which will help you focus on achieving your Language learning goals.
                             </Card.Text>
                                <Button
                                    variant="light"
                                    onClick={() => {

                                        hideThenShow("intro", "chooseLanguage");
                                    }}>
                                    Get Started
                                </Button>
                            </Card.Body>
                        </Card>
                    </Fade>
                    <ChooseLanguageCard
                        back={() => { hideThenShow("chooseLanguage", "intro"); }}
                        next={() => { hideThenShow("chooseLanguage", "previousScores"); }}
                    />
                    <PreviousScoresCard
                        back={() => { hideThenShow("previousScores", "chooseLanguage"); }}
                        next={() => { hideThenShow("previousScores", "goals"); }}
                    />
                    <GoalCard
                        back={() => { hideThenShow("goals", "previousScores"); }}
                        next={() => { hideThenShow("goals", "why"); }}
                    />
                    <WhyCard
                        back={() => { hideThenShow("why", "goals"); }}
                        next={() => { hideThenShow("why", "focus"); }}
                    />
                    <FocusCard
                        back={() => { hideThenShow("focus", "why"); }}
                        next={() => { hideThenShow("focus", "activities"); }}
                    />
                    <ActivitiesCard
                        back={() => { hideThenShow("activities", "focus"); }}
                        next={() => { hideThenShow("activities", "frequency"); }}
                    />
                    <FrequencyCard
                        back={() => { hideThenShow("frequency", "activities"); }}
                        next={() => { hideThenShow("frequency", "who"); }}
                    />
                    <WhoCard
                        back={() => { hideThenShow("who", "frequency"); }}
                        next={() => { hideThenShow("who", "complete"); }}
                    />
                    <CompleteCard
                        back={() => { hideThenShow("complete", "who"); }}
                        next={() => { hideThenShow("complete", "ILTP"); }}
                        start={() => {hideThenShow("complete", "intro")}}
                    />
                    <ILTPCard
                        back={() => { hideThenShow("ILTP", "complete"); }}
                        next={() => { hideThenShow("ILTP", "intro")}}
                    />
                </div>
            </div>
            <div class="Footer">
                <p>ILTP-Helper Copyright 2020</p>
            </div>
            <div class="BottomRightMenu">
                <AiOutlineFileText cursor="pointer" size='2em' onClick={() => showCard("menuOverlay")} />
            </div>
            {/* <div className={isVisible.menuOverlay ? 'visible sideMenu' : 'sideMenu'}> */}
            <div className={isVisible.menuOverlay ? 'sideMenuVisible sideMenu' : 'sideMenu'} onClick={() => hideCard("menuOverlay")} />
            <div className={isVisible.menuOverlay ? 'glassOverlayVisible GlassOverlay' : 'GlassOverlay'} >
                <div className="GlassOverlayBottom" >
                    <AiFillCloseCircle cursor="pointer" size='1.5em' onClick={() => hideCard("menuOverlay")} />
                </div>

                <div class="OverlayContent">Learner Survey <div style={{ textAlign: "left", padding: '2em' }}>
                    <pre style={{ fontSize: '.5em', color: 'white' }}>{JSON.stringify(survey, null, 3)}</pre>
                </div>

            </div>
            


        </div>
        </div>
    );
}

export default App;
