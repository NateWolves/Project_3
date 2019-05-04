import React from "react";
import moment from "moment";
import EditEventButton from "../EditEventButton";
import AddNearbyButton from "../AddNearbyButton";

import explore from '../../pages/Timeline/images/explore.png';
import meal from '../../pages/Timeline/images/meal.png';
import monument from '../../pages/Timeline/images/monument.png';
import museum from '../../pages/Timeline/images/museum.png';
import park from '../../pages/Timeline/images/park.png'
import concert from '../../pages/Timeline/images/concert.png';
import movie from '../../pages/Timeline/images/movie.png';
import theater from '../../pages/Timeline/images/theater.png';
import sports from '../../pages/Timeline/images/sports.png';

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

          <EditEventButton
            name={props.name}
            startDate={props.startDate}
            endDate={props.endDate}
            type={props.type}
            eventId={props.eventId}
            handleEventEdit={props.handleEventEdit}
          />

          <button 
            className="btn"
            style={styles}
            onClick={() => props.handleEventDelete(props.eventId)} 
          >
            Remove
          </button>
          <AddNearbyButton />

        </div>
      </div>

      <br />
    </div>
  );
};

const styles = {   
  background: "none",
  color: "black",
  border: "1px solid black",
  margin: "5px"
};

export default EventItem;
