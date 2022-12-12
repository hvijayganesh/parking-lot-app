# Parking Lot Problem

## Installation

This project uses `v14.16.0` NodeJS

- Run `npm install` to install the required libraries

## Running the application

```
node index.js ./data/example1.txt
```

The above command runs the application using the input from the file and prints the output to the console.

Sample Input file

```
create_parking_lot MyParkingLot mall 2
park motorcyle
park scooter 11-Dec-2022,11:00:00
park motorcyle
unpark scooter 2
park motorcyle
unpark motorcyle 1
```

- Each line in the file should have only one command along with its args
- All the arguments should be separated by spaces

### Parking Lot Commands explained


`create_parking_lot` - creates the parking lot with name, feemodel and number of spots for different vehicles
```
create_parking_lot {name} {feeModel} {twoWheelerSpotCount} {carSpotCount} {busSpotCount}
```
- feeModel - supported fee models can be found in src/models/Vehicle/VehicleType.js
- if particular lot doesn't allow a vehicleType, those corresponding spot count can be can be given as 0 in above command.

`park` - park the vehicle and gets a new parking ticket for you
```
park {vehicleType} {entryTime}
```
- List of VehicleTypes supported can be found in src/models/Vehicle/VehicleType.js
- entryTime is optional. Used mainly for testing purpose.

`unpark` - vacate the vehicle and generates a receipt for you
```
unpark {vehicleType} {ticketNumber}
```

## Test

This codebase uses `mocha` and `chai` modules to write & run tests.

- To execute all tests run `npm test`
- To test a particular module/file run `./node_modules/mocha/bin/mocha {path to test file}`