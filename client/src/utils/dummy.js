import API from "./api";

export default {
  createData: function() {
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
              name: "Event #1"
            })
              .then(res3 => console.log(res3.data))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
};
