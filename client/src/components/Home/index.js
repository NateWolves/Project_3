import React from 'react';
import Plan from '../Plan';
import { Button, ButtonToolbar } from 'react-bootstrap';

// function Home() {
//     return (
//         <div id="home">
// 		<br/><br/><br/>
//             <PlanTrip />
//         </div>
//     )
// }

class Home extends React.Component {
	constructor(...args) {
		super(...args);

		this.state = { modalShow: false };
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