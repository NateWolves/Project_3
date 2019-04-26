const router = require("express").Router();



//Server API routes
const nearbyURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const apiKey = "&key=" + process.env.GOOGLE_API_KEY;
const textURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="
// example search sting below
// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY
router.get("/api/location", (req, res) => {
  console.log(req.query);
  // need to convert all spaces in strings to % and miles/kms to meters for radius
  let input = req.query
  let formatSearch =  input.replace(" ", "%20")
  let searchString= nearbyURL + formatSearch + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry"
  axios.get(searchString + apiKey).then( response => {
    console.log(response.data)
    let responseData = response.data
    res.json(responseData)
   }).catch( err => console.log(err))

});


// Example queries = "?location=-48.85667052,2.35229362&radius=500&type=restaurant"
router.get("/api/nearby", (req, res) =>{
    console.log(req.body)
    // Need to convert all spaces in strings to % and miles/kms to meters for radius.
    let searchString = `${nearbyURL}?location=${req.body.location}&radius${req.body.radius}&type=${req.body.type}`
    console.log(searchString);
   axios.get(searchString + apiKey).then( response => {
    console.log(response.data)
    let returnedData = response.data
    res.json(returnedData)
   }).catch( err => console.log(err))
  
});

module.exports = router;