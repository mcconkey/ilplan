import React, { useRef, useState } from 'react';
import { Card, Button, Form, Row, Col, Badge, Toast } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useRecoilValue } from 'recoil';
import { AiOutlineFilePdf } from 'react-icons/ai';


import visibilityState from '../atoms/visibilityState';
import surveyState from '../atoms/surveyState';


import getILTP from '../ILTP';



function ILTPCard({back, next}) {

   

    const ILTPElement = useRef(null);
    const survey = useRecoilValue(surveyState);
    const [showCopiedSuccess, setShowCopiedSuccess] = useState(false);
    


    const copyToClipboard = () => {

        //ILTPText.current.select();
        console.log(ILTPElement.current.innerHTML);
        // document.execCommand('copy');

        //navigator.clipboard.writeText("Something");

        navigator.clipboard.writeText(ILTPElement.current.innerHTML).then(function() {
            /* clipboard successfully set */
            console.log("great success");
            setShowCopiedSuccess(true);
          }, function() {
              
            /* clipboard write failed */
            console.log("oh noes");
          });
    };

    const visible = useRecoilValue(visibilityState).ILTP? true : false;

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
                <Card className="SlidingCard">
                    <Card.Body>
                        <Card.Title>Individualized Training Plan</Card.Title>
                        <Row noGutters>
                            <Col sm={10}>
                                <Form.Control 
                                as="textarea"
                                value={getILTP(survey)}
                                ref={ILTPElement}
                                rows={10}
                                sty                            
                              />
                            </Col>
                            <Col style={{fontSize: '.7em'}}>
                                <a href="af623a_clean.pdf" target="_blank">
                                <AiOutlineFilePdf cursor="pointer" size='2em'  /><br />
                                <Badge variant="primary" >623A</Badge>
                                </a>
                            </Col>
                        </Row>


                         
                        <Button
                            variant="light"
                            onClick={back}>
                            Back
                        </Button>
                        {' '}
                        <Button
                            variant="light"
                            onClick={copyToClipboard}>
                            Copy to Clipboard
                        </Button>
                        <Toast 
                            onClose={() => setShowCopiedSuccess(false)}
                            show={showCopiedSuccess}
                            delay={1000}
                            autohide
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '50%',
                              }}>
                            <Toast.Body>Copied!</Toast.Body>
                        </Toast>
                    </Card.Body>
                </Card>
            </Fade>
        </React.Fragment>
    );


}

export default ILTPCard;