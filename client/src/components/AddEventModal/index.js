import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import API from '../../utils/api';

class AddEventModal extends React.Component {
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

					<form onSubmit={this.handleSubmit}>
						<label htmlFor="event">What are you doing?</label>
						<br/>
						<input style={inputStyle} name="event" value={this.state.event} onChange={this.handleChange}></input>

						<br/>

						<div style={dateStyle}>
							<label htmlFor="Start" className="col-6 col-form-label">Start date</label>
							<div className="col-5">
								<input
									name="startDate"
									className="form-control"
									type="datetime-local"
									value={this.state.startDate}
									onChange={this.handleChange}
									id="start-date-input">
								</input>
							</div>

						</div>

						<div style={dateStyle}>
							<label htmlFor="End" className="col-6 col-form-label">End date</label>
							<div className="col-5">
								<input
									name="endDate"
									className="form-control"
									type="datetime-local"
									value={this.state.endDate}
									onChange={this.handleChange}
									id="end-date-input">
								</input>
							</div>

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

export default AddEventModal;
