const { BadDataError } = require("../errors");
const { FeeModel } = require("./FeeModel");

class ParkingLot {
  constructor(name, address, feeModel, parkingFloors = []) {
    this.name = name;
    this.address = address;
    this.feeModel = FeeModel[feeModel.toUpperCase()];
    this.parkingFloors = parkingFloors;
    this.reservedTickets = new Map();
  }

  getParkingSpotForVehicleAndPark(vehicle) {
    let parkingSpot = null;
    for (const floor of this.parkingFloors) {
      parkingSpot = floor.getSpot(vehicle);
      if (parkingSpot != null) {
        break;
      }
    }
    return parkingSpot;
  }

  vacateParkingSpot(parkingSpotId) {
    for (let parkingFloor of this.parkingFloors) {
      const parkingSpot = parkingFloor.vacateSpot(parkingSpotId);
      if (parkingSpot != null) {
        return parkingSpot;
      }
    }
    return null;
  }

  addReservedTicket(ticket) {
    this.reservedTickets.set(ticket.getTicketNumber(), ticket);
  }

  getReservedTicket(parkingTicketId) {
    if (this.reservedTickets.has(parkingTicketId)) {
      return this.reservedTickets.get(parkingTicketId);
    }
    throw new BadDataError("Invalid Parking Ticket!");
  }

  getFeeModel() {
    return this.feeModel;
  }
}

module.exports = {
  ParkingLot,
};
