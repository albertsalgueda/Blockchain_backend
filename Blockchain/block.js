const chainUtil = require('../chain-util')
//const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY, MINE_RATE} = require('../config');
//creem la classe del block. 
class Block {
    //definim la funció constructura i els parameters de creació del block 
    constructor(timestamp,lasthash,hash,data,nonce,difficulty) {
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString(){
        return `Block -
        Timestamp : ${this.timestamp}
        LastHash  : ${this.lasthash.substring(0,10)}
        Hash      : ${this.hash.substring(0,10)}
        Nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}
        Data      : ${this.data}`;
    }
    //similar to a static method in python
    //capability to run this funciton without any instance, in other words, without instantiating 
    static genesis(){
        return new this("Genesis time","----","thisisGID",[],0,DIFFICULTY);
    }

    static mineBlock(lastBlock, data){
        let hash,timestamp;
        const lasthash = lastBlock.hash;
        let {difficulty} = lastBlock;
        //declare a local dif. variable that is assigned to lastBlock obejct
        let nonce = 0;
        do{
            nonce++;
            hash = Block.hash(timestamp,lasthash,data,nonce,difficulty);
            difficulty = Block.adjustedDifficulty(lastBlock,timestamp);
            timestamp = Date.now(); // Number of ms that have passed since 1/01/1970
        }while(hash.substring(0,difficulty)!=='0'.repeat(difficulty));
        //this is the PoW algorithm, we ensure that the resulting hash has the same number of zeros as the difficultu
        return new this(timestamp,lasthash,hash,data,nonce,difficulty);
    }

    static hash(timestamp,lasthash,data,nonce,difficulty){
        return chainUtil.hash(`${timestamp}${lasthash}${data}${nonce}${difficulty}`).toString();
    }

    static blockhash(block){
        //give the block ( as a unique input ) to generate the hash of the block 
        const {timestamp,lasthash,data,nonce,difficulty} = block;
        return Block.hash(timestamp,lasthash,data,nonce,difficulty);
    }

    static adjustedDifficulty(lastBlock, currentTime){
        let {difficulty} = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty -1;
        return difficulty;
    }

}

module.exports = Block;
 
