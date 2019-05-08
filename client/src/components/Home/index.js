import React from 'react';
import Plan from '../Plan';
import { Button, ButtonToolbar } from 'react-bootstrap';
import API from '../../utils/api';

class Home extends React.Component {
	constructor(...args) {
		super(...args);

		this.state = { 
			modalShow: false,
			userId: ""
		}
	}

	handleSubmitTrip = tripObj => {
    this.setState({
      addModalShow: false
    });
    API.createTrip(tripObj);
  };

	componentDidMount() {
		API.findUser("testUser")
			.then(res => {
				this.setState({
					userId: res.data._id
				});
			});
	}

	render() {
		let modalClose = () => this.setState({ modalShow: false });

		return (
			<ButtonToolbar>
				<Button
					variant="dark"
                    onClick={() => this.setState({ modalShow: true })}
                    style={btnStyle}
				>
					Plan a Trip
    			</Button>

				<Plan
					show={this.state.modalShow}
					onHide={modalClose}
					userId={this.state.userId}
					handleSubmit={this.handleSubmitTrip}
				/>
			</ButtonToolbar>
		);
	}
}

const btnStyle = {
    background: "#d5bd97",
    color: "white",
	border: "1px solid #d4bb94",
	boxShadow: "2px 2px 4px #000000",
	margin: "auto",
}

export default Home;