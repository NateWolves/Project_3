import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';


class Plan extends React.Component {
	state = {
		place: "",
		startDate: "",
		endDate: ""
	}

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	}

	handleSubmit = event => {
		event.preventDefault();

		// saves state to its own variables
		const startDate = moment(this.state.startDate);
		const endDate = moment(this.state.endDate);

		// converts dates to date objects
		var startDateType = new Date(this.state.startDate);
		var endDateType = new Date(this.state.endDate);
		
		// saves the number of days between start and end
		var days = endDate.diff(startDate, "days");
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
						Plan a Trip
        		    </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Where are you going?</h4>

					<form>
						<div className="form-group">
							<label htmlFor="destination"></label>
							<input type="text" className="form-control" id="destinationInput" placeholder="Paris France"></input>
						</div>
						<div className="form-group">
							<label htmlFor="Start" className="col-2 col-form-label">Start Date</label>
							<div className="col-4">
								<input
									name="startDate"
									className="form-control"
									type="date"
									value={this.state.startDate}
									onChange={this.handleChange}
									id="start-date-input">
								</input>
							</div>
							<label htmlFor="End" className="col-2 col-form-label">Return Date</label>
							<div className="col-4">
								<input
									name="endDate"
									className="form-control"
									type="date"
									value={this.state.endDate}
									onChange={this.handleChange}
									id="end-date-input">
								</input>
							</div>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button style={btnStyle} onClick={this.props.onHide}>Close</Button>
					<Button style={btnStyle} onClick={this.handleSubmit} >
						<Link style={style} to="/timeline">
							Save
                        </Link>
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

const style = {
	color: "black"
}

const btnStyle = {
	background: "white",
	border: "1px solid black",
	color: "black"
}



export default Plan;