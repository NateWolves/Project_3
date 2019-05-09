import React, { Component} from "react"
import moment from "moment";
import { Link } from "react-router-dom";
import { Container, Table, Card } from "react-bootstrap"
import Plan from "../../modals/Plan";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EditTripModal from "../../modals/EditTripModal";
import Auth from "../../utils/Auth";
import API from "../../utils/api";
import "./Trips.css";

class Trips extends Component {
  state = {
    addModalShow: false,
    editModalShow: false,
    trips: [],
    userId: "",
    tripId: "",
    tripName: "",
    tripStartDate: "",
    tripEndDate: ""
  };

  componentDidMount() {
    const userData = Auth.getProfile()
    this.setState({userId: userData.id}) 
    API.findTripsByUser(userData.id)
      .then(res => {
        this.setState({ 
          trips: res.data.trips
        });
      })
      .catch(err => console.log(err));
  }

  handleAddTripClick = () => {
    this.setState({
      addModalShow: true
    });
  };

  handleSubmitTrip = tripObj => {
    this.setState({
      addModalShow: false
    });
    API.createTrip(tripObj)
      .then(res => {
        this.setState({
          trips: [res.data, ...this.state.trips]
        });
      });
  };

  handleEditTripClick = tripObj => {
    this.setState({
      tripId: tripObj._id,
      tripName: tripObj.name,
      tripStartDate: tripObj.startDate,
      tripEndDate: tripObj.endDate
    }, () => {
      this.setState({
        editModalShow: true
      });
    });
  };

  handleEditTrip = tripObj => {
    let newTrips = this.state.trips.filter(trip => trip._id !== tripObj._id)
    newTrips.push(tripObj)

    this.setState({
      editModalShow: false,
      trips: newTrips
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
      addModalShow: false,
      editModalShow: false
    });
  };

  render() {
    return (
    <Container fluid={true} className="tripsWrapper">
        <Container fluid={true} className="navBackground">
          <Navbar/>
        </Container>
        <br/>
        <br/>
      <Container fluid={true} className="tripsContainer">
        <Container>
          <Card.Title>My Trips</Card.Title>
          <button onClick={this.handleAddTripClick}>Add trip</button>
        </Container>
        <br/>
        <Plan
          onHide={this.modalClose}
          show={this.state.addModalShow}
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
                <th></th>
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
                      {moment(trip.startDate).format("dddd - MMMM Do")}
                    </td>
                    <td>
                      {moment(trip.endDate).format("dddd - MMMM Do")}
                    </td>
                    <td>
                      <button 
                        onClick={() => this.handleEditTripClick(trip)}
                        className="mr-2"
                      >
                        Edit
                    </button>
                      <button onClick={() => this.handleDeleteTrip(trip._id)}>
                        Remove Trip
                    </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
        <EditTripModal
          onHide={this.modalClose}
          show={this.state.editModalShow}
          handleEditTrip={this.handleEditTrip}
          tripId={this.state.tripId}
          name={this.state.tripName}
          startDate={this.state.tripStartDate}
          endDate={this.state.tripEndDate}
        />
      </Container>
        <Footer/>
    </Container>

    );
  }
};

export default Trips;
