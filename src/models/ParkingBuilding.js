const { ParkingFloor } = require("./ParkingFloor");

class ParkingBuilding {
  constructor(blockNumber) {
    this.blockNumber = blockNumber;
    this.parkingFloors = [];
  }
}

module.exports = {
  ParkingBuilding,
};
