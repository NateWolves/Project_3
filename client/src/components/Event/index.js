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

	handleSubmit = () => {
		
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
					<h4>What are you doing?</h4>

					<form>
						<label for="event">What are you doing?</label>
						<input name="event"></input>

						<label for="start">What time does it start?</label>
						<input name="start"></input>

						<label for="end">What time does it end?</label>
						<input name="end"></input>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
					<Button>Save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}



export default Event;