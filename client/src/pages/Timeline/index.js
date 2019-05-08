import React, { Component } from 'react';
import './timeline.css';
import moment from 'moment';
import TimelineItem from './TimelineItem';
import AddEventButton from './AddEventButton';

import API from '../../utils/api';
import dummy from '../../utils/dummy';

// Generate dummy data
API.findUser("testUser")
  .then(res => {
    if (!res.data) {
      dummy.createData();
    }
  });

class Timeline extends Component {
  state = {
    tripId: "",
    events: [],
    days: []
  };

  divideIntoDays = () => {
    if (this.state.events.length === 0) return [];

    let days = [];
    let events = [...this.state.events];

    let newDay = [events[0]];
    let dayStartMoment = moment(events[0].startDate);
    let newDayMoment;

    if (events.length === 1) {
      return [newDay];
    }

    for (let i = 1; i < events.length; i++) {
      newDayMoment = moment(events[i].startDate);

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
    let newEvents = [];

    if (this.state.events.length > 0) {
      newEvents = [...this.state.events];

      for (let i = 0; i < newEvents.length; i++) {
        if (new Date(eventObj.startDate).getTime() <
          new Date(newEvents[i].startDate).getTime()) {
          newEvents.splice(i, 0, eventObj)
          break;
        }
      }
    } else {
      newEvents = [eventObj];
    }

    this.setState({
      events: newEvents
    }, () => {
      this.setState({
        days: this.divideIntoDays()
      });
      API.createEvent(eventObj);
    });
  };

  handleEventEdit = (id, eventObj) => {
    let newEvents = []

    if (this.state.events.length > 0) {
      newEvents = this.state.events.filter(event => event._id !== id);

      for (let i = 0; i < newEvents.length; i++) {
        if (new Date(eventObj.startDate).getTime() <
          new Date(newEvents[i].startDate).getTime()) {
          newEvents.splice(i, 0, eventObj)
          break;
        }
      }
    } else {
      newEvents = [eventObj];
    }

    this.setState({
      events: newEvents
    }, () => {
      this.setState({
        days: this.divideIntoDays()
      });
      API.updateEvent(id, eventObj);
    });
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
    API.findEventsByTrip(this.props.match.params.id)
      .then(res => {
        this.setState({
          tripId: res.data._id,
          events: res.data.events
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
          this.state.days.map((events, i) => {
            return (
              <TimelineItem
                key={`ti-${i}`}
                dayNum={i + 1}
                events={events}
                tripId={this.state.tripId}
                handleEventDelete={this.handleEventDelete}
                handleEventAdd={this.handleEventAdd}
                handleEventEdit={this.handleEventEdit}
              />
            );
          })
        }
        <AddEventButton
          tripId={this.state.tripId}
          handleEventAdd={this.handleEventAdd}
        />
      </div>
    );
  }
};

export default Timeline;
