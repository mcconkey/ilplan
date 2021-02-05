import React, {useState, createRef} from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiFillPlusCircle, AiFillCheckCircle} from 'react-icons/ai';

import visibilityState from '../atoms/visibilityState';
import surveyState from '../atoms/surveyState';
import progressState from '../atoms/progressState';

const ActivitiesCard = ({next, back}) => {

    const progressValue = 10;

    const visible = useRecoilValue(visibilityState).activities ? true : false;
    const [progress, setProgress] = useRecoilState(progressState);
    const [survey, setSurvey] = useRecoilState(surveyState);
    
    const [currentActivity, setCurrentActivity] = useState("");
    const [addedProgress, setAddedProgress]  = useState(false);
    const [addActivityVisible, setAddActivityVisible] = useState(false);

    const inputRef = createRef();

    const [activitiesList, setActivitiesList] = useState([
                                "Read a book",
                                "Watch a TV Show",
                                "Study vocabulary",
                                "Study grammar",
                                "Listen to Podcast"]);




    const stringifyFociList = () => {
        if(!survey.foci){
            return 'your focus areas';
        }
        if(survey.foci.length === 1){
            return survey.foci[0];
        }
        let list = survey.foci;
        const last = list.slice(-1);
        return list.slice(0, -1).join(', ') + ' and ' + last;
    }

    console.log(survey.activities);

    const onActivityClickHandler =  (activity) => {

        if(!addedProgress){
            setAddedProgress(true);
            setProgress(progress + progressValue);
        }
        
        if(!isSelectedCheck(activity)){
            // if not selected add it to selected
            setSurvey({...survey, ...{activities: new Array(...new Set([...survey.activities ?? [], activity]))}});
            
        }else{
            // if selected remove it from selected
            setSurvey({...survey, ...{activities: new Array(...survey.activities ?? [] ).filter(item => item !== activity)}});
        }
       
    }
 
    const addActivityHandler = () => {
        //show the form to add a new 
        setAddActivityVisible(true);
    }

    const saveActivityHandler = () => {
        // add the new activity to the array of activities
        setActivitiesList(Array(...new Set([...activitiesList, inputRef.current.textContent ]))); 

        // clear the input
        setCurrentActivity("");
        inputRef.current.textContent = "";

        // set visibility of the input to false
        setAddActivityVisible(false);

    }

    const isSelectedCheck = (activity) => {
        //let selected = new Array(...selectedActivities);
        let selected = new Array(...survey.activities ?? []);
        //console.log(selected);
        return selected.includes(activity);
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
                        What activities are you going to do   
                        <br />
                        in order to improve in {stringifyFociList()} ?        
                            <div class="ActivityBadges"> 
                               <br />
                                {activitiesList && 
                                    activitiesList.map((item, index) => {
                                        return(
                                            <Badge 
                                                key={"i_"+index} 
                                                pill 
                                                as="span"
                                                variant={isSelectedCheck(item) ? 'primary' : 'secondary'} 
                                                cursor="pointer"
                                                style={{display: 'inline-block', cursor: 'pointer', padding: '.5em', margin: '.2em'}}
                                                onClick={() => onActivityClickHandler(item)}  
                                                >{item}</Badge>
                                        );
                                    })
                                }
                                <Badge
                                    pill
                                    variant="dark">
                                    <span
                                    
                                        class="InputSlide"
                                        contentEditable
                                        onInput={(event) => { 
                                            setCurrentActivity(event.currentTarget.textContent);
                                        }}
                                        ref={inputRef}
                                       
                                        textContent={currentActivity}
                                        style={{
                                                borderBottom: '1px solid white', 
                                                overflow: 'hidden',
                                                textOverflow: 'clip',
                                                verticalAlign: 'middle',
                                                fontSize: '1em',
                                                width: addActivityVisible ? 'fit-content': '0px',
                                                minWidth: addActivityVisible ? '20vw' : '0px',
                                                display: 'inline-block',
                                        }}
                                        />
                                    <AiFillCheckCircle 
                                        style={{display: addActivityVisible ? 'inline-block' : 'none'}}
                                        onClick={saveActivityHandler}
                                        cursor="pointer" 
                                        size='1.5em' />  
                                    <AiFillPlusCircle 
                                        style={{display: !addActivityVisible ? 'inline-block' : 'none'}}
                                        onClick={addActivityHandler}
                                        cursor="pointer" 
                                        size='1.5em' />     
                                </Badge>
                                
                            </div>
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

export default ActivitiesCard;