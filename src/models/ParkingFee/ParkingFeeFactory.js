const { FeeModel } = require("../FeeModel");
const { AirportParkingFee } = require("./AirportParkingFee");
const { MallParkingFee } = require("./MallParkingFee");
const { ParkingFee } = require("./ParkingFee");
const { StadiumParkingFee } = require("./StadiumParkingFee");

class ParkingFeeFactory {
  constructor() {}

  getInstance(feeModel) {
    switch (feeModel) {
      case FeeModel.MALL:
        return new MallParkingFee();
      case FeeModel.STADIUM:
        return new StadiumParkingFee();
      case FeeModel.AIRPORT:
        return new AirportParkingFee();
      default:
        return new ParkingFee();
    }
  }
}

module.exports = {
  ParkingFeeFactory,
};
