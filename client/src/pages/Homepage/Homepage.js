import React from 'react';
import { Row, Col, Media, Container} from 'react-bootstrap';
import outlineTimeline from './images/outlineTimeline.png';
import compass from './images/compass.jpg';
import traveller from './images/traveller.jpg';
// import Home from '../../components/Home';

import './Homepage.css';
const styles = {
    root:{
        backgroundImage: `url(${compass})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '622px',
    }
}

function Homepage() {
    return (
        <div id="home" >
            <div className="header">
                <div className="header-wrap">
                    <div className="title-wrap">
                        <div className="img-src" style={styles.root}>
                        </div>
                    </div>
                </div>
                <div className="title">
                    <div className="title-text">
                        <h1>Compass</h1>
                        <h3>Give your plans a sense of direction</h3>
                    </div>
                </div>
            </div>
            <br />
            <Container fluid={true}>
                <Row className="justify-content-md-center">
                    <Col xs lg="6">
                        <Media>
                            <img
                                width={400}
                                height={500}
                                className="contentImg"
                                src={traveller}
                                alt={"traveller"}
                            />
                        </Media>
                    </Col>
                    <Col xs lg="6">
                        <div className="textContainer">
                            <h4>Make planning your next trip easy</h4>
                            <h4>Easily search for top attractions, local eateries, and more!</h4>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row className="timeLine justify-content-md-center">
                    <Col xs lg="6">
                        <div className="textContainer">
                            <h4>Just look up your destination and enter the duration of your stay.</h4>
                            <h4>And Compass will generate a timeline for you to fill in and keep track
                                of your day-to-day activities.</h4>
                        </div>
                    </Col>
                    <Col xs lg="6">
                        <Media>
                            <img
                                width={400}
                                height={500}
                                className="contentImg"
                                src={outlineTimeline}
                                alt={"outlineTimeline"}
                            />
                        </Media>
                    </Col>
                </Row>
                <br/>

            </Container>
                
            

        </div>

    )
}

export default Homepage;