import React, { Component } from 'react';
import { ButtonToolbar, Button } from "react-bootstrap";
import Nearby from "../Nearby"

class AddNearbyButton extends Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <ButtonToolbar>
        <Button
          variant="primary"
          style={btnStyles}
          onClick={() => this.setState({ modalShow: true })}
        >
          Nearby
    			</Button>

        <Nearby
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}

const btnStyles = {
  background: "none",
  color: "black",
  border: "1px solid black",
  margin: "5px",
  fontSize: "12px",
  padding: "none",
  lineHeight: "15px"
};

export default AddNearbyButton;
