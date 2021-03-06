import axios from "axios";

export default {
  // User methods
  findUser: function(userId) {
    return axios.get(`/api/users/${userId}`);
  },
  createUser: function(data) {
    return axios.post(`/api/auth/register`, data);
  },
  loginUser: function(userData) {
    return axios.post(`/api/auth/login`, userData);
  },
  googleLogin: function(googleData) {
    return axios.post(`/api/auth/google`, googleData)
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
  deleteEvent: function(eventId) {
    return axios.delete(`/api/events/${eventId}`);
  },
  // Google API methods
  nearbySearch: function(search) {
    return axios.get(`/api/googleSearch/nearby/${search}`)
  },
  textSearch: function(query) {
    return axios.get(`/api/googleSearch/location/?search=${query}`)
  },
  photoSearch: function(query){
    return axios.get(`/api/googleSearch/photo/?photo=${query}`)
  }
}
