import React from "react";
import moment from "moment";
import EditEventButton from "../EditEventButton";
import AddNearbyButton from "../AddNearbyButton";

import airport from '../images/airport.png';
import aquarium from '../images/aquarium.png';
import artmuseum from '../images/artmuseum.png';
import bar from '../images/bar.png';
import bus from '../images/bus.png';
import cafe from '../images/cafe.png';
import camp from '../images/camp.png';
import casino from '../images/casino.png';
import church from '../images/church.png';
import club from '../images/club.png';
import concert from '../images/concert.png';
import explore from '../images/explore.png';
import library from '../images/library.png';
import meal from '../images/meal.png';
import monument from '../images/monument.png';
import movie from '../images/movie.png';
import museum from '../images/museum.png';
import park from '../images/park.png'
import shopping from '../images/shopping.png';
import spa from '../images/spa.png';
import sports from '../images/sports.png';
import theater from '../images/theater.png';
import themepark from '../images/themepark.png';
import train from '../images/train.png';
import zoo from '../images/zoo.png';
import { ButtonToolbar } from "react-bootstrap";

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
          <ButtonToolbar>
            <EditEventButton
              name={props.name}
              startDate={props.startDate}
              endDate={props.endDate}
              type={props.type}
              eventId={props.eventId}
              handleEventEdit={props.handleEventEdit}
              style={btnStyles}
            />

            <button
              className="btn"
              style={btnStyles}
              onClick={() => props.handleEventDelete(props.eventId)}
            >
              Remove
            </button>

            <AddNearbyButton style={btnStyles} />

          </ButtonToolbar>

        </div>
      </div>

      <br />
    </div>
  );
};

const btnStyles = {
  background: "none",
  color: "black",
  border: "1px solid black",
  margin: "5px",
  fontSize: "12px",
  padding: "none",
  lineHeight: "15px"
};

export default EventItem;
