import React, { useState } from 'react';
import { Card, Button, Form, FormGroup, Row, Col, Badge } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GiGraduateCap, GiWhip } from 'react-icons/gi';
import { FaHandsHelping } from 'react-icons/fa'

import visibilityState from '../atoms/visibilityState';
import progressState from '../atoms/progressState';
import surveyState from '../atoms/surveyState';

const WhoCard = ({next, back}) => {

    const progressValue = 10;

    const visible = useRecoilValue(visibilityState).who ? true : false;
    const [progress, setProgress] = useRecoilState(progressState);
    const [survey, setSurvey] = useRecoilState(surveyState);
    const [currentMentor, setCurrentMentor] = useState("");
    const [currentMentorType, setCurrentMentorType] = useState("Mentor");


    const addMentor = () => {

        // if there is no mentors property in the survey
        // then this is the first mentor being added and 
        // the progress bar should be updated
        if(!survey.hasOwnProperty("mentors")){
            setProgress(progress + progressValue);
        }

        let tempMentorsObj = survey.mentors ? [...survey.mentors] : [];
        let tempMentorObj = {
            name: currentMentor,
            type: currentMentorType,
        };
        //tempMentorsObj[currentMentor] = currentMentorType;
        tempMentorsObj.push(tempMentorObj);
        setSurvey({...survey, ...{mentors: tempMentorsObj}});
    }

    const Mentors = () => {
        return (
            <React.Fragment>
                {survey.mentors &&
                    survey.mentors.map((mentor, index) => {
                      return (  
                        <Badge 
                            pill 
                            variant="primary"
                            as="span"
                            key={"m_"+index}
                            style={{padding: '.5em', margin: '.2em'}}>
                                {mentor.type === "Mentor" && <FaHandsHelping />  }
                                {mentor.type === "Task-Master" && <GiWhip /> }
                                {mentor.type === "Language Expert" && <GiGraduateCap /> } 
                                {' '}{mentor.name}{' '}
                                <AiFillCloseCircle cursor="pointer" onClick={() => {removeMentor(mentor.name)}}  />
                        </Badge>
                        );
                    })    
                }
            </React.Fragment>
        );
    }

    const removeMentor = (name) => {
        
        let tempMentorsObj = [...survey.mentors].filter(item => item.name !== name) ?? [];

        setSurvey({...survey, ...{mentors: tempMentorsObj}});
        

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
                delayOut={0}>
                <Card className="SlidingCard">
                    <Card.Body>
                        <Card.Text>
                        Who can you rely on to help mentor you?  To help you stick to your goals?
                            <br />
                            <Mentors />
                            <FormGroup as={Row} style={{ width: '80wv', marginTop: '.5em', marginBottom: '.5em',}} >
                                <Col xs={12} sm={7} style={{marginTop: '.5em', paddingRight: '5px', paddingLeft:'5px'}} >
                                    <Form.Control 
                                        type="text"
                                        placeholder="Who will help you?"
                                        value={currentMentor}
                                        onChange={(event) => { 
                                            setCurrentMentor(event.target.value);
                                            console.log(event.target.value);
                                        }}
                                    />
                                </Col>                
                                <Col xs={12} sm={5} style={{marginTop: '.5em', paddingRight: '5px', paddingLeft:'5px'}}>
                                <Form.Control 
                                    as="select"
                                    onChange={(event) => setCurrentMentorType(event.target.value)}
                                    value={currentMentorType ?? "Mentor"}
                                                        
                                >
                                    <option>Mentor</option>
                                    <option>Task-Master</option>
                                    <option>Language Expert</option>
                                </Form.Control>
                                </Col>
                                <Col xs={12} style={{marginTop: '.5em', paddingRight: '5px', paddingLeft:'5px'}}>
                                    <Button
                                        onClick={addMentor} 
                                        variant='primary' 
                                        >Add</Button>
                                </Col>
                            </FormGroup>             
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

export default WhoCard;