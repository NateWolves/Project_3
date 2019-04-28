import axios from "axios";

export default {
  // User methods
  findUser: function(userId) {
    return axios.get(`/api/users/${userId}`);
  },
  createUser: function(data) {
    return axios.post(`/api/users`, data);
  },

  // Trip methods
  findTripsByUser: function(userId) {
    return axios.get(`/api/trips/${userId}`);
  },
  createTrip: function(data) {
    return axios.post(`/api/trips`, data);
  },
  updateTrip: function(tripId, data) {
    return axios.put(`/api/trips/${tripId}`, data)
  },
  deleteTrip: function(tripId) {
    return axios.delete(`/api/trips/${tripId}`)
  },

  // Event methods
  findEventsByTrip: function(tripId) {
    return axios.get(`/api/events/${tripId}`);
  },
  createEvent: function(data) {
    return axios.post(`/api/events`, data);
  },
  updateEvent:  function(eventId, data) {
    return axios.put(`/api/events/${eventId}`, data);
  },
  deleteEvent: function(eventId, data) {
    return axios.delete(`/api/events/${eventId}`, data);
  },

  nearbySearch: function(searchObj) {
    return axios.get(`/api/nearby`, searchObj)
  },
  textSearch: function(query) {
    return axios.get(`/api/location/${query}`)
  }
}
