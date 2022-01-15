//Goal: explore the block class

const Block = require('./Blockchain/block');
const Blockchain = require('./Blockchain');
const bc = new Blockchain();
//const block = new Block('foo','baar','zoo','buu');
//console.log(block.toString());
//console.log(Block.genesis().toString());

//const fooBlock = Block.mineBlock(Block.genesis(),'foo');
//console.log(fooBlock.toString());

for ( let i = 0; i < 10; i++){
    console.log(bc.addBlock(`foo ${i}`).toString());
}