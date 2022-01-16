const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');


class Miner{
    constructor(blockchain,transactionPool,wallet,p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        //grab the valid transactions from the pool
        const validTransactions = this.transactionPool.validTransactions();
        //place a reward for the miner 
        validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));
        //create a block consisting of the valid transactions
        const block = this.blockchain.addBlock(validTransactions)
        //sync chains in the p2p server
        this.p2pServer.syncChains();
        //clear the transaction pool -> we don't want to reinclude the transactions
        this.transactionPool.clear();
        //broadcast to every miner to clear their transaction pools
        this.p2pServer.broadcastClearTransactions();
        //include those transactions as data to the block
        return block;
    }
}

module.exports = Miner;