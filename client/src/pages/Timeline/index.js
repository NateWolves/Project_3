import React, { Component } from 'react';
import './timeline.css';
import moment from 'moment';
import TimelineItem from './TimelineItem';
import AddEventButton from './AddEventButton';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import API from '../../utils/api';
import AddSearchButton from './AddSearchButton';



class Timeline extends Component {
  state = {
    tripId: "",
    tripStartDate: "",
    tripLocation: {},
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
    API.createEvent(eventObj)
      .then(dbEvent => {
        API.findEventsByTrip(this.props.match.params.id)
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
      })
      .catch(err => console.log(err));
  };

  handleEventEdit = (id, eventObj) => {
    API.updateEvent(id, eventObj)
      .then(dbEvent => {
        API.findEventsByTrip(this.props.match.params.id)
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
      })
      .catch(err => console.log(err));
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
          tripStartDate: res.data.startDate,
          events: res.data.events,
          tripLocation: res.data.tripLocation
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
      <Container fluid={true} className="timelineWrapper" style={{ minHeight: '100vh' }}>
        <Container fluid={true} className="navBackground">
          <Navbar />
        </Container>
        <br />
        <br />
        <Container fluid={true} className="timeline-container">
          <Row className="timelineRow">
            <Col className="timelineCol">
              <AddEventButton
                tripId={this.state.tripId}
                triplocation={this.state.tripLocation}
                handleEventAdd={this.handleEventAdd}
                startDate={this.state.tripStartDate}
              />
              <AddSearchButton
                tripId={this.state.tripId}
                tripLocation={this.state.tripLocation}
                startDate={this.state.tripStartDate}
              />
            </Col>
          </Row>
          <Row className="timelineRow">
            <Col className="timelineCol">
              {
                this.state.days.map((events, i) => {
                  return (
                    <TimelineItem
                      key={`ti-${i}`}
                      dayNum={i + 1}
                      events={events}
                      tripId={this.state.tripId}
                      triplocation={this.state.tripLocation}
                      handleEventDelete={this.handleEventDelete}
                      handleEventAdd={this.handleEventAdd}
                      handleEventEdit={this.handleEventEdit}
                      startDate={this.state.tripStartDate}
                    />
                  );
                })
              }
            </Col>
          </Row>
        </Container>
        <Container fluid={true} className="footerBackground">
          <Footer />
        </Container>
      </Container>

    );
  }
};

export default Timeline;
