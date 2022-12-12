const fs = require("fs");
const path = require("path");
const readline = require("readline");

const { dispatch } = require("./src/app/Dispatcher");
const { ParkingApp } = require("./src/app/parkingApp");

const run = (args) => {
  // execute in file mode
  if (args.length > 0) {
    const filepath = path.resolve(args[0]);

    if (!filepath) {
      process.stdout.write("File path must be a path to a valid commands file.\n");
      return;
    }

    try {
      fs.accessSync(filepath, fs.constants.R_OK);
    } catch (accesErr) {
      process.stdout.write(`File path: ${filepath} must be readable by the current user & process\n`);
      return;
    }

    // instantiate a ParkingApp that will execute the commands from the file
    const app = new ParkingApp();

    const reader = readline.createInterface({
      input: fs.createReadStream(filepath),
    });

    reader.on("line", (line) => {
      process.stdout.write(line);
      process.stdout.write("\n");
      const { success, error } = dispatch(line, app);
      process.stdout.write(success || error);
      process.stdout.write("\n\n");
    });
  } else {
    process.stdout.write("Input file path is missing.\n");
    return;
  }
};

const [, , ...args] = process.argv;

run(args);
