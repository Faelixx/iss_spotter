/**
 * Makes a single API request to retrieve the user's IP address/
 * Input:
 *  - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *  - An error, if any (nullable)
 *  - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, message, body) => {
    if (!error && message.statusCode === 200) {
      const data = JSON.parse(body);
      const tickedIP = JSON.stringify(data.ip);
      const splitIP = tickedIP.split('');
      splitIP.pop();
      splitIP.shift();
      const IP = splitIP.join('');
      callback(null, IP);
      return IP;
    } else if (message.statusCode !== 200) {
      const msg = `Status Code ${message.statusCode} when fetching IP. Response: ${body}`;
      callback(error(msg), null);
      return;
    } else {
      callback(error, null);
    }
  });
};

const fetchCoordsByIP = function(IP, callback) {
  const geoURL = "https://ipwho.is/";
  request(`${geoURL}${IP}`, (error, message, body) =>{
    if (!error && message.statusCode === 200) {
      const data = JSON.parse(body);
      const latLong = { 
        "latitude" : data["latitude"], 
        "longitiude" : data["longitude"] };
      console.log(latLong);
    }
    if (error) {
      console.log("You have an error: ", error)
    }
    if (message.statusCode !== 200) {
      console.log("There is something wrong here! Check the code: ", message.statusCode);
    }
  });
  callback(null, IP);
};


module.exports = { 
  fetchMyIP,
  fetchCoordsByIP
  };