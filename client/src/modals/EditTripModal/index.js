import React from 'react';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import API from '../../utils/api'

class EditEventModal extends React.Component {
  state = {
    tripId: "",
    name: "",
    startDate: "",
    endDate: "",
    tripLocation: {}
  };
  
  parseDate = date => {
    let arr = date.split(/\D/);
    return new Date(arr[0], --arr[1], arr[2]);
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // const locationData ={}
    // API.textSearch(this.state.name).then(res => {
      
    //   locationData.address = res.data.candidates[0].formatted_address;
    //   locationData.lat = res.data.candidates[0].geometry.location.lat;
    //   locationData.lon = res.data.candidates[0].geometry.location.lng;
		
    // }).catch(err => console.log(err))

    this.props.onHide();
      this.props.handleEditTrip({
        _id: this.props.tripId,
        name: this.state.name,
        // tripLocation: locationData,
        startDate: this.parseDate(this.state.startDate),
        endDate: this.parseDate(this.state.endDate)
      });
   
  };

  componentWillReceiveProps() {
    this.setState({
      tripId: this.props.tripId,
      name: this.props.name,
      startDate: moment(this.props.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.props.endDate).format("YYYY-MM-DD")
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
            Edit Trip
        	</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={this.handleSubmit}>
            <div style={inputStyle}>
            <label htmlFor="event" className="col-6 col-form-label">Let us know where you'll be staying.</label>
            <br />
            <input className="form-control" style= {inputStyle}  name="name" value={this.state.name} onChange={this.handleChange}></input>
            </div>
            <br />
            <p>And for how long.</p>
            <div style={dateStyle}>
              <label htmlFor="Start" className="col-6 col-form-label">Start date</label>
              <div className="col-7">
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
              <label htmlFor="End" className="col-6 col-form-label">End date</label>
              <div className="col-7">
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

export default EditEventModal;
