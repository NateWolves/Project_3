const router = require("express").Router();



//Server API routes
const googleURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const apiKey = "&key=" + process.env.GOOGLE_API_KEY;

// example search sting below
// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY
router.get("/api/location", (req, res) => {
  console.log(req.body);
  // need to convert all spaces in strings to % and miles/kms to meters for radius
  let input = req.body.input
  let formatSearch =  input.replace(" ", "%")
  let searchString= googleURL + "?input=" + formatSearch + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry"
  axios.get(searchString + apiKey).then( response => {
    console.log(response.data)
    let responseData = response.data
    res.json(responseData)
   }).catch( err => console.log(err))

});



router.get("/api/nearby", (req, res) =>{
    console.log(req.body)
    // Need to convert all spaces in strings to % and miles/kms to meters for radius.
    let searchString = `${googleURL}?location=${req.body.location}&radius${req.body.radius}&type=${req.body.type}`
    console.log(searchString);
   axios.get(searchString + apiKey).then( response => {
    console.log(response.data)
    let returnedData = response.data
    res.json(returnedData)
   }).catch( err => console.log(err))
  
});

module.exports = router;