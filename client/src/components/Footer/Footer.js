import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './Footer.css';

function Footer(){
    return(
        <Container className="footerContainer" fluid={true}>
            <Row className="contentRow">
                <Col xs={12} md={12} className="contentCol">
                    <p className="copyRight">© 2019 Copyright: Compass</p>
                </Col>
            </Row>
            <br/>
        </Container>
    );
}

export default Footer;