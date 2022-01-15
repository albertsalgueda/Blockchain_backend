//Goal: explore the block class

const Block = require('./Blockchain/block');

//const block = new Block('foo','baar','zoo','buu');
//console.log(block.toString());
//console.log(Block.genesis().toString());

const fooBlock = Block.mineBlock(Block.genesis(),'foo');
console.log(fooBlock.toString());
