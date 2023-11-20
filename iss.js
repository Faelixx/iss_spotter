/**
 * Makes a single API request to retrieve the user's IP address/
 * Input:
 *  - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *  - An error, if any (nullable)
 *  - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');
const ipFetchURL = 'https://api.ipify.org?format=json';
const geoURL = "https://ipwho.is/";

const fetchMyIP = function(callback) {
  request(ipFetchURL, (error, message, body) => {
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
  request(`${geoURL}${IP}`, (error, message, body) =>{
    if (!error && message.statusCode === 200) {
      const data = JSON.parse(body);
      if (!data["success"]) {
        console.log("Invalid IP address:", IP);
      } else {
        const latLong = {
          "latitude" : data["latitude"],
          "longitude" : data["longitude"]
        };
        // console.log(`Coordinates for ${IP}:`, latLong);
        return latLong;
      }
    }
    if (error) {
      console.log("You have an error: ", error);
    }
    if (message.statusCode !== 200) {
      console.log("There is something wrong here! Check the code: ", message.statusCode);
    }
  });
  callback(null, IP);
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords["latitude"]}&lon=${coords["longitude"]}` , (error, message, body) => {
    if (!error && message.statusCode === 200) {
      const data = JSON.parse(body);
      if (!data.response) {
        callback(`Invalid response from API. Error: ${error}, Message: ${message.statusCode}, ${body}`, null);
      } else {
        callback(null, data.response);
      }
    }
    if (error) {
      callback(`Received following error: ${error}`, null);
    }
    if (message.statusCode !== 200) {
      callback(`Received following status code: ${message.statusCode}`, null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  
}


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};