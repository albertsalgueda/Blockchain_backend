
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
}

module.exports = Block;
 
