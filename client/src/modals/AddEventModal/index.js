import React from 'react';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';

class AddEventModal extends React.Component {
	state = {
		tripId: this.props.tripId,
		event: this.props.name,
		day: "",
		startTime: "10:00",
		endTime: "11:00"
	};

	parseDate = (date, time) => {
		let d = date.split(/\D/);
		let t = time.split(/\D/);
    return new Date(d[0], --d[1], d[2], t[0], t[1]);
  }

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		this.props.onHide();
		console.log(this.parseDate(this.state.day, this.state.startTime))

		this.props.handleEventAdd({
			name: this.state.event,
			tripId: this.props.tripId,
			type: "event",
			startDate: this.parseDate(this.state.day, this.state.startTime),
			endDate: this.parseDate(this.state.day, this.state.endTime)
		});

		this.setState({
			event: "",
			startTime: "10:00",
			endTime: "11:00"
		});
	}

	componentWillReceiveProps() {
		this.setState({
			day: moment(this.props.startDate).format("YYYY-MM-DD")
		});
	}

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
						<br />
						<input style={inputStyle} name="event" value={this.state.event} onChange={this.handleChange}></input>

						<br />

						<div style={inputStyle}>
							<label htmlFor="day-input" className="col-form-label">Date</label>
							<div>
								<input
									name="day"
									className="form-control"
									type="date"
									value={this.state.day}
									onChange={this.handleChange}
									id="day-input">
								</input>
							</div>
						</div>

						<div style={dateStyle}>
							<label htmlFor="Start" className="col-6 col-form-label">Start time</label>
							<div className="col-7">
								<input
									name="startTime"
									className="form-control"
									type="time"
									value={this.state.startTime}
									onChange={this.handleChange}
									id="start-time-input">
								</input>
							</div>
						</div>

						<div style={dateStyle}>
							<label htmlFor="End" className="col-6 col-form-label">End time</label>
							<div className="col-7">
								<input
									name="endTime"
									className="form-control"
									type="time"
									value={this.state.endTime}
									onChange={this.handleChange}
									id="end-time-input">
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
