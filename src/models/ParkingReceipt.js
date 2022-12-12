class ParkingReceipt {
  constructor(receiptNumber, startTime, endTime, fees) {
    this.receiptNumber = receiptNumber;
    this.startTime = startTime;
    this.endTime = endTime;
    this.fees = fees;
  }

  setReceiptNumber(receiptNumber) {
    this.receiptNumber = receiptNumber;
  }

  setStartTime(startTime) {
    this.startTime = startTime;
  }

  setEndTime(endTime) {
    this.endTime = endTime;
  }

  setFees(fees) {
    this.fees = fees;
  }

  getReceiptNumber() {
    return this.receiptNumber;
  }

  getEntryTime() {
    return this.startTime;
  }

  getExitTime() {
    return this.endTime;
  }

  getFees() {
    return this.fees;
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

module.exports = {
  ParkingReceipt,
};
