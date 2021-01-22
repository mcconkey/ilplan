import React, {useState, createRef} from 'react';
import { Card, Button, Badge, FormControl, CardGroup, CardDeck, CardColumns} from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiFillPlusCircle, AiFillCheckCircle} from 'react-icons/ai';

import visibilityState from '../atoms/visibilityState';
import surveyState from '../atoms/surveyState';
import progressState from '../atoms/progressState';

const CompleteCard = ({next, back}) => {

    const visible = useRecoilValue(visibilityState).complete ? true : false;

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
                <div style={{display: 'grid', width: '60vw', gridTemplateColumns: '1fr 1fr 1fr'}}>
                    <Card style={{background: 'white', flex: '1', marginRight: '1rem'}}>
                    <Card.Body>
                        Start over
                        <br />
                            <Button
                                style={{marginTop: '1rem'}}
                                variant="primary"
                            >Start Over</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{background: 'white', flex: '1', marginRight: '1rem', marginLeft: '1rem'}}>
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
                    <Card style={{background: 'white', flex: '1', marginLeft: '1rem', minHeight: '30vh'}}>
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