import React, {useState} from 'react';
import { Card, Button, Badge, FormControl, CardGroup, CardDeck, CardColumns} from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


import visibilityState from '../atoms/visibilityState';
import progressState from '../atoms/progressState';
import surveyState from '../atoms/surveyState';

import ILTP from '../ILTP';

function ILTPCard({back, next}) {

    const visible = useRecoilValue(visibilityState).ILTP? true : false;
    const setProgress = useSetRecoilState(progressState);
    const [survey, setSurvey] = useRecoilState(surveyState);

    return (
        <React.Fragment>
            <Fade
                top
                opposite
                collapse
                when={visible}
                duration={500}
                delay={0}
            >
                <Card style={{ width: '40rem' }}>
                    <Card.Body>
                        <Card.Title>Individualized Training Plan</Card.Title>
                        <Card.Text>
                            <ILTP />
                        </Card.Text>
                        <Button
                            variant="light"
                            onClick={back}>
                            Back
                        </Button>
                        {' '}
                        <Button
                            variant="light"
                            onClick={next}>
                            Next
                        </Button>
                    </Card.Body>
                </Card>
            </Fade>
        </React.Fragment>
    );


}

export default ILTPCard;