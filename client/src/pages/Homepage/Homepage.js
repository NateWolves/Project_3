import React from 'react';
import { Row, Col, Image, Container} from 'react-bootstrap';
import outlineTimeline from './images/outlineTimeline.png';
import compass from './images/compass.jpg';
import traveller from './images/traveller.jpg';
import Home from './Home';
import { Parallax } from 'react-scroll-parallax';

import './Homepage.css';

const styles = {
    header:{
        backgroundImage: `url(${compass})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '622px',
    },
    copy:{
        margin: '0.2em 0',
        textAlign: 'center',
    },
    letter:{
        display:'inline-block',
    }
}
const copy='Compass'.split('');

function Homepage() {
    return (
    <Container id="home" fluid={true}>
           <div className="header">
                <div className="header-wrap">
                    <div className="title-wrap">
                        <div className="img-src" style={styles.header}>
                        </div>

                    </div>
                </div>
                <div className="title">
                    <div className="title-text">
                        <h1 className="hdrText">Compass</h1>
                        <h3 className="subText">Give your plans a sense of direction</h3>
                        <br/>
                        <Home/>
                    </div>
                </div>
            </div>
            <br />
            <Container fluid={true}> 
                <Row className="contentRow justify-content-md-center">
                    <Col xs={12} md={6} className="contentCol">
                    <Parallax className="title-wrap" x={[-15, 15]} tagOuter="figure">
                        <Image className="contentImg" src={traveller} fluid/>
                    </Parallax>
                    </Col>
                    <Col xs={12} md={6} className="contentCol">
                        <div className="textContainer">
                            <h4 className="contentText">Make planning your next trip easier.</h4>
                            <h4 className="contentText">Search for top attractions, local eateries, and more!</h4>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row className="timeLine contentRow justify-content-md-center">
                    <Col xs={12} md={6} className="contentCol">
                        <div className="textContainer">
                            <h4 className="contentText">Just look up your destination and enter the duration of your stay.</h4>
                            <h4 className="contentText">And Compass will generate a timeline for you to fill in and keep track
                                of your day-to-day activities.</h4>
                        </div>
                    </Col>
                    <Col xs={12} md={6}className="contentCol">
                        <Parallax className="title-wrap" x={[15, -15]} tagOuter="figure">
                            <Image className="contentImg" src={outlineTimeline} fluid/>
                        </Parallax>
                    </Col>
                </Row>
            </Container>
        </Container> 
    )
}

export default Homepage;