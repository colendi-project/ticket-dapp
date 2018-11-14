const BigNumber = web3.BigNumber
const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should()
const EVMThrow = 'invalid opcode'

const assertRevert = async promise => {
    try {
        await promise
        assert.fail('Expected revert not received')
    } catch (error) {
        const revertOrAssertFound = error.message.search('revert') >= 0 || error.message.search('assert') >= 0
        assert(revertOrAssertFound, `Expected "revert", got ${error} instead`)
    }
}
const getContractCode = (contractAddress, web3) => new Promise(
    (resolve, reject) => web3.eth.getCode(contractAddress, (e, r) => {
        resolve(r)
    })
)


module.exports = { should, EVMThrow, assertRevert, getContractCode }

