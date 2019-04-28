import React, { Component } from 'react';
import './timeline.css';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Event from '../Event';
import Meal from '../Meal';

import explore from './images/explore.png';
import meal from './images/meal.png';
import monument from './images/monument.png';
import museum from './images/museum.png';
import park from './images/park.png'
import concert from './images/concert.png';
import movie from './images/movie.png';
import theater from './images/theater.png';
import sports from './images/sports.png';

import API from '../../utils/api';
import dummy from '../../utils/dummy';

// Generate dummy data
API.findUser("testUser")
  .then(res => {
    if (!res.data) {
      dummy.createData();
    }
  });

const getEventIcon = (type) => {
  switch (type) {
    case "meal":
      return meal;
    case "explore":
      return explore;
    case "monument":
      return monument
    case "museum":
      return museum;
    case "park":
      return park;
    case "concert":
      return concert;
    case "movie":
      return movie;
    case "theater":
      return theater;
    case "sports":
      return sports;
    default:
      return null;
  }
}

class Timeline extends Component {
  state = {
    events: []
  };

  divideIntoDays = () => {
    let days = [];
    let events = this.state.events.slice();

    for (let i = 0; i < events.length; i += 4) {
      days.push(events.slice(i, i + 4))
    }

    return days;
  };

  componentDidMount() {
    API.findTripsByUser("testUser")
      .then(res => {
        this.setState({
          events: res.data.trips[0].events
        });
      })
      .catch(err => console.log(err));
  }
 
  render() {
    console.log(this.state.events);
    return (
      <div className="timeline-container">
        <br /><br /><br /><br />
        {
          this.state.events.length > 0 ? (
            this.state.events.map((event, i) => {
              return (
                <TimelineItem 
                  key={`ti-${i}`} 
                  dayNum={i + 1} 
                  events={this.state.events}
                />
              );
            })
          ) : (
            <AddEvent />
          )
        }
      </div>
    );
  }
};

class TimelineItem extends Component {

  handleDelete = id => {
    // API.deleteEvent();
  };

  render() {
    return (
      <div className="timeline-item">
        <div className="timeline-item-content">
          <h3>Day {this.props.dayNum}</h3>
          {this.props.events.map((event, i) => {
            return (
              <EventItem
                key={`ei-${i}`}
                handleDelete={this.handleDelete}
                name={event.name}
                startDate={event.startDate}
                endDate={event.endDate}
                type={event.type}
              />
            );
          })}

          {/* <Link to="/event">
                    <button>Add an Event</button>
                </Link> */}

          <AddEvent />
          <AddMeal />

          <span className="circle" />
        </div>
      </div>
    );
  }
};

const EventItem = props => {
  return (
    <div className="event-item">
      <span>
        <img src={getEventIcon(props.type)} alt="Event icon" />
      </span>
      <div>
        <h4>{props.name}</h4>
        <time>{props.startDate}-{props.endDate}</time>
        <div className="event-item-btns">
          <button>Edit</button>
          <span>  </span>
          <button>Remove</button>
        </div>
      </div>

      <br />
    </div>
  );
};

const btnStyle = {
  background: "none",
  color: "black",
  border: "1px solid black",
  margin: "5px"
}

class AddEvent extends React.Component {
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
          Add Event
    			</Button>

        <Event
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}

class AddMeal extends React.Component {
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
          Add Meal
    			</Button>

        <Meal
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}

export default Timeline;
