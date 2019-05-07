const router = require("express").Router();
const axios = require("axios");
const auth = require('../../middleware/auth')
//Server API routes
const googleURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const apiKey = "&key=" + process.env.GOOGLE_API_KEY;
const textURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="
// example search string below
// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY


router.get("/location", auth, (req, res) => {
  console.log(req.query);
  // need to convert all spaces in strings to % and miles/kms to meters for radius
  let input = req.query
  let formatSearch =  input.replace(" ", "%20")
  let searchString= textURL + formatSearch + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry"
  axios.get(searchString + apiKey).then( response => {
    console.log(response.data)
    let responseData = response.data
    res.json(responseData)
   }).catch( err => console.log(err))

});



router.get("/nearby", auth, (req, res) =>{
    // Need to convert all spaces in strings to % and miles/kms to meters for radius.
    let searchString = `${googleURL}?location=${req.query.location}&radius=${req.query.radius}&type=${req.query.type}`
    console.log(searchString + apiKey);
   axios.get(searchString + apiKey).then( response => {
    console.log(response.data)
    let returnedData = response.data
    res.json(returnedData)
   }).catch( err => console.log(err))
  
});

module.exports = router;