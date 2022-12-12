class ParkingSpot {
  constructor(parkingSpotId, parkingSpotType) {
    this.parkingSpotId = parkingSpotId;
    this.parkingSpotType = parkingSpotType;
    this.isFree = true;
  }

  isFreeSpot() {
    return this.isFree;
  }

  assignVehicleToSpot(vehicle) {
    this.assignedVehicle = vehicle;
    this.isFree = false;
  }

  freeSpot() {
    this.isFree = true;
    this.assignedVehicle = null;
  }

  getParkingSpotId() {
    return this.parkingSpotId;
  }

  getParkingSpotType() {
    return this.parkingSpotType;
  }
}

module.exports = {
  ParkingSpot,
};
