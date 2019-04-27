import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


class Plan extends React.Component {
	state = {
		place: "",
		startDate: "",
		endDate: ""
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
						<label for="place">Where are you going?</label>
						<input name="place"></input>

						<label for="startDate">When do you leave?</label>
						<input name="startDate"></input>

						<label for="endDate">When do you come back?</label>
						<input name="endDate"></input>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button style={btnStyle} onClick={this.props.onHide}>Close</Button>
					<Button style={btnStyle}>
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