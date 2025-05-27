const fs = require('fs');
const Web3 = require('web3');
const solc = require('solc');

// Connect to local Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Read and compile the Solidity code
const code = fs.readFileSync('Voting.sol').toString();
const compiledCode = solc.compile(code);

// Parse ABI and bytecode
const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
const byteCode = compiledCode.contracts[':Voting'].bytecode;

// Create contract object
const VotingContract = web3.eth.contract(abiDefinition);

// Set voting start and end times
const startTime = Math.floor(new Date('2025-05-22T00:00:00+03:00').getTime() / 1000);
const endTime = Math.floor(new Date('2025-05-31T23:59:59+03:00').getTime() / 1000);

// Deploy contract
const deployedContract = VotingContract.new(
  [
    web3.fromAscii('Maiju Lattu'),
    web3.fromAscii('Pauliina Oksanen'),
    web3.fromAscii('Leila Toppila'),
    web3.fromAscii('Sofia Sallinen')
  ],
  startTime,
  endTime,
  {
    data: byteCode,
    from: web3.eth.accounts[0],
    gas: 4700000
  },
  (err, contract) => {
    if (!err && contract.address) {
      console.log('Contract deployed at:', contract.address);
    } else if (err) {
      console.error('Deployment error:', err);
    }
  }
);
