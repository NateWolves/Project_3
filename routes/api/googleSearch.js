const router = require("express").Router();
const axios = require("axios");
const auth = require('../../middleware/auth')
//Server API routes
const googleURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const apiKey = "&key=" + process.env.GOOGLE_API_KEY;
const textURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="
const photoURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="
// example search string below
// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY


router.get("/location", (req, res) => {
  let input = req.query.search
  console.log(input)
  let searchString= textURL + input + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry"
  axios.get(searchString + apiKey).then( response => {
    console.log(response.data)
    let responseData = response.data
    res.json(responseData)
   }).catch( err => console.log(err))

});



router.get("/nearby", auth, (req, res) =>{
    // Need to convert all miles/kms to meters for radius.
    let searchString = `${googleURL}?location=${req.query.location}&radius=${req.query.radius}&type=${req.query.type}`
    console.log(searchString + apiKey);
   axios.get(searchString + apiKey).then( response => {
    console.log(response.data)
    let returnedData = response.data
    res.json(returnedData)
   }).catch( err => console.log(err))
});

router.get("/photo", (req, res) => {
  let searchString = photoURL + req.query.photo
  
  axios.get(searchString + apiKey).then( response => {
    console.log(response.data)
    let returnedData = response.data
    res.json(returnedData)
   }).catch( err => console.log(err))
})

module.exports = router;