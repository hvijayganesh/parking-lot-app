const { ParkingSpotType } = require("../ParkingSpot/ParkingSpotType");
const { ParkingFee } = require("./ParkingFee");
const { ParkingSpotFee } = require("./ParkingSpotFee");

class StadiumParkingFee extends ParkingFee {
  constructor() {
    super();
    this.addParkingFee();
  }

  // intialize to default values - #fornow
  // can be refactored to add it while creating a parking a lot
  addParkingFee() {
    // TwoWheeler spot
    this.parkingFee.set(ParkingSpotType.TWO_WHEELER, [
      new ParkingSpotFee(ParkingSpotType.TWO_WHEELER, 4, 30),
      new ParkingSpotFee(ParkingSpotType.TWO_WHEELER, 12, 60),
      new ParkingSpotFee(ParkingSpotType.TWO_WHEELER, "Infinity", 100),
    ]);
    // Car Spot
    this.parkingFee.set(ParkingSpotType.CAR, [
      new ParkingSpotFee(ParkingSpotType.CAR, 4, 60),
      new ParkingSpotFee(ParkingSpotType.CAR, 12, 120),
      new ParkingSpotFee(ParkingSpotType.CAR, "Infinity", 200),
    ]);
  }

  calculateFee(hoursParked, parkingSpotType) {
    const parkingSpotFeesForSpotType = this.getParkingFee(parkingSpotType);
    // Set the initial fee to the initial fee for this venue
    let fee = this.initialFee;

    // Loop through the hourly rates and add the appropriate rate for each interval
    let intervalStart = 0;
    for (const parkingSpotFee of parkingSpotFeesForSpotType) {
      const intervalEnd = parkingSpotFee.getIntervalEnd();
      const hourlyRate = parkingSpotFee.getHourlyRate();

      if (intervalStart <= hoursParked && hoursParked < intervalEnd) {
        // calculate per-hour rate if hours parked is after all intervals
        if (intervalEnd === parkingSpotFee.getMaxIntervalEnd()) {
          const hoursInInterval = Math.floor(hoursParked) - intervalStart;
          fee += hoursInInterval * hourlyRate;
        } else {
          // calculate if hours parked is within current interval
          fee += hourlyRate;
          break;
        }
      }

      // calculate sum of all previous interval fees
      if (hoursParked >= intervalEnd) {
        fee += hourlyRate;
      }

      // Set the start of the next interval to the end of the current interval
      intervalStart = intervalEnd;
    }

    // Return the calculated fee
    return fee;
  }
}

module.exports = {
  StadiumParkingFee,
};
