const timeManager = require("openzeppelin-solidity/test/helpers/increaseTime");
const currentTime = require("openzeppelin-solidity/test/helpers/latestTime");
const expectThrow = require("openzeppelin-solidity/test/helpers/expectThrow");
const ether = require("openzeppelin-solidity/test/helpers/ether");
const moment = require("moment");
const { should, assertRevert } = require("./helpers");
const truffleAssert = require("truffle-assertions");

const dEventTicket = artifacts.require("dEventTicket");

contract("Ticket Contract", accounts => {
  const ticketCreator = accounts[1];
  const Alice = accounts[2];
  const Bob = accounts[3];
  const ticketAmount = 100;
  const ticketPrice = 2e17;
  let buyerCount = 0;

  before(async () => {
    dEventInstance = await dEventTicket.new();
  });

  it("Ticket created", async () => {
    await dEventInstance.createTicket.sendTransaction(
      "Cinemaximum ticket",
      ticketPrice,
      ticketAmount,
      {
        from: ticketCreator,
        gasPrice: 0
      }
    );

    const sizeOfTickets = await dEventInstance.getTicketsLength.call();
    sizeOfTickets.should.be.bignumber.eq(1);
  });

  it("Ticket bought", async () => {
    const AliceBalance = await web3.eth.getBalance(Alice);
    const ticketInfo = await dEventInstance.getTicket.call(0);

    await dEventInstance.payForTicket.sendTransaction(0, {
      from: Alice,
      value: ticketPrice,
      gasPrice: 0
    });

    const AliceBalanceAfter = await web3.eth.getBalance(Alice);
    buyerCount++;
    AliceBalanceAfter.should.be.bignumber.eq(AliceBalance.sub(ticketPrice));
  });

  it("Event creator gets Money Back", async () => {
    const ticketCreatorBalance = await web3.eth.getBalance(ticketCreator);

    await dEventInstance.getMoneyBack.sendTransaction(0, {
      from: ticketCreator,
      gasPrice: 0
    });

    const ticketCreatorBalanceAfter = await web3.eth.getBalance(ticketCreator);
    ticketCreatorBalanceAfter.should.be.bignumber.eq(
      ticketCreatorBalance.add(ticketPrice)
    );
  });
});

function allocateTokens(tokenContract, accounts) {
  for (let iter = 1; iter < accounts.length; iter++) {
    tokenContract.transfer.sendTransaction(accounts[iter], 1e24, {
      from: accounts[0]
    });
  }
}
