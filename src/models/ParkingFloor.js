const { ParkingNotAllowedError, ParkingSpotAlreadyVacatedError } = require("../errors");
const { ParkingSpotType } = require("./ParkingSpot/ParkingSpotType");
const { VehicleType } = require("./Vehicle/VehicleType");

class ParkingFloor {
  constructor(floorNumber, parkingSpots) {
    this.floorNumber = floorNumber;
    this.parkingSpots = parkingSpots;
  }

  canPark(parkingSpotType) {
    if (this.parkingSpots.has(parkingSpotType)) {
      return true;
    }
    return false;
  }

  getSpot(vehicle) {
    const vehicleType = vehicle.getVehicleType();
    const parkingSpotType = this.pickCorrectSpot(vehicleType);

    if (this.canPark(parkingSpotType) === false) {
      throw new ParkingNotAllowedError(`${vehicleType} is not allowed to park`);
    }

    const relevantParkingSpot = this.parkingSpots.get(parkingSpotType);
    let spot = null;
    for (const currentSpot of relevantParkingSpot.values()) {
      if (currentSpot.isFreeSpot()) {
        spot = currentSpot;
        spot.assignVehicleToSpot(vehicle);
        break;
      }
    }

    return spot;
  }

  pickCorrectSpot(vehicleType) {
    switch (vehicleType) {
      case VehicleType.MOTORCYLE:
      case VehicleType.SCOOTER:
        return ParkingSpotType.TWO_WHEELER;
      case VehicleType.CAR:
      case VehicleType.SUV:
        return ParkingSpotType.CAR;
      case VehicleType.BUS:
      case VehicleType.TRUCK:
        return ParkingSpotType.LARGE;
      default:
        return null;
    }
  }

  vacateSpot(parkingSpotId) {
    for (const parkingSpots of this.parkingSpots.values()) {
      if (parkingSpots.has(parkingSpotId)) {
        const spot = parkingSpots.get(parkingSpotId);
        if (spot.isFreeSpot()) {
          throw new ParkingSpotAlreadyVacatedError("Spot has been already vacated");
        }
        spot.freeSpot();
        return spot;
      }
    }
    return null;
  }
}

module.exports = {
  ParkingFloor,
};
