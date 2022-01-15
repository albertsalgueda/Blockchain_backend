const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    //chain[this.chain.length-1] -> Gets the last element of the array = last block of the blockchain
    const block = Block.mineBlock(this.chain[this.chain.length-1], data);
    this.chain.push(block);
    return block;
  }

  isValidChain(chain){
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    for (let i = 1; i<chain.length; i++) {
        const block = chain[i];
        const lastblock = chain[i-1];
        if (block.lasthash !== lastblock.hash ||
            block.hash !== Block.blockhash(block)){
            return false; 
        }
    }
    return true;
  }
  replaceChain(newChain){
    //CONDITION 1: new chain must be longer than current chain
    if (newChain.length <= this.chain.length){
        console.log('Received chain is not longer than current chain');
        return;
    } 
    else if (!this.isValidChain(newChain)){
        console.log('The received chain is not valid');
        return;
    }
    console.log('Replacing Blockchain with the new chain');
    this.chain = newChain;
  }
}

module.exports = Blockchain;
