const { ParkingLotFullError } = require("../../errors");
const { ParkingTicket } = require("../ParkingTicket");

class EntryTerminal {
  constructor(id, parkingLot) {
    this.id = id;
    this.parkingLot = parkingLot;
  }

  // entryTimeForTesting - test argument for testing purpose only.
  assignTicket(vehicle, entryTimeForTesting) {
    const parkingSpot = this.parkingLot.getParkingSpotForVehicleAndPark(vehicle);
    if (parkingSpot == null) {
      throw new ParkingLotFullError("No Space Available");
    }
    const ticket = this.createTicketForSpot(parkingSpot, entryTimeForTesting);
    this.parkingLot.addReservedTicket(ticket);
    return ticket;
  }

  createTicketForSpot(parkingSpot, entryTimeForTesting) {
    const ticket = new ParkingTicket();
    ticket.setTicketNumber(ParkingTicket.incrementId());
    ticket.setParkingSpotId(parkingSpot.getParkingSpotId());
    ticket.setStartTime(entryTimeForTesting ? new Date(entryTimeForTesting) : new Date());
    return ticket;
  }
}

module.exports = {
  EntryTerminal,
};
