import React from 'react';
import Plan from '../Plan';
import { Button, ButtonToolbar } from 'react-bootstrap';

function Home() {
    return (
        <div id="home">
            <PlanTrip />
        </div>
    )
}

class PlanTrip extends React.Component {
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
    background: "none",
    color: "black",
    border: "1px solid black",
    margin: "5px"
}

export default Home;