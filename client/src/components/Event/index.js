import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import API from '../../utils/api';

class Event extends React.Component {
	state = {
		tripId: this.props.tripId,
		event: "",
		start: "",
		end: ""
	};

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		this.props.onHide();

		API.createEvent({
			name: this.state.event,
			tripId: this.state.tripId,
			type: "event",
			startDate: this.state.start,
			endDate: this.state.end
		})
			.then(res => {
				this.setState({
					event: "",
					start: "",
					end: ""
				});
			});
	};

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
					<h4>Add an Event</h4>

					<form onSubmit={this.handleSubmit}>
						<label htmlFor="event">What are you doing?</label>
						<input name="event" value={this.state.event} onChange={this.handleChange}></input>
						<label htmlFor="start">What time does it start?</label>
						<div className="col-4">
								<input name="start" value={this.state.start} onChange={this.handleChange} className="form-control" type="time" id="start-time-input"></input>
						</div>
						<label htmlFor="end">What time does it end?</label>
						<div className="col-4">
								<input name="end" value={this.state.end} onChange={this.handleChange} className="form-control" type="time"  id="end-time-input"></input>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
					<Button onClick={this.handleSubmit}>Save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}



export default Event;