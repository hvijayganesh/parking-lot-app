/**
 * Raised when no ParkingSpot can be found
 */
class ParkingLotFullError extends Error {}

/**
 * Raised when an function gets invalid/bad data
 */
class BadDataError extends Error {}

/**
 * Raised when parking restrictions are there
 */
class ParkingNotAllowedError extends Error {}

/**
 * Raised when we try to vacate an already free spot
 */
class ParkingSpotAlreadyVacatedError extends Error {}

module.exports = {
  ParkingLotFullError,
  BadDataError,
  ParkingNotAllowedError,
  ParkingSpotAlreadyVacatedError,
};
