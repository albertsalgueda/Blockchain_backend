
class Miner{
    constructor(blockchain,transactionPool,wallet,p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        //grab the valid transactions from the pool
        constValidTransactions = this.transactionPool.validTransactions();
        //place a reword for the miner 
        //create a block consisting of the valid transactions
        //sync chains in the p2p server
        //clear the transaction pool -> we don't want to reinclude the transactions
        //broadcast to every miner to clear their transaction pools
        //include those transactions as data to the block
    }
}

module.exports = Miner;