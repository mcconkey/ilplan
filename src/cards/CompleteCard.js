import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import visibilityState from '../atoms/visibilityState';
import surveyState from '../atoms/surveyState';
import progressState from '../atoms/progressState';

const CompleteCard = ({next, back, start}) => {

    const visible = useRecoilValue(visibilityState).complete ? true : false;

    const setSurvey = useSetRecoilState(surveyState);
    const setProgress = useSetRecoilState(progressState);

    const startOver = () => {
        // set the progress state to nothing
        setSurvey({});

        // set progress to zero
        setProgress(0);

        // return to the intro screen
        start();
    }

    return (
        <React.Fragment>
            <Fade 
                bottom
                cascade 
                collapse 
                when={visible} 
                duration={500} 
                delay={0} 
                delayOut={0}
                >
                <div style={{display: 'grid', width: '80vw', gridTemplateColumns:  'repeat(auto-fit, minmax(300px, 1fr))'}}>
                    <Card className="SmallCard">
                    <Card.Body>
                        Start over
                        <br />
                            <Button
                                style={{marginTop: '1rem'}}
                                variant="primary"
                                onClick={startOver}
                            >Start Over</Button>
                        </Card.Body>
                    </Card>
                    <Card className="SmallCard">
                        <Card.Body>
                        Go back, maybe change some answers
                        <br />
                            <Button
                                style={{marginTop: '1rem'}}
                                variant="primary"
                                onClick={back}
                            >Back</Button>
                        </Card.Body>
                    </Card>
                    <Card className="SmallCard">
                        <Card.Body>
                            Get learning plan based on your answers
                            <br />
                            <Button
                                style={{marginTop: '1rem'}}
                                variant="primary"
                                onClick={next}
                            >Get ILTP</Button>
                        </Card.Body>
                    </Card>

                </div>


                  
            </Fade>
        </React.Fragment>
    );

}

export default CompleteCard;