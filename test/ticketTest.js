const timeManager = require("openzeppelin-solidity/test/helpers/increaseTime");
const currentTime = require("openzeppelin-solidity/test/helpers/latestTime");
const expectThrow = require("openzeppelin-solidity/test/helpers/expectThrow");
const ether = require("openzeppelin-solidity/test/helpers/ether");
const moment = require("moment");
const { should, assertRevert } = require("./helpers");
const truffleAssert = require("truffle-assertions");



const dEventTicket = artifacts.require("dEventTicket");

contract("Lender Registry", accounts => {
    const colendiGlobe = accounts[0];
    const userIstan = accounts[1];
    const userAnka = accounts[2];
    const userIzm = accounts[3];
    const userAda = accounts[4];

    before(async () => {
        dEventInstance = await dEventTicket.new();
    });


    it("Ticket created", async () => {
        const senderBalanceBefore = await web3.eth.getBalance(userIstan)

        await dEventInstance.createTicket.sendTransaction(
            "Cinemaximum ticket",
            2e17,
            100,
            {
                from: userIstan
            });

        const sizeOfTickets = await dEventInstance.getTicketsLength.call();
        sizeOfTickets.should.be.bignumber.eq(1)

        //const receiverBalanceBefore = await web3.eth.getBalance(userIstan)
        //console.log(receiverBalanceBefore)

    });

    it("Ticket bought", async () => {
        const userAnkaBalance = await web3.eth.getBalance(userAnka)
        console.log(userAnkaBalance.toNumber())
        await dEventInstance.payForTicket.sendTransaction(
            0,
            {
                from: userAnka,
                value: 2e17
            });

        const receiverBalanceBefore = await web3.eth.getBalance(userAnka)
        console.log(receiverBalanceBefore.toNumber())
        const tickets = await dEventInstance.getMyTickets.call({ from: userAnka })
        console.log(tickets)
    });

    it("Event creator gets Money Back", async () => {
        const userIstanBalance = await web3.eth.getBalance(userIstan)
        console.log(userIstanBalance.toNumber())
        await dEventInstance.getMoneyBack.sendTransaction(
            0,
            {
                from: userAnka,
                value: 2e17
            });

        const receiverBalanceBefore = await web3.eth.getBalance(userAnka)
        console.log(receiverBalanceBefore.toNumber())
        const tickets = await dEventInstance.getMyTickets.call({ from: userAnka })
        console.log(tickets)
    });



});

function allocateTokens(tokenContract, accounts) {
    for (let iter = 1; iter < accounts.length; iter++) {
        tokenContract.transfer.sendTransaction(accounts[iter], 1e24, {
            from: accounts[0]
        });
    }
}
