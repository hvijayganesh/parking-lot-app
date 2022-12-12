const COMMANDS_REGISTRY = {
  create_parking_lot: {
    name: "createParkingLot",
  },
  park: {
    name: "park",
  },
  unpark: {
    name: "unPark",
  },
};

const dispatch = (input, app) => {
  // separate command and arguments
  const [name, ...args] = input.split(" ");

  const command = COMMANDS_REGISTRY[name];

  // ... if an app method is not available for a command, return an error
  if (!command) {
    return { error: `${name} is not a supported command.` };
  }

  try {
    // ... return error if the method with name is not implemented in the app
    if (!app[command.name]) {
      return { error: `${command.name} is not implemented in the app.` };
    }

    const result = app[command.name](...args);

    return { success: result };
  } catch (err) {
    // ... when ParkingApp throws an error, return the error.message
    return {
      error: err.message || `The command: ${command} raised an error ${err.toString()}`,
    };
  }
};

module.exports = {
  dispatch,
};
