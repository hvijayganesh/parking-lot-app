const { Address } = require("../../src/models/Address");
const { ParkingFloor } = require("../../src/models/ParkingFloor");
const { ParkingLot } = require("../../src/models/ParkingLot");
const { Vehicle } = require("../../src/models/Vehicle/Vehicle");
const { VehicleType } = require("../../src/models/Vehicle/VehicleType");
const { FeeModel } = require("../../src/models/FeeModel");
const { createSpots } = require("../testHelper");
const { ParkingNotAllowedError, ParkingSpotAlreadyVacatedError } = require("../../src/errors");

const assert = require("chai").assert;

describe("ParkingLot -> getParkingSpotForVehicleAndPark", () => {
  describe("parking spot allocation in mall", () => {
    const allSpots = createSpots(1, 1, 1);
    const parkingFloor = new ParkingFloor("1", allSpots);
    const lot = new ParkingLot("MyParkingLot1", null, FeeModel.MALL, [parkingFloor]);

    it("allocate a parking spot for a motorcyle", () => {
      const spot = lot.getParkingSpotForVehicleAndPark(new Vehicle(VehicleType.MOTORCYLE));
      assert.equal(spot.getParkingSpotId(), "T1");
      assert.isFalse(spot.isFreeSpot());
    });

    it("no spot should be allocated for another motorcyle", () => {
      const spot = lot.getParkingSpotForVehicleAndPark(new Vehicle(VehicleType.MOTORCYLE));
      assert.isNull(spot);
    });

    it("no spot should be allocated when the lot has no floors built", () => {
      lot.parkingFloors = [];
      const spot = lot.getParkingSpotForVehicleAndPark(new Vehicle(VehicleType.CAR));
      assert.isNull(spot);
    });
  });

  describe("parking spot allocation in stadium", () => {
    const allSpots = createSpots(1, 1, 0); // no parking spots for bus/trucks, hence 0 as third param
    const parkingFloor = new ParkingFloor("1", allSpots);
    const lot = new ParkingLot("MyParkingLot1", null, FeeModel.MALL, [parkingFloor]);

    it("allocate a parking spot for a car", () => {
      const spot = lot.getParkingSpotForVehicleAndPark(new Vehicle(VehicleType.CAR));
      assert.equal(spot.getParkingSpotId(), "C1");
      assert.isFalse(spot.isFreeSpot());
    });

    it("expect to throw error for not allowed vehicles", () => {
      assert.throws(() => {
        lot.getParkingSpotForVehicleAndPark(new Vehicle(VehicleType.BUS));
      }, ParkingNotAllowedError);
    });
  });

  describe("vacating a spot in mall", () => {
    const allSpots = createSpots(1, 1, 1);
    const parkingFloor = new ParkingFloor("1", allSpots);
    const lot = new ParkingLot("MyParkingLot1", null, FeeModel.MALL, [parkingFloor]);
    const spot = lot.getParkingSpotForVehicleAndPark(new Vehicle(VehicleType.MOTORCYLE));

    it("motorcyle vacates the spot", () => {
      const vacatedSpot = lot.vacateParkingSpot(spot.getParkingSpotId());
      assert.equal(vacatedSpot.getParkingSpotId(), "T1");
      assert.isTrue(vacatedSpot.isFreeSpot());
    });

    it("expert to throw error when motorcyle vacates the same spot again", () => {
      assert.throws(() => {
        lot.vacateParkingSpot(spot.getParkingSpotId());
      }, ParkingSpotAlreadyVacatedError);
    });
  });
});
