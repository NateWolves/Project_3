import React, { Component, Fragment } from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap"
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
      modalShow: false
    });
    API.createTrip(tripObj)
      .then(res => {
        this.setState({
          trips: [res.data, ...this.state.trips]
        });
      });
  };

  handleEditTrip = tripObj => {
    let newTrips = this.state.trips.filter(trip => trip._id !== tripObj._id)
    
    this.setState({
      trips: newTrips.push(tripObj)
    });
    API.updateTrip(tripObj._id, tripObj);
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
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <h1>My Trips</h1>
          <button onClick={this.handleAddTripClick}>Add trip</button>
        </Container>
        <Plan
          onHide={this.modalClose}
          show={this.state.modalShow}
          handleSubmit={this.handleSubmitTrip}
          userId={this.state.userId}
        />
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Trip</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
            {this.state.trips.map(trip => {
              return (
                <tr key={`trip-${trip._id}`}>
                  <td>
                    <Link to={`/trips/${trip._id}`}>
                      <h2>{trip.name}</h2>
                    </Link>
                  </td>
                  <td>
                    {moment(trip.startDate).format("M/D")}
                  </td>
                  <td>
                    {moment(trip.endDate).format("M/D")}
                  </td>
                  <td>
                    <button onClick={() => {
                      return this.handleDeleteTrip(trip._id);
                    }}>
                      Remove Trip
                    </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        </Container>
        
      </Fragment>
    );
  }
};

export default Trips;
