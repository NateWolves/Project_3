import React, {Component} from 'react';
import { Row, Col, Image, Container} from 'react-bootstrap';
import {Parallax} from 'react-parallax';
import Anime from 'react-anime';
import Home from './Home';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import compass from './images/compass.jpg';
import Day1 from './images/Day1.png';
import traveller from './images/traveller.jpg';
import map from './images/map.jpg';
import sky from './images/sky.jpg';

import './Homepage.css';


class Homepage extends Component{
render(){
    let animeFade={
        opacity: [0,1],
        translateZ: 0,
        easing: "easeInOutSine",
        duration: 2050,
    };
    return (
        <Container fluid={true} id="top" className="mainContainer">
            <Parallax bgImage={compass} strength={800}>
                <Anime {...animeFade}>
                    <div style={{height: 500}} className="titleWrap">
                        <Navbar/>
                        <div className="title-text">
                            <h1 className="hdrText">Compass</h1>
                            <h3 className="subText">Give your plans a sense of direction</h3>
                            <br/>
                            <Home/>
                        </div>
                    </div>
                </Anime>
            </Parallax>
            <br/>
            <br/>
            <Row className="contentRow justify-content-md-center" style={{minHeight: 850}}>
                <Col xs={12} md={6} className="contentCol">
                    <Image className="contentImg" src={traveller} fluid/>
                </Col>
                <Col xs={12} md={6} className="contentCol">
                    <div className="textContainer">
                        <h1 className="subText">Plan</h1>
                        <h4 className="contentText">Make planning your next trip easier.</h4>
                        <h4 className="contentText">Search for top attractions, local eateries, and more!</h4>
                    </div>
                </Col>
            </Row>
            <br/>
            <Parallax bgImage={sky} strength={800}>
                <div style={{height:500}}></div>
            </Parallax>
            <br/>
            <Row className="contentRow justify-content-md-center" style={{minHeight: 850}}>
                <Col xs={12} md={6} className="contentCol">
                    <div className="textContainer">
                        <h1 className="subText">Organize</h1>
                        <h4 className="contentText">Just look up your destination and enter the duration of your stay.</h4>
                        <h4 className="contentText">And Compass will generate a timeline for you to fill in and keep track
                            of your day-to-day activities.</h4>
                    </div>
                </Col>
                <Col xs={12} md={6} className="contentCol">
                    <Image className="contentImg" src={Day1} fluid/>
                </Col>
            </Row>
            <br/>
            <Parallax bgImage={map} strength={800}>
                <div style={{height: 500}}>
                </div>
            </Parallax>
            <Row className="contentRow justify-content-md-center">
                <Col xs={12} md={12} className="contentCol">
                    <Footer/>
                </Col>
            </Row>
        </Container>
    )
    }
}

export default Homepage;