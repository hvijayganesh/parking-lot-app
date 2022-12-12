const { ParkingSpot } = require("./ParkingSpot");
const { ParkingSpotType } = require("./ParkingSpotType");

class LargeParkingSpot extends ParkingSpot {
  constructor(parkingSpotId) {
    super(parkingSpotId, ParkingSpotType.LARGE);
  }
}

module.exports = {
  LargeParkingSpot,
};
