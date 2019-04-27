import React from 'react';
import { Link } from 'react-router-dom';
import './timeline.css';
import { Button, ButtonToolbar } from 'react-bootstrap';
import dummyData from './dummydata';
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

const Timeline = () =>
  dummyData.length > 0 && (
    <div>

      <br /><br /><br /><br /><br /><br />
      <div className="timeline-container">
        {dummyData.map((day) => (
          <TimelineItem data={day} key={day.title} />
        ))}
      </div>
    </div>

  );

const TimelineItem = (day) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <h3>{day.data.title}</h3>
      {day.data.events.map((event) => (
        <EventItem data={event} key={event.id} />
      ))}

      {/* <Link to="/event">
                <button>Add an Event</button>
            </Link> */}

      <AddEvent />

      <AddMeal />

      <span className="circle" />
    </div>
  </div>
)

const EventItem = ({ data }) => (
  <div className="event-item">
    <span>
      <img className="iconImage" src={getEventIcon(data.type)} alt="Event icon" />
    </span>
    <div>
      <h4>{data.text}</h4>
      <time>{data.time.start}-{data.time.end}</time>
      <div className="event-item-btns">
        <button>Edit</button>
        <span>  </span>
        <button>Remove</button>
      </div>
    </div>

    <br />

    <br />
  </div>
)

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