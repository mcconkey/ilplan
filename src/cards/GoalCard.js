import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilState, useRecoilValue } from 'recoil';

import visibilityState from '../atoms/visibilityState';
import progressState from '../atoms/progressState';
import surveyState from '../atoms/surveyState';

const GoalCard = ({next, back}) => {

    const progressValue =  15;


    const visible = useRecoilValue(visibilityState).goals ? true : false;
    const [progress, setProgress] = useRecoilState(progressState);
    const [survey, setSurvey] = useRecoilState(surveyState);
    

    const onChangeGoalHandler = (event) => {
        if(!survey.hasOwnProperty("goal")){
            setProgress(progress + progressValue);
        }
        setSurvey({...survey, ...{goal: event.target.value}});
    };


    return (
        <React.Fragment>
            <Fade 
                left 
                opposite 
                collapse 
                when={visible} 
                duration={500} 
                delay={0} 
                delayOut={0}>
                <Card className="SlidingCard">
                    <Card.Body>
                        <Card.Text>
                        What are your language goals?
                        <Form.Control 
                                placeholder="Select a goal or create your own..." 
                                type="text" 
                                size="lg" 
                                list="goals" 
                                style={{margin: '1vh', padding: '.5rem'}}
                                onChange={onChangeGoalHandler} />
                            <datalist id="goals">
                                <option>Improve my language scores</option>
                                <option>Maintain my language scores</option>
                                <option>Become more proficient with my current mission</option>
                                <option>Engage more with my target language</option>
                            </datalist>
                        </Card.Text>
                        <Button 
                            variant="light" 
                            onClick={back} >
                            Back
                        </Button>
                        {' '}
                        <Button 
                            variant="light" 
                            onClick={next} >
                            Next
                        </Button>
                    </Card.Body>
                </Card>
            </Fade>
        </React.Fragment>
    );

}

export default GoalCard;