import React, {useState} from 'react';
import { Card, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilState, useRecoilValue } from 'recoil';

import visibilityState from '../atoms/visibilityState';
import surveyState from '../atoms/surveyState';
import progressState from '../atoms/progressState';

const ActivitiesModal = ({next, back}) => {

    const visible = useRecoilValue(visibilityState).activities ? true : false;
    const [progress, setProgress] = useRecoilState(progressState);
    const [survey, setSurvey] = useRecoilState(surveyState);
    
    const [currentActivity, setCurrentActivity] = useState("");
    const [modalVisible, setModalVisible] =useState(false);


    return (
        <React.Fragment>
            
        </React.Fragment>
    );

}

export default ActivitiesModal;