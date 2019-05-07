import API from "./api";



export default {
  createData: function () {
    API.createUser({ userId: "testUser" })
      .then(res => {
        console.log("User created: ", res.data);   
        API.createTrip({
          userId: res.user._id,
          name: "Trip #1",
          startDate: Date.now(),
          endDate: Date.now()
        })
          .then(res2 => {
            console.log("Trip created: ", res2.data);
            API.createEvent({
              tripId: res2.data._id,
              name: "Corner Cafe",
              startDate: new Date(2019, 4, 30, 1, 10),
              endDate: new Date(2019, 4, 30, 1, 50),
              type: "meal"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Go to the Nelson",
              startDate: new Date(2019, 4, 30, 12, 0),
              endDate: new Date(2019, 4, 30, 12, 0),
              type: "museum"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Walk around Loose",
              startDate: new Date(2019, 4, 30, 13, 0),
              endDate: new Date(2019, 4, 30, 14, 0),
              type: "park"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Friends Sushi",
              startDate: new Date(2019, 4, 30, 14, 0),
              endDate: new Date(2019, 4, 30, 15, 0),
              type: "meal"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Succotash",
              startDate: new Date(2019, 5, 1, 10, 0),
              endDate: new Date(2019, 5, 1, 11, 0),
              type: "meal"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Explore Kansas City",
              startDate: new Date(2019, 5, 1, 11, 0),
              endDate: new Date(2019, 5, 1, 12, 0),
              type: "explore"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Taj Palace",
              startDate: new Date(2019, 5, 1, 13, 0),
              endDate: new Date(2019, 5, 1, 14, 30),
              type: "meal"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Flaming Lips",
              startDate: new Date(2019, 5, 1, 16, 0),
              endDate: new Date(2019, 5, 1, 17, 40),
              type: "concert"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Cozy's Cafe",
              startDate: new Date(2019, 5, 2, 10, 0),
              endDate: new Date(2019, 5, 2, 11, 0),
              type: "meal"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Pet Sematary",
              startDate: new Date(2019, 5, 2, 12, 30),
              endDate: new Date(2019, 5, 2, 15, 0),
              type: "movie"
            })
              .then(res3 => console.log("Event created: ", res3.data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
};
