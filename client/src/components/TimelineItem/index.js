import React, { Component } from "react";
import moment from "moment";
import EventItem from "../EventItem";
import AddEventButton from "../AddEventButton";
import AddNearbyButton from "../AddNearbyButton";

class TimelineItem extends Component {
  render() {
    return (
      <div className="timeline-item">
        <div className="timeline-item-content">
          <h3>Day {this.props.dayNum} - {moment(this.props.events[0].startDate).format("dddd M/D")} </h3>
          {
            this.props.events.map((event, i) => {
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
            })
          }

          <AddEventButton
            tripId={this.props.tripId}
            handleEventAdd={this.props.handleEventAdd}
          />
          <AddNearbyButton
            tripId={this.props.tripID}
          />

          <span className="circle" />
        </div>
      </div>
    );
  }
};

export default TimelineItem;
