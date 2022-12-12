const { ParkingSpotType } = require("../ParkingSpot/ParkingSpotType");
const { ParkingFee } = require("./ParkingFee");
const { ParkingSpotFee } = require("./ParkingSpotFee");

class MallParkingFee extends ParkingFee {
  constructor() {
    super();
    this.addParkingFee();
  }

  // intialize to default values - #fornow
  // can be refactored to add it while creating a parking a lot
  addParkingFee() {
    // TwoWheeler spot rate
    this.parkingFee.set(ParkingSpotType.TWO_WHEELER, [new ParkingSpotFee(ParkingSpotType.TWO_WHEELER, "Infinity", 10)]);
    // Car spot rate
    this.parkingFee.set(ParkingSpotType.CAR, [new ParkingSpotFee(ParkingSpotType.CAR, "Infinity", 20)]);
    // Large spot rate
    this.parkingFee.set(ParkingSpotType.LARGE, [new ParkingSpotFee(ParkingSpotType.CAR, "Infinity", 50)]);
  }
}

module.exports = {
  MallParkingFee,
};
