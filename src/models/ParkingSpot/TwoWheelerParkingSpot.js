const { ParkingSpot } = require("./ParkingSpot");
const { ParkingSpotType } = require("./ParkingSpotType");

class TwoWheelerParkingSpot extends ParkingSpot {
  constructor(parkingSpotId) {
    super(parkingSpotId, ParkingSpotType.TWO_WHEELER);
  }
}

module.exports = {
  TwoWheelerParkingSpot,
};
