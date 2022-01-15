//Test that the class is consistent 
const Block = require('./block');

describe('Block',()=>{
    
    let data 
    let lastBlock
    let block

    beforeEach(()=>{
        data = 'GID test';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock,data)
    })

    it('sets the `data` to match the input', () => {
        //The insantiated object should have an attribute "data" that matches the inputed "data"
        expect(block.data).toEqual(data);
    });

    it('sets the `lasthash` to match the hash of the lastblock', () => {
        //lasthash of currentblock should be equal to the hash of last block 
        expect(block.lasthash).toEqual(lastBlock.hash)
    });

    it('generates a hash that matches difficulty',()=>{
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    it('lowers difficulty for slowly mined blocks',()=>{
        expect(Block.adjustedDifficulty(block,block.timestamp+360000)).toEqual(block.difficulty-1);
    });

    it('it raises the difficulty for quickly mined bblocks',()=>{
        expect(Block.adjustedDifficulty(block,block.timestamp+1)).toEqual(block.difficulty+1);
    });

}) 