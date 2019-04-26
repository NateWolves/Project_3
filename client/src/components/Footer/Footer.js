import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './Footer.css';

function Footer(){
    return(
        <Container className="footerContainer" fluid={true}>
            <Row>
                <Col md="3">
                </Col>
                <Col md="3">
                    <p className="heading">
                       Helpful Links 
                    </p>
                    <ul className="footerList">
                        <li><a href="google.com">Google</a></li>
                        <li><a href="google.com">Google</a></li>
                        <li><a href="google.com">Google</a></li>
                        <li><a href="google.com">Google</a></li>
                    </ul>
                </Col>
                <Col md="3">
                    <p className="heading">
                        Company
                    </p>
                    <ul className="footerList">
                        <li>About</li>
                        <li>The Team</li>

                    </ul>
                </Col>
                <Col md="3">
                    <p className="heading">
                        Company
                    </p>
                    <ul className="footerList">
                        <li>About</li>
                        <li>The Team</li>

                    </ul>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <p className="copyRight">© 2019 Copyright: Compass</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;