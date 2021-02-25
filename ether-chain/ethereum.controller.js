const SHA256 = require('crypto-js/sha256');
const shortid = require('short-id');

exports.get_new_transaction = async function (req, res) {
  console.log('*** ETH GET NEW ADDRESS ***');
  let ethData = {};
  //let ipAddress = req.ip;
  let idd = shortid.generate();
  let date = Date.now();
  try {
    let smashingCoin = new CryptoBlockchain();
    smashingCoin.addNewBlock(new CryptoBlock(idd, date, 1));
    console.log('HASH value: ', smashingCoin.obtainLatestBlock());

    ethData.result = smashingCoin.obtainLatestBlock();
    return ethData.result;
  } catch (err) {
    ethData.result = err.message;
    console.log(chalk.red('REQUEST ERROR in get_new_address'));
    return ethData.result;
  }
};

class CryptoBlock {
  constructor(index, timestamp, vETH, precedingHash = ' ') {
    this.index = index;
    this.timestamp = timestamp;
    this.vETH = vETH;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce,
    ).toString();
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 4; // пруф 4 нуля
  }
  startGenesisBlock() {
    return new CryptoBlock(0, '01/01/2020', 1, '0');
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}
