import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import Event from "../AddEventModal"
import api from '../../utils/api';


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
        results: {}
   
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
    // removeResult(e) {
    //     let array = [...this.state.results]; // make a separate copy of the array
    //     console.log(e.target.value)
    //     let index = e.target.value
    //     if (index !== -1) {
    //       array.splice(index, 1);
    //       this.setState({results: array});
    //     }
    //   }
	googleSearch(query) {
		api.textSearch(query).then(res =>{
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
					<h4>What would you like to do?</h4>

					<form>
                    <div className="form-group row">
                    <label htmlFor="example-text-input" className="col-2 col-form-label">Text</label>
                    <div className="col-10">
                        <input class="form-control" name="search" type="text" value={this.state.search} onChange={this.handleInputChange} id="text-input"></input>
                    </div>
                    </div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
					<Button onClick={() => this.handleSubmit()}>Save</Button>
				</Modal.Footer>
                <div className="container">
                {this.state.results}
                <AddEvent style={btnStyle} className="btn" >Add Event</AddEvent>
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


export default SearchModal;