class ParkingSpotFee {
  constructor(parkingSpotType, intervalEnd, hourlyRate) {
    this.parkingSpotType = parkingSpotType;
    this.intervalEnd = intervalEnd === "Infinity" ? this.getMaxIntervalEnd() : intervalEnd;
    this.hourlyRate = hourlyRate;
  }

  getMaxIntervalEnd() {
    return Number.MAX_SAFE_INTEGER;
  }

  getIntervalEnd() {
    return this.intervalEnd;
  }

  getHourlyRate() {
    return this.hourlyRate;
  }
}

module.exports = {
  ParkingSpotFee,
};
