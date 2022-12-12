const { VehicleType } = require("./VehicleType");

class Vehicle {
  constructor(vehicleType) {
    this.vehicleType = vehicleType;
  }

  setVehicleType(type) {
    this.vehicleType = VehicleType[type.toUpperCase()];
  }

  getVehicleType() {
    return this.vehicleType;
  }
}

module.exports = {
  Vehicle,
};
