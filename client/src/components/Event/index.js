import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';


class AddEvent extends React.Component {
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

class Event extends React.Component {
	constructor(...args) {
		super(...args);

		this.state = { modalShow: false };
	}

	render() {
		let modalClose = () => this.setState({ modalShow: false });

		return (
			<ButtonToolbar>
				<Button
					variant="primary"
					onClick={() => this.setState({ modalShow: true })}
				>
					Add Event
          </Button>

				<AddEvent
					show={this.state.modalShow}
					onHide={modalClose}
				/>
			</ButtonToolbar>
		);
	}
}

export default Event;