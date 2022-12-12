const { convertHoursToDays } = require("../../utils");
const { ParkingSpotType } = require("../ParkingSpot/ParkingSpotType");
const { ParkingFee } = require("./ParkingFee");
const { ParkingSpotFee } = require("./ParkingSpotFee");

class AirportParkingFee extends ParkingFee {
  constructor() {
    super();
    this.addParkingFee();
  }

  // intialize to default values - #fornow
  // can be refactored to add it while creating a parking a lot
  addParkingFee() {
    // TwoWheeler spot
    this.parkingFee.set(ParkingSpotType.TWO_WHEELER, [
      new ParkingSpotFee(ParkingSpotType.TWO_WHEELER, 1, 0),
      new ParkingSpotFee(ParkingSpotType.TWO_WHEELER, 8, 40),
      new ParkingSpotFee(ParkingSpotType.TWO_WHEELER, 24, 60),
      new ParkingSpotFee(ParkingSpotType.TWO_WHEELER, "Infinity", 80),
    ]);
    // Car Spot
    this.parkingFee.set(ParkingSpotType.CAR, [
      new ParkingSpotFee(ParkingSpotType.CAR, 12, 60),
      new ParkingSpotFee(ParkingSpotType.CAR, 24, 80),
      new ParkingSpotFee(ParkingSpotType.CAR, "Infinity", 100),
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

      if (this.isParkedForMoreThanADay(intervalStart)) {
        const days = convertHoursToDays(hoursParked);
        fee = days * hourlyRate;
        break;
      }

      if (intervalStart <= hoursParked && hoursParked < intervalEnd) {
        fee = hourlyRate;
        break;
      }

      // Set the start of the next interval to the end of the current interval
      intervalStart = intervalEnd;
    }

    return fee;
  }

  isParkedForMoreThanADay(intervalEnd) {
    return intervalEnd >= 24;
  }
}

module.exports = {
  AirportParkingFee,
};
