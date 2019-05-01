import React, { Component, Fragment } from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap"

import API from "../../utils/api";

class Trips extends Component {
  state = {
    trips: []
  };

  componentDidMount() {
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
          <h1>My Trips</h1>
          <ul>
            {
              this.state.trips.map(trip => {
                return (
                  <li key={`trip-${trip._id}`}>
                    <Link to="/timeline">
                      <h2>{trip.name}</h2>
                      <p>{moment(trip.startDate).format("M/D")}-{moment(trip.endDate).format("M/D")}</p>
                    </Link>
                  </li>
                );
              })
            }
          </ul>
        </Container>
      </Fragment>
    );
  }
};

export default Trips;
