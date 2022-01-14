const SHA256 = require('crypto-js/sha256')

//creem la classe del block. 
class Block {
    //definim la funció constructura i els parameters de creació del block 
    constructor(timestamp,lasthash,hash,data) {
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        return `Block -
        Timestamp: ${this.timestamp}
        LastHash: ${this.lasthash.substring(0,10)}
        Hash: ${this.hash.substring(0,10)}
        Data: ${this.data}`;
    }
    //similar to a static method in python
    //capability to run this funciton without any instance, in other words, without instantiating 
    static genesis(){
        return new this("Genesis time","----","thisisGID",[]);
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now(); // Number of ms that have passed since 1/01/1970
        const lasthash = lastBlock.hash;
        const hash = Block.hash(timestamp,lasthash,data);
        return new this(timestamp,lasthash,hash,data);
    }

    static hash(timestamp,lasthash,data){
        return SHA256(`${timestamp}${lasthash}${data}`).toString();
    }

}

module.exports = Block;
 
