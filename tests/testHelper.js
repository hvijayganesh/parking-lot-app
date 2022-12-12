const { CarParkingSpot } = require("../src/models/ParkingSpot/CarParkingSpot");
const { LargeParkingSpot } = require("../src/models/ParkingSpot/LargeParkingSpot");
const { ParkingSpotType } = require("../src/models/ParkingSpot/ParkingSpotType");
const { TwoWheelerParkingSpot } = require("../src/models/ParkingSpot/TwoWheelerParkingSpot");

const createSpots = (twoWheelerSpotCount, carSpotCount, busSpotCount) => {
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
};

module.exports = {
  createSpots,
};
