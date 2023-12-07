const Train = artifacts.require("C:\\Users\\matth\\Documents\\GitHub\\Train_ticket_system\\Train_ticket-contract\\contracts\\Train_ticket.sol")
const { from } = require('tar/lib/buffer');
const truffleAssert = require('truffle-assertions');

const memeberError = "You are already a member"
const transactionError = "Tansaction Failed"
const ownerError = "Only the owner can perfom this function!"
const setpirceError = "No need to change price"
const balanceError = "Must deposit amount more than zero!"
const withdrawError = "Can not withdraw 0"

contract("Train", function (accounts) {
    let train;
    beforeEach('Create test contract for each test', async function () {

        train = await Train.new(1000, { from: accounts[1] });
    });


    // testing the register function
    it("Should be able to register", async function () {
        let result = await train.register({ from: accounts[1] })
        assert.equal(result.receipt.status, true)

    });

    it("Failure on repeat register", async function () {
        await train.register({ from: accounts[1] })
        await truffleAssert.reverts(
            train.register({ from: accounts[1] }), memeberError)

    });

    // testing the buy ticket function
    it("Able to buy trian ticket", async function () {
        await train.set_balance({ from: accounts[1], value: 1000 })
        let result = await train.buy_ticket({ from: accounts[1] })
        assert.equal(result.receipt.status, true)
    })

    it("Failure to buy train ticket", async function () {
        await train.set_balance({ from: accounts[1], value: 100 })
        await truffleAssert.reverts(
            train.buy_ticket({ from: accounts[1] }), transactionError)

    })

    // testing the set price function
    it("Able to set New price", async function () {
        await train.set_price(2000, { from: accounts[1] })
        let result = await train.get_price()
        assert.equal(result, 2000)
    })
    // test the ownerOnly moddifer
    it("Revert when non-owner trys to set price", async function () {
        await truffleAssert.reverts(
            train.set_price(2000, { from: accounts[2] }), ownerError)
    })

    it("Revert when new pirce is equal to current price", async function () {
        await truffleAssert.reverts(
            train.set_price(1000, { from: accounts[1] }), setpirceError)
    })


    // testing the set balance function
    it("User can add balance to wallet", async function () {
        await train.set_balance({ from: accounts[1], value: 2000 })
        let result = await train.get_balance({ from: accounts[1] })
        assert.equal(result, 2000)
    })

    it("Reverts if no Eth is sent", async function () {
        await truffleAssert.reverts(
            train.set_balance({ from: accounts[1] }), balanceError)
    })

    // testing the get balance function
    it("Returns user balnace", async function () {
        let result = await train.get_balance({ from: accounts[1] })
        assert.equal(result, 0)
    })


    // testing the withdraw function
    it("User can withdraw form their wallet", async function () {
        await train.set_balance({ from: accounts[1], value: 2000 })
        await train.withdraw(1000, { from: accounts[1] })
        let result = await train.get_balance({ from: accounts[1] })
        assert.equal(result, 1000)
    })

    it("User need to set a withdraw amount larger than 0", async function () {
        await train.set_balance({ from: accounts[1], value: 2000 })
        await truffleAssert.reverts(
            train.withdraw(0, { from: accounts[1] }), withdrawError)
    })

    it("User need to have a balacne to withdraw from", async function () {
        await truffleAssert.reverts(
            train.withdraw(1000, { from: accounts[1] }), transactionError)
    })

    // testing the get_price function
    it("Returned the current ticket price", async function () {
        let result = await train.get_price()
        assert.equal(result, 1000)
    });
})
