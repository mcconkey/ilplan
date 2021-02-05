
/* 
* Helper function(s) which parse through a survey object and
* returns a string -- the formatted ILTP
*/


const getILTP = (survey = {}) => {

    const language = (language = "Not Specified") => {

        return (
`TARGET LANGUAGE: ${language}
`
        );
    };

    const scores = ({listening = "N/A", reading = "N/A"}) => {
        

        return (
`READING: ${reading} 
LISTENING: ${listening} 
`
        );

    };

    const goal = (goal) => {

        return (
`YOUR GOAL: ${goal}
`
        );

    };

    const why = (why) => {
        if(why){
        return(
`WHY THIS GOAL IS IMPORTANT: ${why}
`
        );
        }else{
            return "";
        }
            
    };
    const foci = (foci) => {
        let retString = "";

        if(foci && foci.length){

            retString = "LANGUAGE AREA(S) OF FOCUS:";
            foci.map((item) => { 
                retString = retString + '\n\t' + item;
                return true;
            });

        }
        return retString;
    };

    const activities = (activities) => {

        let retString = ""; 

        if(activities && Object.keys(activities).length){
                       
            retString = "LANGUAGE ACTIVITIES AND FREQUENCY:"
                Object.entries(activities).map((item) => {
                    retString = `${retString} ${'\n\t'} ${item[0]} (${item[1]})`;
                    return true;
                });

              
        }

        return retString;
    };

    const mentors = (mentors) => {
        
        let retString = "";

        if(mentors && mentors.length){
            retString = "MENTOR(S):";
            mentors.map((item) => { 
                retString = `${retString} \n\t ${item.name} (${item.type})`;
                return true;
            })
        }

        return retString;
    };


    const ILTPText = 
`${language(survey.targetLanguage)}
${scores({reading: survey.readingScore, listening: survey.listeningScore})}
${goal(survey.goal)}
${why(survey.why)}
${foci(survey.foci)}

${activities(survey.activitiesFrequencies)}

${mentors(survey.mentors)}
`;

    return ILTPText;

}

export default getILTP;