import React from "react";
import moment from "moment";
import EditEventButton from "../EditEventButton";
import AddNearbyButton from "../AddNearbyButton";

import airport from '../../pages/Timeline/images/airport.png';
import aquarium from '../../pages/Timeline/images/aquarium.png';
import artmuseum from '../../pages/Timeline/images/artmuseum.png';
import bar from '../../pages/Timeline/images/bar.png';
import bus from '../../pages/Timeline/images/bus.png';
import cafe from '../../pages/Timeline/images/cafe.png';
import camp from '../../pages/Timeline/images/camp.png';
import casino from '../../pages/Timeline/images/casino.png';
import church from '../../pages/Timeline/images/church.png';
import club from '../../pages/Timeline/images/club.png';
import concert from '../../pages/Timeline/images/concert.png';
import explore from '../../pages/Timeline/images/explore.png';
import library from '../../pages/Timeline/images/library.png';
import meal from '../../pages/Timeline/images/meal.png';
import monument from '../../pages/Timeline/images/monument.png';
import movie from '../../pages/Timeline/images/movie.png';
import museum from '../../pages/Timeline/images/museum.png';
import park from '../../pages/Timeline/images/park.png'
import shopping from '../../pages/Timeline/images/shopping.png';
import spa from '../../pages/Timeline/images/spa.png';
import sports from '../../pages/Timeline/images/sports.png';
import theater from '../../pages/Timeline/images/theater.png';
import themepark from '../../pages/Timeline/images/themepark.png';
import train from '../../pages/Timeline/images/train.png';
import zoo from '../../pages/Timeline/images/zoo.png';

const getEventIcon = (type) => {
  switch (type) {
    case "airport":
      return airport;
    case "aquarium":
      return aquarium;
    case "artmuseum":
      return artmuseum;
    case "bar":
      return bar;
    case "bus":
      return bus;
    case "cafe":
      return cafe;
    case "camp":
      return camp;
    case "casino":
      return casino;
    case "church":
      return church;
    case "club":
      return club;
    case "concert":
      return concert;
    case "explore":
      return explore;
    case "library":
      return library;
    case "meal":
      return meal;
    case "monument":
      return monument
    case "movie":
      return movie;
    case "museum":
      return museum;
    case "park":
      return park;
    case "shopping":
      return shopping;
    case "spa":
      return spa;
    case "sports":
      return sports;
    case "theater":
      return theater;
    case "themepark":
      return themepark;
    case "train":
      return train;
    case "zoo":
      return zoo;
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
