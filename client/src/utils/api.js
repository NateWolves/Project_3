import axios from "axios";

export default {
  findAllEvents: function(userId) {
    axios.get(`/api/events/${userId}`)
      .then(res => console.log(res.data));
  },
  createEvent: function(userId) {
    axios.post(`/api/events/${userId}`)
      .then(res => res.data);
  },
  updateEvent:  function(userId, eventId) {
    axios.put(`/api/events/${userId}/${eventId}`)
      .then(res => res.data);
  },
  deleteEvent: function(userId, eventId) {
    axios.delete(`/api/events/${userId}/${eventId}`)
      .then(res => res.data);
  }
}
