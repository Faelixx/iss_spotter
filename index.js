const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP(fetchMyIP((error, ip)=> {
//   if (error) {
//     console.log("It didnt work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
//   return ip;
// }) , (error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP("8.8.4.4", (error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('Retrieving available data for:', ip);
// });


// fetchISSFlyOverTimes(latLong, (error, desc) => {
//   if (error) {
//     console.log(error);
//   }
//   if (desc) {
//     console.log(desc);
//   }
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error)
  }
  console.log(passTimes);
});