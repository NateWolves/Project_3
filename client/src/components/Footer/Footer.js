import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './Footer.css';

function Footer(){
    return(
        <Container id="footer" fluid={true}>
        <Container className="footerContainer" fluid={true}>
            <Row className="contentRow">
                <Col/>
                <Col md="3" className="text-center text-md-left">
                    <p className="heading">
                       Helpful Links 
                    </p>
                    <ul className="footerList">
                        <li><a href="google.com">Google</a></li>
                    </ul>
                </Col>
                <Col md="3" className="text-center text-md-left">
                    <p className="heading">
                        Company
                    </p>
                    <ul className="footerList">
                        <li>About</li>
                        <li>The Team</li>
                    </ul>
                </Col>
                <Col md="3" className="text-center text-md-left">
                    <p className="heading">
                        Company
                    </p>
                    <ul className="footerList">
                        <li>About</li>
                        <li>The Team</li>
                    </ul>
                </Col>
            </Row>
            <br/>
            <Row className="contentRow">
                <Col>
                    <p className="copyRight">© 2019 Copyright: Compass</p>
                </Col>
            </Row>
        </Container>
        </Container>

    )
}

export default Footer;