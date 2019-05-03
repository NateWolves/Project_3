import React, { Component, Fragment } from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap"
import Plan from "../../components/Plan";

import API from "../../utils/api";

class Trips extends Component {
  state = {
    modalShow: false,
    trips: [],
    userId: ""
  };

  handleAddTripClick = () => {
    this.setState({ 
      modalShow: true 
    });
  };

  handleSubmitTrip = tripObj => {
    this.setState({
      trips: [tripObj, ...this.state.trips],
      modalShow: false
    });
    API.createTrip(tripObj);
  };

  handleDeleteTrip = id => {
    this.setState({
      trips: this.state.trips.filter(trip => trip._id !== id)
    });
    API.deleteTrip(id);
  };

  modalClose = () => {
    this.setState({ 
      modalShow: false 
    });
  };

  componentDidMount() {
    API.findUser("testUser")
      .then(res => {
        this.setState({
          userId: res.data._id
        });
      })
      .catch(err => console.log(err));

    API.findTripsByUser("testUser")
      .then(res => {
        this.setState({
          trips: res.data.trips
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Fragment>
        <Container>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <h1>My Trips</h1>
          <button onClick={this.handleAddTripClick}>Add trip</button>
          <ul>
            {
              this.state.trips.map(trip => {
                return (
                  <li key={`trip-${trip._id}`}>
                    <Link to={`/trips/${trip._id}`}>
                      <h2>{trip.name}</h2>
                    </Link>
                    <p>{moment(trip.startDate).format("M/D")}-{moment(trip.endDate).format("M/D")}</p>
                    <button onClick={() => this.handleDeleteTrip(trip._id)}>Remove</button>
                  </li>
                );
              })
            }
          </ul>
        </Container>
        <Plan
          onHide={this.modalClose}
          show={this.state.modalShow}
          handleSubmit={this.handleSubmitTrip}
          userId={this.state.userId}
        />
      </Fragment>
    );
  }
};

export default Trips;
