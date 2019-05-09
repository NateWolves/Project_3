import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import API from '../../utils/api';
import Event from '../../modals/AddEventModal';

class SearchModal extends React.Component {

	state = {
        tripId: "",
        search: "",
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
        let search = this.state.search
		this.googleSearch(search)
		}
		
	googleSearch(query) {
		API.textSearch(query).then(res =>{
        console.log(res.data)
         this.setState({results:  res.data.candidates})
        }).catch(err => console.log(err))
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
					<h4>Search for a place you would like to visit!</h4>

					<form>
                    <div className="form-group row">
                    <label htmlFor="example-text-input" className="col-2 col-form-label">Text</label>
                    <div className="col-10">
                        <input class="form-control" name="search" type="text" value={this.state.search} onChange={this.handleInputChange} id="text-input"></input>
                    </div>
                    </div>
					</form>
					<div className="searchResults">
						{this.state.results.map(result => (
							<div>
							<p>Would you like to add this to your events?</p>
							<p>{result.name}</p>
							<p>{result.formatted_address}</p>
							<p>{result.rating}</p>
							{/* <p>{result.opening_hours}</p> */}
							<ButtonToolbar>
							<AddEvent
                        style={btnStyle}
                        className="btn"
                        name={result.name}
                        type={result.type}
                        location={result.location}>
                          Add Event
                      </AddEvent>
											</ButtonToolbar>
							</div>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
					<Button onClick={() => this.handleSubmit()}>Search</Button>
				</Modal.Footer>
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


export default SearchModal;