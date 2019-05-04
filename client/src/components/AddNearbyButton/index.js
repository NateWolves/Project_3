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
          style={styles}
          onClick={() => this.setState({ modalShow: true })}
        >
          Search Nearby
    			</Button>

        <Nearby
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}

const styles = {   
  background: "none",
  color: "black",
  border: "1px solid black",
  margin: "5px"
};

export default AddNearbyButton;
