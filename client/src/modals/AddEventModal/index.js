import React from 'react';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';

class AddEventModal extends React.Component {
	state = {
		tripId: this.props.tripId,
		event: this.props.name,
		type: "explore",
		date: moment(this.props.startDate).format("MM/DD/ YYYY"),
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
			type: this.state.type,
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
					<div className="container">
					<div style={inputStyle}>
						<label htmlFor="event" className="col-form-label">What are you doing?</label>
						<br />
						<input style={inputStyle} name="event" value={this.state.event} onChange={this.handleChange}	className="form-control"></input>
						</div>
						<br />
						<div className="form-group row">
						<div style={dateStyle}>
							<label htmlFor="Start" className="col-6 col-form-label">Date</label>
							<div className="col-7">
								<input
									name="day"
									className="form-control"
									type="date"
									value={this.state.day}
									onChange={this.handleChange}
									id="start-date-input">
								</input>
							</div>					
						</div>
						<div style={dateStyle}>
							<label htmlFor="Start" className="col-6 col-form-label">Type</label>
							<div className="col-6">
							<select name="type" onChange={this.handleChange} className="custom-select">
                            <option defaultValue="explore">Just Explore</option>
                            <option value="airport">Airport</option>
                            <option value="aquarium">Aquarium</option>
                            <option value="artmuseum">Art Gallery</option>
                            <option value="bar">Bar</option>
                            <option value="bus">Bus Station</option>
                            <option value="cafe">Cafe</option>
                            <option value="camp">Camping</option>
                            <option value="casino">Casino</option>
                            <option value="church">Church</option>
                            <option value="concert">Concert</option>
                            <option value="explore">Just Explore</option>
                            <option value="library">Library</option>
                            <option value="meal">Restaurant</option>
                            <option value="movie">Movie</option>
                            <option value="museum">Museum</option>
                            <option value="club">Night Club</option>
                            <option value="park">Park</option>
                            <option value="shopping">Shopping</option>
                            <option value="spa">Spa</option>
                            <option value="sports">Sporting Event</option>
                            <option value="subway_station">Subway Station</option>
                            <option value="themepark">Amusement Park</option>
                            <option value="zoo">Zoo</option>
                </select>
							</div>					
						</div>
						</div>
						<div className="form-group row">
						<div style={dateStyle}>
							<label htmlFor="Start" className="col-6 col-form-label">Start time</label>
							<div className="col-7">
								<input
									name="startTime"
									className="form-control"
									type="time"
									value={this.state.startTime}
									onChange={this.handleChange}
									id="start-date-input">
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
									id="end-date-input">
								</input>
							</div>

						</div>
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
