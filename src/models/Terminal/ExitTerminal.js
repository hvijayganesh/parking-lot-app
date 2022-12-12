const { BadDataError } = require("../../errors");
const { getDurationInHours } = require("../../utils");
const { ParkingFeeFactory } = require("../ParkingFee/ParkingFeeFactory");
const { ParkingReceipt } = require("../ParkingReceipt");

class ExitTerminal {
  constructor(id, parkingLot) {
    this.id = id;
    this.parkingLot = parkingLot;
    this.parkingFeeFactory = new ParkingFeeFactory();
  }

  scanAndVacate(parkingTicketId) {
    const ticket = this.parkingLot.getReservedTicket(parkingTicketId);
    const parkingSpot = this.parkingLot.vacateParkingSpot(ticket.getAllocatedSpotId());
    if (parkingSpot == null) {
      throw new BadDataError("Invalid ticket details!");
    }
    const receipt = this.generateReceipt(ticket, parkingSpot.getParkingSpotType());
    return receipt;
  }

  generateReceipt(parkingTicket, parkingSpotType) {
    const receipt = new ParkingReceipt();
    const endTime = new Date();
    receipt.setReceiptNumber(ParkingReceipt.incrementId());
    receipt.setStartTime(parkingTicket.getEntryTime());
    receipt.setEndTime(endTime);
    receipt.setFees(this.calculateCost(receipt, parkingSpotType));
    return receipt;
  }

  calculateCost(parkingReceipt, parkingSpotType) {
    const parkingFeeInstance = this.parkingFeeFactory.getInstance(this.parkingLot.getFeeModel());
    const hoursParked = getDurationInHours(parkingReceipt.getEntryTime(), parkingReceipt.getExitTime());
    const amount = parkingFeeInstance.calculateFee(hoursParked, parkingSpotType);
    return amount;
  }
}

module.exports = {
  ExitTerminal,
};
