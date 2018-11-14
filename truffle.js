const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = "wrist grow quantum sword course custom age pool high derive proof theory";
const infuraURLRinkeby = "https://rinkeby.infura.io/v3/";
const infuraKeyRinkeby = "d950f1c0d6a54ce68d39c2c272cb40f9";

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*"
        },
        rinkeby: {
            provider: () => {
                return new HDWalletProvider(mnemonic, (infuraURLRinkeby+infuraKeyRinkeby));
            },
            network_id: 4
        }
    }
};
