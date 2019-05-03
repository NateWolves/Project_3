import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class Event extends React.Component {
	state = {
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

		this.props.handleEventAdd({
			name: this.state.event,
			tripId: this.props.tripId,
			type: "event",
			startDate: this.state.start || Date.now(),
			endDate: this.state.end || Date.now()
		});
		
		this.setState({
			event: "",
			start: "",
			end: ""
		});
	};

	render() {
		return (
			<Modal
				onHide={this.props.onHide}
				show={this.props.show}
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
					<h4>What are you doing?</h4>

					<form onSubmit={this.handleSubmit}>
						<label htmlFor="event">What are you doing?</label>
						<input name="event" value={this.state.event} onChange={this.handleChange}></input>

						<label htmlFor="start">What time does it start?</label>
						<input name="start" value={this.state.start} onChange={this.handleChange}></input>

						<label htmlFor="end">What time does it end?</label>
						<input name="end" value={this.state.end} onChange={this.handleChange}></input>
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
