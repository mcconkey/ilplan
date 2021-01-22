import reactReveal from "react-reveal";
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import surveyState from './atoms/surveyState';


const Language = ({language = "Not Specified"}) => {

    return (
        <React.Fragment>
            Target Language: {language} <br />
        </React.Fragment>
    );
};

const Scores = ({listening = "N/A", reading = "N/A"}) => {
    

    return (
        <React.Fragment>
            Reading: {reading} <br />
            Listening: {listening} <br />
        </React.Fragment>
    );

};


const Goal = ({goal}) => {

    return (
        <React.Fragment>
            <div>Your goal: {goal}</div>
        </React.Fragment>
    );

};

const Why = ({why}) => {
    return (
        <React.Fragment>
            <div>Your reason for wanting to achieve your goal: {why}</div>
        </React.Fragment>
    );
};
const Foci = ({foci}) => {
    console.log(foci);
    if(foci && foci.length){
        return (
            <React.Fragment>
                <div>
                    You identified the following areas which you wanted to focus on 
                    in order to achieve your goal. 
                    {foci && foci.map((item, index) => { 
                        return(
                            <div key={"foci_"+index}>{item}</div>
                        );
                    })}
                </div>
            </React.Fragment>
        );
    }else{
        return <></>;
    }

};

const Activities = ({activities}) => {
    console.log(activities);
    if(activities && Object.keys(activities).length){
        return (
            <React.Fragment>
                <div>
                    You identified the following activities:
                    {activities &&  Object.entries(activities).map((item, index) => {
                        console.log(item);
                        return (<div>{item[0]} which you will do {item[1]}</div>);
                        
                    })}

                </div>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
                <div>You did not name any activities. Achieving your goal will take work! What will you
                    do to achieve it? 
                </div>
            </React.Fragment>

        );
    }
};

const Mentors = ({mentors}) => {
    if(mentors && mentors.length){
        return (
            <React.Fragment>
                <div>
                    You identified the following mentors:
                    {mentors && mentors.map((item, index) => { 
                        return(
                            <div key={"mentors_"+index}>{item.name}</div>
                        );
                    })}

                </div>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
                <div>You did not identify any mentors.  Consider adding one or more mentors in order to help you
                    stay on track!
                </div>
            </React.Fragment>

        );
    }

};



function ILTP() {

    const survey = useRecoilValue(surveyState);

    return (
        <React.Fragment>
            <div style={{fontSize: '1rem', textAlign: 'left'}}>
                <Language language={survey.targetLanguage} />
                <Scores reading={survey.readingScore} listening={survey.listeningScore} />
                <Goal goal={survey.goal} />
                <Why why={survey.why} />
                <Foci foci={survey.loci} />
                <Activities activities={survey.activitiesFrequencies} />
                <Mentors mentors={survey.mentors} />
            </div>
        </React.Fragment>
    );
}

export default ILTP;