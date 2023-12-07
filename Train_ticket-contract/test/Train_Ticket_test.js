const Train = artifacts.require("C:\\Users\\matth\\Documents\\GitHub\\Train_ticket_system\\Train_ticket-contract\\contracts\\Train_ticket.sol")
const { from } = require('tar/lib/buffer');
const truffleAssert = require('truffle-assertions');

const memeberError = "You are already a member"

contract("Train", function (accounts) {
    let train;
    beforeEach('Create test contract for each test', async function () {
        train = await Train.new(1000);
    });

    it("Should be able to register", async function () {
        let result = await train.register({ from: accounts[1] })
        assert.equal(result.receipt.status, true)

    });

    it("Failure on repeat register", async function () {
        await train.register({ from: accounts[1] })
        await truffleAssert.reverts(
            train.register({ from: accounts[1] }), memeberError)

    });
})
