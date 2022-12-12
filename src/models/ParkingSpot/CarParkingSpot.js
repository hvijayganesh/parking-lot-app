const { ParkingSpot } = require("./ParkingSpot");
const { ParkingSpotType } = require("./ParkingSpotType");

class CarParkingSpot extends ParkingSpot {
  constructor(parkingSpotId) {
    super(parkingSpotId, ParkingSpotType.CAR);
  }
}

module.exports = {
  CarParkingSpot,
};
