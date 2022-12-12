const { ParkingFloor } = require("../../src/models/ParkingFloor");
const { ParkingLot } = require("../../src/models/ParkingLot");
const { FeeModel } = require("../../src/models/FeeModel");
const { createSpots } = require("../testHelper");
const { ExitTerminal } = require("../../src/models/Terminal/ExitTerminal");
const { ParkingTicket } = require("../../src/models/ParkingTicket");
const tk = require("timekeeper");
const assert = require("chai").assert;
const expect = require("chai").expect;
const sinon = require("sinon");
const { ParkingSpot } = require("../../src/models/ParkingSpot/ParkingSpot");
const { ParkingSpotType } = require("../../src/models/ParkingSpot/ParkingSpotType");
const { ParkingReceipt } = require("../../src/models/ParkingReceipt");
const { BadDataError } = require("../../src/errors");

describe("ExitTerminal -> scanAndVacate", () => {
  describe("vacate the spot and generate a receipt", () => {
    const allSpots = createSpots(2, 1, 1);
    const parkingFloor = new ParkingFloor("1", allSpots);
    const lot = new ParkingLot("MyParkingLot2", null, FeeModel.MALL, [parkingFloor]);
    const exitTerminal = new ExitTerminal(1, lot);

    it("valid receipt with number, entry and exit time should be created", () => {
      const ticket = new ParkingTicket(001, "T1");
      const getReservedTicketStub = sinon.stub(exitTerminal.parkingLot, "getReservedTicket").returns(ticket);
      const vacateParkingSpotStub = sinon
        .stub(exitTerminal.parkingLot, "vacateParkingSpot")
        .returns(new ParkingSpot("T1", ParkingSpotType.TWO_WHEELER));
      const generateReceiptStub = sinon.stub(exitTerminal, "generateReceipt").returns(new ParkingReceipt("R-001"));
      const receipt = exitTerminal.scanAndVacate(001);
      expect(getReservedTicketStub.calledOnce).to.be.true;
      expect(getReservedTicketStub.calledWith(001));
      expect(vacateParkingSpotStub.calledOnce).to.be.true;
      expect(vacateParkingSpotStub.calledWith("T1"));
      expect(generateReceiptStub.calledOnce).to.be.true;
      expect(generateReceiptStub.calledWith(ticket, ParkingSpotType.TWO_WHEELER));
      assert.equal(receipt.getReceiptNumber(), "R-001");
      getReservedTicketStub.restore();
      vacateParkingSpotStub.restore();
      generateReceiptStub.restore();
    });

    it("expect to throw error when invalid ticket id is provided", () => {
      assert.throws(() => {
        exitTerminal.scanAndVacate(123456);
      }, BadDataError);
    });

    it("expect to throw error when ticket contains invalid spot number", () => {
      assert.throws(() => {
        const ticket = new ParkingTicket(001, "T1");
        const getReservedTicketStub = sinon.stub(exitTerminal.parkingLot, "getReservedTicket").returns(ticket);
        const vacateParkingSpotStub = sinon.stub(exitTerminal.parkingLot, "vacateParkingSpot").returns(null);
        exitTerminal.scanAndVacate(001);
        getReservedTicketStub.restore();
        vacateParkingSpotStub.restore();
      }, BadDataError);
    });
  });
});

describe("ExitTerminal -> generateReceipt", () => {
  describe("generate receipt for a vehicle", () => {
    const allSpots = createSpots(2, 1, 1);
    const parkingFloor = new ParkingFloor("1", allSpots);
    const lot = new ParkingLot("MyParkingLot2", null, FeeModel.MALL, [parkingFloor]);
    const exitTerminal = new ExitTerminal(1, lot);

    it("valid receipt with number, entry and exit time should be created", () => {
      const entryTime = new Date("29-May-2022 14:04:07");
      const exitTime = new Date("29-May-2022 17:44:07");
      tk.freeze(entryTime);
      tk.freeze(exitTime);
      const stub = sinon.stub(exitTerminal, "calculateCost").returns(40);
      const receipt = exitTerminal.generateReceipt(new ParkingTicket(001, "T1", entryTime));
      expect(stub.calledOnce).to.be.true;
      assert.equal(receipt.getReceiptNumber(), 1);
      assert.deepEqual(receipt.getEntryTime(), entryTime);
      assert.deepEqual(receipt.getExitTime(), exitTime);
      assert.equal(receipt.getFees(), 40);
      tk.reset();
      tk.reset();
    });
  });
});
