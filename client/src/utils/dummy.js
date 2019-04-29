import API from "./api";

export default {
  createData: function () {
    API.createUser({ userId: "testUser" })
      .then(res => {
        console.log("User created: ", res.data);
        API.createTrip({
          userId: res.data._id,
          name: "Trip #1",
          startDate: Date.now(),
          endDate: Date.now()
        })
          .then(res2 => {
            console.log("Trip created: ", res2.data);
            API.createEvent({
              tripId: res2.data._id,
              name: "Corner Cafe",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "meal"
            })
              .then(res3 => console.log("Event created: ", res3.data))
              .catch(err => console.log(err));
            API.createEvent({
              tripId: res2.data._id,
              name: "Go to the Nelson",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "museum"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Walk around Loose",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "park"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Friends Sushi",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "meal"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Succotash",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "meal"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Explore Kansas City",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "explore"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Taj Palace",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "meal"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Flaming Lips",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "concert"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Cozy's Cafe",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "meal"
            });
            API.createEvent({
              tripId: res2.data._id,
              name: "Pet Sematary",
              startDate: Date.now(),
              endDate: Date.now(),
              type: "movie"
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
};
