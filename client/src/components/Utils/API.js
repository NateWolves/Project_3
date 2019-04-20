import axios from "./node_modules/axios";

// Access this with API.search(query) as method call inside a Component
// Example queries = "?location=-48.85667052,2.35229362&radius=500&types=food&name=harbour"
// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?parameters
// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
// ----radius — Defines the distance (in meters) within which to return place results. The maximum allowed radius is 50 000 meters. Note that radius must not be included if rankby=distance (described under Optional parameters below) is specified.
// ----If rankby=distance (described under Optional parameters below) is specified, then one or more of keyword, name, or type is required.
// https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=YOUR_API_KEY

export default {
    nearBySearch: function(queryObj){
        return axios.get("/api/nearby/", queryObj );
    },
    findPlaceFromText: function(queryObj){
        return axios.get("/api/location/",  queryObj);
    },

}