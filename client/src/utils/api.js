import axios from "axios";

export default {
  // User methods
  findUser: function(userId) {
    return axios.get(`/api/users/${userId}`);
  },
  createUser: function(userId) {
    return axios.post(`/api/users/${userId}`);
  },

  // Trip methods
  findTripsByUser: function(userId) {
    return axios.get(`/api/trips/${userId}`);
  },
  createTrip: function(userId) {
    return axios.post(`/api/trips/${userId}`);
  },
  updateTrip: function(userId, tripId) {
    return axios.put(`/api/trips/${userId}/${tripId}`)
  },
  deleteTrip: function(userId, tripId) {
    return axios.delete(`/api/trips/${userId}/${tripId}`)
  },

  // Event methods
  findEventsByUser: function(userId) {
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
  },

  nearbySearch: function(searchObj) {
    return axios.get(`/api/nearby`, searchObj)
  },
  textSearch: function(query) {
    return axios.get(`/api/location/${query}`)
  }
}
