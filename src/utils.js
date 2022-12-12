const moment = require('moment');

const formatDateTimeIn24Hours = (dateTime) => {
  return moment(dateTime).format("DD-MMM-YYYY HH:mm:ss")
};

const getDurationInHours = (startTime, endTime) => {
  return Math.abs((endTime - startTime) / 3600000);
};

const convertHoursToDays = (hours) => {
  return Math.ceil(hours / 24);
};

module.exports = {
  formatDateTimeIn24Hours,
  getDurationInHours,
  convertHoursToDays,
};
