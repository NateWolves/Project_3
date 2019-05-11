import React, { Component } from 'react';
import { ButtonToolbar, Button } from "react-bootstrap";
import Search from "../../../modals/SearchModal"

class AddSearchButton extends Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }


  componentDidMount() {
    console.log(this.props)
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
          Search
    			</Button>

        <Search
          show={this.state.modalShow}
          onHide={modalClose}
          tripid={this.props.tripId}
          triplocation={this.props.tripLocation}
          startdate={this.props.startDate}
        />
      </ButtonToolbar>
    );
  }
}

const btnStyles = { 
    background: "none",
    color: "black",
    border: "1px solid black",
    margin: "5px"
  };

export default AddSearchButton;