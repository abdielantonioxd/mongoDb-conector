const plugdo = require("plugdo-node").node();
const path = require("path");
// Register the connectors here!
const mongodb_connect = require("./connectors/mongodb/mongodb");
plugdo.registerConnector("db", "mongodb", mongodb_connect.mongodb());
plugdo.start(80, path.resolve(__dirname));