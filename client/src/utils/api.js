import axios from "axios";

export default {
  findUser: function(userId) {
    return axios.get(`/api/users/${userId}`);
  },


  findAllEvents: function(userId) {
    return axios.get(`/api/events/${userId}`);
  },
  createEvent: function(userId) {
    return axios.post(`/api/events/${userId}`);
  },
  updateEvent:  function(userId, eventId) {
    return axios.put(`/api/events/${userId}/${eventId}`);
  },
  deleteEvent: function(userId, eventId) {
    return axios.delete(`/api/events/${userId}/${eventId}`);
  }
}
