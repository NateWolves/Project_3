import React from 'react';
import { Modal, Button } from 'react-bootstrap';


class Event extends React.Component {
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

						<div className="form-group row">
							<label for="Start" className="col-2 col-form-label">Start Time</label>
							<div className="col-4">
								<input className="form-control" type="date" value="2019-08-19" id="start-time-input"></input>
							</div>
							<br/>
							<label for="End" className="col-2 col-form-label">End Time</label>
							<div className="col-4">
								<input className="form-control" type="date" value="2019-08-27" id="end-time-input"></input>
							</div>
						</div>
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