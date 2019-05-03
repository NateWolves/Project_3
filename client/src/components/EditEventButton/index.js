import React, { Component } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import AddEventModal from "../AddEventModal";

class EditEventButton extends Component {
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
          Edit Event
    		</Button>

        <AddEventModal
          name={this.props.name}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          type={this.props.type}
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

export default EditEventButton;
