const HDWalletProvider = require("truffle-hdwallet-provider-privkey");

const walletAddr = process.env.WALLET_ADDRESS;
const privateKey = process.env.WALLET_PRIVATE_KEY;
const infuraURLKovan = process.env.INFURA_URL_KOVAN;
const infuraKeyKovan = process.env.INFURA_KEY_KOVAN;
const infuraURLRinkeby = process.env.INFURA_URL_RINKEBY;
const infuraKeyRinkeby = process.env.INFURA_KEY_RINKEBY;

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
        },
        kovan: {
          provider: () => {
                return new HDWalletProvider(privateKey, (infuraURLKovan+infuraKeyKovan));

          },
          network_id: 42
        } 
    }
};
