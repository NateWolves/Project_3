import React, { Component } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import EditTripModal from "../../../modals/EditTripModal";

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
          style={btnStyles}
          onClick={() => this.setState({ modalShow: true })}
        >
          Edit Trip
    		</Button>

        <EditTripModal
          name={this.props.name}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          show={this.state.modalShow}
          onHide={modalClose}
          handleTripEdit={this.props.handleTripEdit}
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

export default EditEventButton;
