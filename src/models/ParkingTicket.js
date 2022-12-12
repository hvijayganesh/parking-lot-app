class ParkingTicket {
  constructor(ticketNumber, parkingSpotId, startTime = new Date()) {
    this.ticketNumber = ticketNumber;
    this.parkingSpotId = parkingSpotId;
    this.startTime = startTime;
  }

  setTicketNumber(ticketNumber) {
    this.ticketNumber = ticketNumber;
  }

  setParkingSpotId(spotId) {
    this.parkingSpotId = spotId;
  }

  setStartTime(startTime) {
    this.startTime = startTime;
  }

  getTicketNumber() {
    return this.ticketNumber;
  }

  getAllocatedSpotId() {
    return this.parkingSpotId;
  }

  getEntryTime() {
    return this.startTime;
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

module.exports = {
  ParkingTicket,
};
