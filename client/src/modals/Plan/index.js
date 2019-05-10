import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Auth from '../../utils/Auth'
import API from '../../utils/api'

class Plan extends React.Component {
	state = {
		place: "",
		startDate: moment().add(1, "d").format("YYYY-MM-DD"),
		endDate: moment().add(2, "d").format("YYYY-MM-DD"),
		loggedIn: false,
		user: {}
	}

	componentDidMount() {
		const bool = Auth.loggedIn();
		this.setState({ loggedIn: bool })
		if (bool) {
			const userData = Auth.getProfile()
			this.setState({ user: userData })
		}
	}

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		API.textSearch(this.state.place)
			.then(res => {
				let newTrip = {
					userId: this.state.user.id,
					name: this.state.place,
					startDate: this.state.startDate,
					endDate: this.state.endDate
				};
				if (res.data.candidates[0]) {
					newTrip.tripLocation = {
						address: res.data.candidates[0].formatted_address,
						lat: res.data.candidates[0].geometry.location.lat,
						lon: res.data.candidates[0].geometry.location.lng
					}
				}
				console.log(newTrip)
				this.props.handleSubmitTrip(newTrip);
			})
			.catch(err => console.log(err))
	};

	render() {

		return (
			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
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
					<h5>Where will you going?</h5>

					<form>
						<div className="form-group">
							<label htmlFor="destination"></label>
							<input
								name="place"
								type="text"
								style={inputStyle}
								className="form-control"
								id="destinationInput"
								onChange={this.handleChange}
								placeholder="The Hoxton, Paris France">
							</input>
						</div>
						<div className="form-group">

							<div style={dateStyle}>
								<label htmlFor="Start" className="col-6 col-form-label">Start Date</label>
								<div className="col-5">
									<input
										name="startDate"
										className="form-control"
										type="date"
										value={this.state.startDate}
										onChange={this.handleChange}
										id="start-date-input">
									</input>
								</div>

							</div>

							<div style={dateStyle}>
								<label htmlFor="End" className="col-6 col-form-label">Return Date</label>
								<div className="col-5">
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
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button style={btnStyle} onClick={this.props.onHide}>Close</Button>
					<Button style={btnStyle} onClick={this.handleSubmit} >
						<Link style={saveStyle} to={`/trips`}>
							Save
                        </Link>
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

const inputStyle = {
	width: "90%"
}

const dateStyle = {
	display: "inline-block",
	width: "50%"
}

const saveStyle = {
	color: "black"
}

const btnStyle = {
	background: "white",
	border: "1px solid black",
	color: "black"
}



export default Plan;