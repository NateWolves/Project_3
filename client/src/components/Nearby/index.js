import React from 'react';
import { Modal, Button, ButtonToolbar} from 'react-bootstrap';
import api from '../../utils/api';
import Event from '../AddEventModal';

class NearbyModal extends React.Component {

	state = {
        tripId: "",
        radius: "1000",
        type: "restaurant",
		event:{
			name:"",
			  type:"",
			  location: {
				name: "",
				lat:0,
				lon:0,
			  },
			  startDate:"",
			  endDate:""
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
          this.setState({results: array});
        }
      }
	nearbySearch(query) {
		api.nearbySearch(query).then(res =>{
         let resultArray = res.data.results
         let formatArray = resultArray.map(result =>{
             let resultObject = {};
             resultObject.id = result.id;
             resultObject.name = result.name;
             resultObject.type = result.types[0];
             resultObject.location = {
                name: result.vicinity, 
                lat: result.geometry.location.lat,
                lon: result.geometry.location.lng}
            resultObject.Misc = {
                rating: result.rating,
                price: result.price_level,
                hours: result.opening_hours
            };
            resultObject.startDate= "";
            resultObject.endDate= "";
            return resultObject
         })
         this.setState({results: formatArray})
         console.log(res.data)
        }).catch(err => console.log(err))
	}
    addSearchToEvent(e){
        let index = e.target.value;
        let newEvent = {}
        newEvent.name= this.state.results[index].name ;
        newEvent.type = this.state.results[index].type;
        newEvent.location = {name:this.state.results[index].location.name, lat: this.state.results[index].location.lat, lon: this.state.results[index].lon};
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
						Add an Event
        		    </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>What would you like to do?</h4>

					<form>
						<div className="form-group row">
						
						<label className="col-form-label col-2" htmlFor="typeSelect">Type of:</label>
						<div className= "col-6">
						<select name="type" onChange={this.handleInputChange} className="custom-select">
						<option defaultValue="restaurant">Restaurant</option>
						<option value="amusement_park">Amusement Park</option>
						<option value="art_gallery">Art Gallery</option>
						<option value="aquarium">Aquarium</option>
						<option value="cafe">Cafe</option>
						<option value="campground">Camping</option>
						<option value="casino">Casino</option>
						<option value="library">Library</option>
						<option value="movie_theater">Movie Theater</option>
						<option value="night_club">Night Club</option>
						<option value="restaurant">Restaurant</option>
						<option value="store">Store</option>
						<option value="subway_station">Subway Station</option>
						<option value="zoo">Zoo</option>
						</select>
						</div>
                        </div>
                        <div className="form-group row">
						<label className="col-form-label col-2" htmlFor="radiusSelect">Distance radius:</label>
						<div className="col-2">
						<select  name="radius" onChange={this.handleInputChange} className="custom-select">
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
                    <ul>
                    {this.state.results.map( result => (

                        <li key= {result.id}>
                        <form>
                        {console.log(this.state.results.indexOf(result))}
                        <strong>{result.name} </strong>
                        <p>Rated: {result.Misc.rating} out of 5</p>
                        <p>Price range: {result.Misc.price} out of 4</p>
                        {/* <div className="form-group row">
							<label for="Start" className="col-2 col-form-label">Start Time</label>
							<div className="col-4">
								<input className="form-control" type="datetime-local"  id="start-time-input" onChange={this.handleInputChange()} value={this.state.results.startDate}></input>
							</div>
                        </div>
                        <div className="form-group row">
							<label for="End" className="col-2 col-form-label">End Time</label>
							<div className="col-4">
								<input className="form-control" type="datetime-local"  id="end-time-input" onChange={this.handleInputChange()} value={this.state.results.endDate}></input>
							</div>
						</div> */}
                        <AddEvent style={btnStyle} className="btn" >Add Event</AddEvent>
                        <Button className="btn btn-danger" value={this.state.results.indexOf(result)} onClick={(e) => this.removeResult(e)}>Remove</Button>
                        </form>
                        </li>
                  
                    )
                    )}
                    </ul>
                </div>

			</Modal>
		);
	}
}

const btnStyle = {
	background: "white",
	border: "1px solid black",
	color: "black"
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
            show={this.state.modalShow}
            onHide={modalClose}
            tripId={this.props.tripId}
          />
        </ButtonToolbar>
      );
    }
  }

export default NearbyModal;