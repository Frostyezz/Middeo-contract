const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let platform;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  platform = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Platform", () => {
  it("deploys a contract", () => {
    assert.ok(platform.options.address);
  });
  //   it("has a default message", async () => {
  //     const message = await inbox.methods.message().call();
  //     assert.equal(message, "Hi there!");
  //   });
  //   it("can change the message", async () => {
  //     await inbox.methods.setMessage("bye").send({ from: accounts[0] });
  //     const message = await inbox.methods.message().call();
  //     assert.equal(message, "bye");
  //   });
});
