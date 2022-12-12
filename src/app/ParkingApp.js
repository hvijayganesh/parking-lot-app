const { BadDataError } = require("../errors");
const { Address } = require("../models/Address");
const { ParkingFloor } = require("../models/ParkingFloor");
const { ParkingLot } = require("../models/ParkingLot");
const { Vehicle } = require("../models/Vehicle/Vehicle");
const { CarParkingSpot } = require("../models/ParkingSpot/CarParkingSpot");
const { LargeParkingSpot } = require("../models/ParkingSpot/LargeParkingSpot");
const { TwoWheelerParkingSpot } = require("../models/ParkingSpot/TwoWheelerParkingSpot");
const { ParkingSpotType } = require("../models/ParkingSpot/ParkingSpotType");
const { formatDateTimeIn24Hours } = require("../utils");
const { EntryTerminal } = require("../models/Terminal/EntryTerminal");
const { ExitTerminal } = require("../models/Terminal/ExitTerminal");

class ParkingApp {
  constructor() {
    this.parkingLot = null;
  }

  createParkingLot(name, feeModel, twoWheelerSpotCount = 0, carSpotCount = 0, busSpotCount = 0) {
    if (this.parkingLot) {
      throw new BadDataError(
        "A parking lot has already been created for this app. " +
          "Only one parking lot can be used at one time. " +
          "Call reset to reset this app"
      );
    }

    const address = new Address("sajapur road", "Bangalore", "Karnataka", "560035");
    const allSpots = this.createParkingSpots(twoWheelerSpotCount, carSpotCount, busSpotCount);
    const parkingFloor = new ParkingFloor("1", allSpots);
    const parkingFloors = [parkingFloor];
    this.parkingLot = new ParkingLot(name, address, feeModel, parkingFloors);

    return `Created a parking lot`;
  }

  // entryTimeForTesting - for testing purpose only, checking different durations
  park(vehicleType, entryTimeForTesting) {
    const vehicle = new Vehicle();
    vehicle.setVehicleType(vehicleType);

    const entryTerminal = new EntryTerminal(1, this.parkingLot);
    const ticket = entryTerminal.assignTicket(vehicle, entryTimeForTesting);

    return (
      `Ticket has been created.\n` +
      `Ticket No: ${ticket.getTicketNumber()}\n` +
      `Spot No: ${ticket.getAllocatedSpotId()}\n` +
      `Entry Time: ${formatDateTimeIn24Hours(ticket.getEntryTime())}\n`
    );
  }

  unPark(vehicleType, ticketNumber) {
    const exitTerminal = new ExitTerminal(1, this.parkingLot);
    const receipt = exitTerminal.scanAndVacate(Number(ticketNumber));

    return (
      `Receipt has been generated.\n` +
      `Receipt No: ${receipt.getReceiptNumber()}\n` +
      `Entry Time: ${formatDateTimeIn24Hours(receipt.getEntryTime())}\n` +
      `Exit Time: ${formatDateTimeIn24Hours(receipt.getExitTime())}\n` +
      `Fees: ${receipt.getFees()}`
    );
  }

  reset() {
    this.parkingLot = null;
  }

  // private method used for creating parking spots for simulation
  createParkingSpots(twoWheelerSpotCount, carSpotCount, busSpotCount) {
    const allSpots = new Map();
    if (twoWheelerSpotCount !== 0) {
      const twoWheelerSpot = new Map();
      for (let i = 1; i <= twoWheelerSpotCount; i++) {
        twoWheelerSpot.set(`T${i}`, new TwoWheelerParkingSpot(`T${i}`, ParkingSpotType.TWO_WHEELER));
      }
      allSpots.set(ParkingSpotType.TWO_WHEELER, twoWheelerSpot);
    }

    if (carSpotCount !== 0) {
      const carSpot = new Map();
      for (let i = 1; i <= carSpotCount; i++) {
        carSpot.set(`C${i}`, new CarParkingSpot(`C${i}`, ParkingSpotType.CAR));
      }
      allSpots.set(ParkingSpotType.CAR, carSpot);
    }

    if (busSpotCount !== 0) {
      const largeSpot = new Map();
      for (let i = 1; i <= busSpotCount; i++) {
        largeSpot.set(`L${i}`, new LargeParkingSpot(`L${i}`, ParkingSpotType.LARGE));
      }
      allSpots.set(ParkingSpotType.LARGE, largeSpot);
    }

    return allSpots;
  }
}

module.exports = {
  ParkingApp,
};
