const dEventTicket = artifacts.require("./dEventTicket.sol");

module.exports = function (deployer) {
    deployer.deploy(dEventTicket)
};
