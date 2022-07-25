const path = require("path");
const fs = require("fs");
const solc = require("solc");

const platformPath = path.resolve(__dirname, "contracts", "Platform.sol");
const source = fs.readFileSync(platformPath, "utf-8");

module.exports = solc.compile(source, 1).contracts[":Platform"];
