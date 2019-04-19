import React from 'react';
import './timeline.css';

import explore from './images/explore.png';
import meal from './images/meal.png';
import monument from './images/monument.png';
import museum from './images/museum.png';
import park from './images/park.png'
import concert from './images/concert.png';
import movie from './images/movie.png';
import theater from './images/theater.png';
import sports from './images/sports.png';


const dummyData = [
    {
        title: 'Day 1',
        events: [
            {
                id: 1,
                text: 'Corner Cafe',
                time: {
                    start: '11:00 AM',
                    end: '11:45 AM'
                },
                type: 'meal'
            }, {
                id: 2,
                text: 'Go to the Nelson',
                time: {
                    start: '12:00 PM',
                    end: '03:00 PM'
                },
                type: 'museum'
            }, {
                id: 3,
                text: 'Walk around Loose',
                time: {
                    start: '3:30 PM',
                    end: '4:30 PM'
                },
                type: 'park'
            }, {
                id: 4,
                text: 'Friends Sushi',
                time: {
                    start: '5:00 PM',
                    end: '6:00 PM'
                },
                type: 'meal'
            }
        ]
    }, {
        title: 'Day 2',
        events: [
            {
                id: 1,
                text: 'Succotash',
                time: {
                    start: '09:30 AM',
                    end: '11:00 AM'
                },
                type: 'meal'
            }, {
                id: 2,
                text: 'Explore Kansas City',
                time: {
                    start: '11:00 AM',
                    end: '5:00 PM'
                },
                type: 'explore'
            }, {
                id: 3,
                text: 'Jazz',
                time: {
                    start: '5:30 PM',
                    end: '7:00 PM'
                },
                type: 'meal'
            }, {
                id: 4,
                text: 'Diane Coffee',
                time: {
                    start: '8:30 PM',
                    end: '11:00 PM'
                },
                type: 'concert'
            }
        ]
    }
];

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
        <div className="timeline-container">
            {dummyData.map((day) => (
                <TimelineItem data={day} key={day.title} />
            ))}
        </div>
    );

const TimelineItem = (day) => (
    <div className="timeline-item">
        <div className="timeline-item-content">
            <h3>{day.data.title}</h3>
            {day.data.events.map((event) => (
                <EventItem data={event} key={event.id} />
            ))}
            <span className="circle" />
        </div>
    </div>
)

const EventItem = ({ data }) => (
    <div className="event-item">
        <span>
            <img src={getEventIcon(data.type)} alt="Event icon" />
        </span>
        <div>
            <h4>{data.text}</h4>
            <time>{data.time.start}-{data.time.end}</time>
        </div>

        <br />
    </div>
)

export default Timeline;