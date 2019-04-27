import React, { Component } from 'react';
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
      return explore;
  }
}

class Timeline extends Component {
  state = {
    events: [],
    days: []
  };

  divideIntoDays = () => {
    let days = [];
    let events = this.state.events.slice();

    for (let i = 0; i < events.length; i += 3) {
      days.push(events.slice(i, i + 3))
    }

    return days;
  };

  componentDidMount() {
    // create "testUser" if it doesn't exist, then get events
    API.findUser("testUser")
      .then(res => {
        if (res.data) {
          API.findAllEvents("testUser")
            .then(res => {
              this.setState({
                events: res.data.events
              }, () => {
                this.setState({
                  days: this.divideIntoDays()
                });
              });
            })
            .catch(err => console.log(err));
        } else {
          API.createUser("testUser");
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      // <div className="timeline-container">
      //   {dummyData.map((day) => {
      //     return <TimelineItem data={day} key={day.title} />
      //   })}
      // </div>

      <div className="timeline-container">
        {
          this.state.days.map((event, i) => {
            return <TimelineItem data={event} key={`ti-${i}`} dayNum={i + 1} />;
          })
        }
      </div>
    );
  }
};

class TimelineItem extends Component {

  handleDelete = id => {
    API.deleteEvent("testUser", id);
  };

  render() {
    return (
      <div className="timeline-item">
        <div className="timeline-item-content">
          <h3>Day {this.props.dayNum}</h3>
          {this.props.data.map((event, i) => {
            return (
              <EventItem
                data={event}
                key={`ei-${i}`}
                handleDelete={this.handleDelete}
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
  const { data, handleDelete } = props;

  return (
    <div className="event-item">
      <span>
        <img src={getEventIcon(data.type)} alt="Event icon" />
      </span>
      <div>
        <h4>{data.name}</h4>
        <time>{data.startDate}-{data.endDate}</time>
        <div className="event-item-btns">
          <button>Edit</button>
          <span>  </span>
          <button onClick={() => handleDelete(data._id)}>Remove</button>
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
