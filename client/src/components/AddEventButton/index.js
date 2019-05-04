import React, { Component } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import AddEventModal from "../AddEventModal";

class AddEventButton extends Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }

  render() {
    console.log(this.props)
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <ButtonToolbar>
        <Button
          variant="primary"
          style={styles}
          onClick={() => this.setState({ modalShow: true })}
        >
          Add Event
    		</Button>

        <AddEventModal
          show={this.state.modalShow}
          onHide={modalClose}
          tripId={this.props.tripId}
          handleEventAdd={this.props.handleEventAdd}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
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

export default AddEventButton;
