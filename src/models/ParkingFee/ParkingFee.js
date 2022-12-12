class ParkingFee {
  constructor(initialFee = 0) {
    this.initialFee = initialFee;
    this.parkingFee = new Map();
  }

  getParkingFee(parkingSpotType) {
    return this.parkingFee.get(parkingSpotType);
  }

  // default fee modal: Per-hour flat fees #assumption
  calculateFee(hoursParked, parkingSpotType) {
    const parkingSpotFeesForSpotType = this.getParkingFee(parkingSpotType);
    // Set the initial fee to the initial fee for this venue
    let fee = this.initialFee;
    for (const parkingSpotFee of parkingSpotFeesForSpotType) {
      const hourlyRate = parkingSpotFee.getHourlyRate();
      fee += Math.ceil(hoursParked) * hourlyRate;
    }
    return fee;
  }
}

module.exports = {
  ParkingFee,
};
