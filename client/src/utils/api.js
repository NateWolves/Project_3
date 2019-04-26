import axios from "axios";

export default {
  findUser: function(userId) {
    return axios.get(`/api/users/${userId}`);
  },


  findAllEvents: function(userId) {
    return axios.get(`/api/events/${userId}`);
  },
  createEvent: function(userId, data) {
    return axios.post(`/api/events/${userId}`, data);
  },
  updateEvent:  function(userId, eventId, data) {
    return axios.put(`/api/events/${userId}/${eventId}`, data);
  },
  deleteEvent: function(userId, eventId, data) {
    return axios.delete(`/api/events/${userId}/${eventId}`, data);
  }
}
