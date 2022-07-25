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
    try {
      const post = await platform.methods.retrievePost(TEST_ID).call();
      assert.ok(post);
    } catch (error) {
      assert(false);
    }
  });
  it("can apply to a post", async () => {
    try {
      await platform.methods
        .applyToPost(TEST_ID, TEST_DESC)
        .send({ from: accounts[1], value: 0 });
      const post = await platform.methods.retrievePost(TEST_ID).call();
      assert.equal(post.candidatures[0].author, accounts[1]);
    } catch (error) {
      assert(false);
    }
  });
  it("author can select a winner", async () => {
    try {
      await platform.methods
        .applyToPost(TEST_ID, TEST_DESC)
        .send({ from: accounts[1], value: 0 });
      await platform.methods
        .selectWinner(TEST_ID, accounts[1])
        .send({ from: accounts[0], value: 0 });
      const post = await platform.methods.retrievePost(TEST_ID).call();
      assert.equal(post.winner, accounts[1]);
    } catch (error) {
      assert(false);
    }
  });
  it("others cant select a winner", async () => {
    try {
      await platform.methods
        .applyToPost(TEST_ID, TEST_DESC)
        .send({ from: accounts[2], value: 0 });
      await platform.methods
        .selectWinner(TEST_ID, accounts[2])
        .send({ from: accounts[1], value: 0 });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });
});
