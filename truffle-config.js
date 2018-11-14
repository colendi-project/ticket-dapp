const HDWalletProvider = require("truffle-hdwallet-provider-privkey");

const privateKey = "702947CF023F70686F956310D960C69AE2BD2025B6626D2F0F8004C28662D62E";
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
                return new HDWalletProvider(privateKey, (infuraURLRinkeby+infuraKeyRinkeby));
            },
            network_id: 4
        }
    }
};
