const chainUtil = require('../chain-util');
const Transaction = require('./transaction');
const {INITIAL_BALANCE} = require('../config');


class Wallet {
    constructor(){
        this.balance= 10;
        this.keyPair = chainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }
    toString(){
        return `Wallet-
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`
    }
    sign(dataHash){
        return this.keyPair.sign(dataHash);
    }
    createTransaction(recipient,amount,transactionPool){
        if(amount > this.balance){
            console.log(`Amount: ${amount} exceeds current balance ${this.balance}`);
            return;
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);
        if (transaction){
            transaction.update(this, recipient,amount);
        }
        else{
            transaction = Transaction.newTransaction(this,recipient,amount);
            transactionPool.updateOrAddTransaction(transaction); 
        }
        return transaction;
    }
}

module.exports = Wallet;
