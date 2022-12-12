const { ParkingFloor } = require("../../src/models/ParkingFloor");
const { ParkingLot } = require("../../src/models/ParkingLot");
const { Vehicle } = require("../../src/models/Vehicle/Vehicle");
const { VehicleType } = require("../../src/models/Vehicle/VehicleType");
const { FeeModel } = require("../../src/models/FeeModel");
const { createSpots } = require("../testHelper");
const { ParkingLotFullError } = require("../../src/errors");
const { EntryTerminal } = require("../../src/models/Terminal/EntryTerminal");
const tk = require("timekeeper");

const assert = require("chai").assert;

describe("EntryTerminal -> assignTicket", () => {
  describe("assignment of ticket for a motorcyle", () => {
    const allSpots = createSpots(2, 1, 1);
    const parkingFloor = new ParkingFloor("1", allSpots);
    const lot = new ParkingLot("MyParkingLot1", null, FeeModel.MALL, [parkingFloor]);
    const entryTerminal = new EntryTerminal(1, lot);

    it("valid ticket should be created", () => {
      var entryTime = new Date("29-May-2022 14:04:07");
      tk.freeze(entryTime);
      const ticket = entryTerminal.assignTicket(new Vehicle(VehicleType.MOTORCYLE));
      assert.equal(ticket.getTicketNumber(), 1);
      assert.equal(ticket.getAllocatedSpotId(), "T1");
      assert.deepEqual(ticket.getEntryTime(), entryTime);
      tk.reset();
    });

    it("Ticket number should be auto-incremented", () => {
      const ticket = entryTerminal.assignTicket(new Vehicle(VehicleType.MOTORCYLE));
      assert.equal(ticket.getTicketNumber(), 2);
    });

    it("expect to throw error when no spots are available", () => {
      assert.throws(() => {
        entryTerminal.assignTicket(new Vehicle(VehicleType.MOTORCYLE));
      }, ParkingLotFullError);
    });

    it("Ticket should be added to list of reserved tickets", () => {
      const ticket = entryTerminal.assignTicket(new Vehicle(VehicleType.CAR));
      assert.isTrue(lot.reservedTickets.has(ticket.getTicketNumber()));
    });
  });
});
