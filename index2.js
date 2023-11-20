const { nextISSTimesForMyLocation } = require('./isspromises.js');

nextISSTimesForMyLocation()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
