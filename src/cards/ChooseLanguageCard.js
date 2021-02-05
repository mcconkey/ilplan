import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilState, useRecoilValue } from 'recoil';

import visibilityState from '../atoms/visibilityState';
import progressState from '../atoms/progressState';
import surveyState from '../atoms/surveyState';

const ChooseLanguageCard = ({back, next}) => {

    const progressValue = 10;

    const visible = useRecoilValue(visibilityState).chooseLanguage ? true : false;
    const [progress, setProgress] = useRecoilState(progressState);
    const [survey, setSurvey] = useRecoilState(surveyState);

    const onChangeLanguageHandler = (event) => {

        // Check to see if the survey has property of targetLanguage... if that property  does not exist
        // then give this is the first time a language is being chosen, add the progressValue to the 
        // progress meter. 
        if(!survey.hasOwnProperty("targetLanguage")){
            setProgress(progress + progressValue);
        }
   
        setSurvey({...survey, ...{targetLanguage: event.target.value }});

    } 

    return (
        <React.Fragment>
            <Fade
                left
                opposite
                collapse
                when={visible}
                duration={500}
                delay={0}
            >
                <Card className="SlidingCard" >
                    <Card.Body>
                        <Card.Text>
                            What's your target language?
                            <br />
                            <Form.Control 
                                placeholder="Choose a language..." 
                                type="text" 
                                size="lg" 
                                list="languages" 
                                style={{margin: '1vh', padding: '.5rem'}}
                                onChange={onChangeLanguageHandler} />
                            <datalist id="languages">
                                <option>Russian</option>
                                <option>Spanish</option>
                                <option>Korean</option>
                                <option>Chinese</option>
                            </datalist>
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

export default ChooseLanguageCard;