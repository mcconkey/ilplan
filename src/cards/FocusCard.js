import React, { useState } from 'react';
import { Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiFillCloseCircle} from 'react-icons/ai';

import visibilityState from '../atoms/visibilityState';
import progressState from '../atoms/progressState';
import surveyState from '../atoms/surveyState';

const FocusCard = ({next, back}) => {

    const progressValue = 10;

    const visible = useRecoilValue(visibilityState).focus ? true : false;
    const [progress, setProgress] = useRecoilState(progressState);
    const [survey, setSurvey] = useRecoilState(surveyState);
    const [currentFocus, setCurrentFocus] = useState("");

    
    
    const addFocusHandler = () => {
        let fociList = [];

        if(!survey.foci){
            setProgress(progress + progressValue);
        }

        if(survey.foci){
            fociList.push(...survey.foci);
        }

        if(!fociList.includes(currentFocus)){
            fociList.push(currentFocus);
        }
        
        setSurvey({...survey, ...{foci: fociList}})
        setCurrentFocus("");
    }

    const onChangeHandler = (event) => {
        setCurrentFocus(event.target.value);
    }

    const removeFocus = (focus = "") => {
        let newFoci = survey.foci.filter(item => item !== focus);
        setSurvey({...survey, ...{foci: newFoci}});    
    }

    const Badges =  () => {

        if(!survey.foci){
            return <></>;
        }

        if(survey.foci){
            let badges = survey.foci.map((focus, index) => { 
                return ( 
                    <Badge key={"g_"+index} pill variant="primary" style={{padding: '.5em', margin: '.2em'}}>
                        {focus} {' '}
                        <AiFillCloseCircle cursor="pointer" onClick={() => removeFocus(focus)} />
                    </Badge>
                );  
                
            });
            return badges;
        }


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
                        What aspects of { survey.targetLanguage ?? 'your target language' } do you
                        plan to focus on? 
                        <InputGroup className="mb-3">
                            <Form.Control 
                                placeholder="Focus..." 
                                type="text"
                                value={currentFocus}    
                                size="lg"                             
                                list="foci" 
                                style={{ padding: '.5rem'}}
                                onChange={onChangeHandler}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={ addFocusHandler }>Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                            <datalist id="foci">
                                <option>Reading</option>
                                <option>Listening</option>
                                <option>Vocabulary</option>
                                <option>Transcription</option>
                                <option>Real-Time Translation</option>
                                <option>Authentic Material Interpretation</option>
                                <option>Test Taking Skills</option>
                            </datalist>
                        </Card.Text>
                        <Badges />
                        <br />
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

export default FocusCard;