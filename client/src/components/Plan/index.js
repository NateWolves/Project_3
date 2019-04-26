import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


class Plan extends React.Component {
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
						<label for="event">Where are you going?</label>
						<input name="event"></input>

						<label for="start">When do you leave?</label>
						<input name="start"></input>

						<label for="end">When do you come back?</label>
						<input name="end"></input>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
					<Button>
                        <Link to="/timeline">
                            Save
                        </Link>
                    </Button>
				</Modal.Footer>
			</Modal>
		);
	}
}



export default Plan;