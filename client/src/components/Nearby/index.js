import React from 'react';
import { Modal, Button, ButtonToolbar, Table, Card } from 'react-bootstrap';
import api from '../../utils/api';
import Event from '../AddEventModal';

class NearbyModal extends React.Component {

  state = {
    tripId: "",
    radius: "1000",
    type: "restaurant",
    event: {
      name: "",
      type: "",
      location: {
        name: "",
        lat: 0,
        lon: 0,
      },
      startDate: "",
      endDate: ""
    },
    results: []

  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleSubmit() {
    // event.preventDefault();

    // hard coding location until we can populate previous event coords
    let defaultLocation = "-33.8670522,151.1957362"

    let search = `?location=${defaultLocation}&radius=${this.state.radius}&type=${this.state.type}`

    this.nearbySearch(search)
  }
  removeResult(e) {
    let array = [...this.state.results]; // make a separate copy of the array
    console.log(e.target.value)
    let index = e.target.value
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ results: array });
    }
  }

  nearbySearch(query) {
    api.nearbySearch(query).then(res => {
      let resultArray = res.data.results
      let formatArray = resultArray.slice(0, 10).map(result => {
        let resultObject = {};
        resultObject.id = result.id;
        resultObject.name = result.name;
        resultObject.type = result.types[0];
        resultObject.location = {
          name: result.vicinity,
          lat: result.geometry.location.lat,
          lon: result.geometry.location.lng
        }
        resultObject.Misc = {
          rating: result.rating,
          price: result.price_level,
          hours: result.opening_hours
        };
        resultObject.startDate = "";
        resultObject.endDate = "";
        return resultObject
      })
      this.setState({ results: formatArray })
      console.log(res.data)
    }).catch(err => console.log(err))
  }

  addSearchToEvent(e) {
    let index = e.target.value;
    let newEvent = {}
    newEvent.name = this.state.results[index].name;
    newEvent.type = this.state.results[index].type;
    newEvent.location = { name: this.state.results[index].location.name, lat: this.state.results[index].location.lat, lon: this.state.results[index].lon };
    newEvent.startDate = this.state.results[index].startDate;
    newEvent.endDate = this.state.results[index].endDate;
    console.log(newEvent)
    api.createEvent(newEvent).then(res => console.log(res)).catch(err => console.log(err))
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Search Nearby
        	</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group row">

              <label className="col-form-label col-2" htmlFor="typeSelect">Type of:</label>
              <div className="col-6">
                <select name="type" onChange={this.handleInputChange} className="custom-select">
                  <option defaultValue="restaurant">Restaurant</option>
                  <option value="amusement_park">Amusement Park</option>
                  <option value="airport">Airport</option>
                  <option value="aquarium">Aquarium</option>
                  <option value="art_gallery">Art Gallery</option>
                  <option value="bar">Bar</option>
                  <option value="bus_station">Bus Station</option>
                  <option value="cafe">Cafe</option>
                  <option value="campground">Camping</option>
                  <option value="casino">Casino</option>
                  <option value="church">Church</option>
                  <option value="library">Library</option>
                  <option value="movie_theater">Movie Theater</option>
                  <option value="museum">Museum</option>
                  <option value="night_club">Night Club</option>
                  <option value="park">Park</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="shopping_mall">Shopping Mall</option>
                  <option value="spa">Spa</option>
                  <option value="stadium">Stadium</option>
                  <option value="subway_station">Subway Station</option>
                  <option value="zoo">Zoo</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-form-label col-2" htmlFor="radiusSelect">Distance radius:</label>
              <div className="col-2">
                <select name="radius" onChange={this.handleInputChange} className="custom-select">
                  <option value="1000">1 km</option>
                  <option value="2000">2 km</option>
                  <option value="3000">3 km</option>
                  <option value="4000">4 km</option>
                  <option value="5000">5 km</option>
                  <option value="6000">6 km</option>
                  <option value="7000">7 km</option>
                  <option value="8000">8 km</option>
                  <option value="9000">9 km</option>
                  <option value="10000">10 km</option>
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button onClick={() => this.handleSubmit()}>Save</Button>
        </Modal.Footer>
        <div className="container">
          <Table striped bordered hover>
            <tbody>
            {this.state.results.map(result => (
              <tr key={result.id} style={tableRowStyle} >
                  <td>
                    <Card.Title>{result.name} </Card.Title>
                    {result.Misc.rating &&
                      <p>Rating: {result.Misc.rating} out of 5</p>
                    }
                    {result.Misc.price &&
                      <p>Price: {result.Misc.price} out of 4</p>
                    }
                  </td>
                  
                  <td>
                    <ButtonToolbar>
                      <AddEvent
                        style={btnStyle}
                        className="btn"
                        name={result.name}
                        type={result.type}
                        location={result.location}>
                          Add Event
                      </AddEvent>
                      <Button
                        className="btn btn-danger"
                        style={removeBtnStyle}
                        value={this.state.results.indexOf(result)}
                        onClick={(e) => this.removeResult(e)}>
                          X
                      </Button>
                    </ButtonToolbar>
                  </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>

      </Modal>
    );
  }
}

const tableRowStyle = {
  padding: "10px"
}

const btnStyle = {
  background: "white",
  border: "1px solid black",
  color: "black",
  display: "inline-block",
  marginRight: "10px"
}

const removeBtnStyle = {
  display: "inline-block",
  position: "absolute",
  right: "10px"
}

class AddEvent extends React.Component {
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
          onClick={() => this.setState({ modalShow: true })}
          style={btnStyle}
        >
          Add Event
        </Button>

        <Event
          name={this.props.name}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          type={this.props.type}
          show={this.state.modalShow}
          tripId={this.props.tripId}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}

export default NearbyModal;
