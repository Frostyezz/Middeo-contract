const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let platform;
const TEST_ID = "TEST";
const TEST_TITLE = "TITLE";
const TEST_DESC = "DESC";

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  platform = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "3000000" });
  await platform.methods.createPost(TEST_ID, TEST_TITLE, TEST_DESC).send({
    from: accounts[0],
    value: web3.utils.toWei("0.01", "ether"),
    gas: 3000000,
  });
});

describe("Platform", () => {
  it("deploys a contract", () => {
    assert.ok(platform.options.address);
  });
  it("can retrieve an existing post", async () => {
    const post = await platform.methods.retrievePost(TEST_ID).call();
    assert.ok(post);
  });
  it("can apply to a post", async () => {
    await platform.methods
      .applyToPost(TEST_ID, TEST_DESC)
      .send({ from: accounts[1], value: 0 });
    const post = await platform.methods.retrievePost(TEST_ID).call();
    assert.equal(post.candidatures[0].author, accounts[1]);
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
