import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import API from '../../utils/api';

class Event extends React.Component {
	state = {
		tripId: this.props.tripId,
		event: this.props.name,
		start: this.props.startDate,
		end: this.props.endDate
	};


	handleChange = event => {
		const { name, value } = event.target;


		this.setState({
			[name]: value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		console.log(this.state);

		this.props.onHide();

		this.props.handleEventAdd({
			name: this.state.event,
			tripId: this.state.tripId,
			type: "event",
			startDate: this.state.start,
			endDate: this.state.end
		});

		this.setState({
			event: "",
			start: "",
			end: ""
		});
	};

	render() {
		// console.log(this.state)
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
<<<<<<< HEAD

					<form onSubmit={this.handleSubmit}>
						<label htmlFor="event">What are you doing?</label>
						<br/>
						<input style={inputStyle} name="event" value={this.state.event} onChange={this.handleChange}></input>

						<br/>

						<div style={dateStyle}>
							<label htmlFor="Start" className="col-6 col-form-label">Start Time</label>
							<div className="col-5">
								<input
									name="startDate"
									className="form-control"
									type="time"
									value={this.state.startDate}
									onChange={this.handleChange}
									id="start-date-input">
								</input>
							</div>

						</div>

						<div style={dateStyle}>
							<label htmlFor="End" className="col-6 col-form-label">End Time</label>
							<div className="col-5">
								<input
									name="endDate"
									className="form-control"
									type="time"
									value={this.state.endDate}
									onChange={this.handleChange}
									id="end-date-input">
								</input>
							</div>

=======
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
>>>>>>> 3f953fe258d62150ea986394bb45386e2d7fcbf0
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

const inputStyle = {
	display: "inline-block",
	width: "80%"
}

const dateStyle = {
	display: "inline-block",
	width: "50%"
}


export default Event;
