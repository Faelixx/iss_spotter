const request = require('request-promise-native');

const ipFetchURL = 'https://api.ipify.org?format=json';
const geoURL = "https://ipwho.is/";

const fetchMyIP = function() {
  return request(ipFetchURL);
};


const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip
  return request(`${geoURL}${ip}`);
}

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
  };

module.exports = { nextISSTimesForMyLocation };
