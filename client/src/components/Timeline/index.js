import React, { Component } from 'react';
import './timeline.css';
import { Button, ButtonToolbar } from 'react-bootstrap';
import moment from 'moment';
import Event from '../Event';
import Meal from '../Meal';
import NearbyModal from '../Nearby';
import SearchModal from '../Search'
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
      return explore;
  }
}

class Timeline extends Component {
  state = {
    tripId: "",
    events: [],
    days: []
  };

  divideIntoDays = () => {
    let days = [];
    let events = this.state.events.slice();

    let newDay = [events[0]];    
    let dayStartMoment = moment(events[0].startDate);
    let newDayMoment;

    for (let i = 1; i < events.length; i++) {
      newDayMoment =  moment(events[i].startDate);
      
      if (dayStartMoment.isSame(newDayMoment, 'day')) {
        newDay.push(events[i])
      } else {
        days.push(newDay);
        dayStartMoment = newDayMoment;
        newDay = [events[i]];
      }

      if (i + 1 === events.length) {
        days.push(newDay)
      }
    }

    return days;
  };

  handleEventAdd = eventObj => {
    this.setState({
      events: [...this.state.events, eventObj]
    }, () => {
      this.setState({
        days: this.divideIntoDays()
      });
      API.createEvent(eventObj);
    });
  };

  handleEventEdit = id => {
    this.setState({
      events: this.state.events.filter(event => event._id !== id)
    }, () => {
      this.setState({
        days: this.divideIntoDays()
      });
      API.updateEvent(id)
    })
  }

  handleEventDelete = id => {
    this.setState({
      events: this.state.events.filter(event => event._id !== id)
    }, () => {
      this.setState({
        days: this.divideIntoDays()
      });
      API.deleteEvent(id);
    });
  };

  componentDidMount() {
    API.findTripsByUser("testUser")
      .then(res => {
        this.setState({
          tripId: res.data.trips[0]._id,
          events: res.data.trips[0].events
        }, () => {
          this.setState({
            days: this.divideIntoDays()
          });
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="timeline-container">
        <br /><br /><br /><br />
        {
          this.state.events.length > 0 ? (
            this.state.days.map((events, i) => {
              return (
                <TimelineItem
                  key={`ti-${i}`}
                  dayNum={i + 1}
                  events={events}
                  tripId={this.state.tripId}
                  handleEventDelete={this.handleEventDelete}
                  handleEventAdd={this.handleEventAdd}
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

  render() {
    return (
      <div className="timeline-item">
        <div className="timeline-item-content">
          <h3>Day {this.props.dayNum} - {moment(this.props.events[0].startDate).format("dddd M/D")} </h3>
          {this.props.events.map((event, i) => {
            return (
              <EventItem
                key={`ei-${i}`}
                handleEventDelete={this.props.handleEventDelete}
                handleEventAdd={this.props.handleEventAdd}
                name={event.name}
                startDate={event.startDate}
                endDate={event.endDate}
                type={event.type}
                eventId={event._id}
              />
            );
          })}

          {/* <Link to="/event">
                    <button>Add an Event</button>
                </Link> */}


          <AddEvent tripId={this.props.tripId} handleEventAdd={this.props.handleEventAdd} />
          <AddNearby tripId={this.props.tripID} />      

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
        <img className="iconImage" src={getEventIcon(props.type)} alt="Event icon" />
      </span>
      <div>
        <h4>{props.name}</h4>
        <time>{moment(props.startDate).format('h:mma')}-{moment(props.endDate).format('h:mma')}</time>
        <div className="event-item-btns">

          <EditEvent 
            name={props.name}
            startDate={props.startDate}
            endDate={props.endDate}
            type={props.type}
            />

          <span>  </span>

          <button  className="btn" onClick={() => props.handleDelete(props.eventId)} style={btnStyle}>Remove</button>
          <AddNearby  />  

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
          tripId={this.props.tripId}
          handleEventAdd={this.props.handleEventAdd}
        />
      </ButtonToolbar>
    );
  }
}


class EditEvent extends React.Component {
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
          Edit Event
    			</Button>

        <Event
          name={this.props.name}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          type={this.props.type}
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}


class AddNearby extends React.Component {
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
          Search Nearby
    			</Button>

        <NearbyModal
          show={this.state.modalShow}
          onHide={modalClose}
        />
      </ButtonToolbar>
    );
  }
}

export default Timeline;
