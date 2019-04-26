import React from 'react';
import { Modal, Button } from 'react-bootstrap';


class Meal extends React.Component {
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
						Add a Meal
        		    </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Where are you eating?</h4>

					<form>
						<label for="event">Where are you eating?</label>
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



export default Meal;