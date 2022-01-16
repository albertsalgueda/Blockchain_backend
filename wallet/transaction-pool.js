const Transaction = require('../wallet/transaction');
class TransactionPool {
    constructor() {
      this.transactions = [];
    }
  
    updateOrAddTransaction(transaction) {
      let transactionWithId = this.transactions.find(t => t.id === transaction.id);
      if (transactionWithId) {
        this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
      } else {
        this.transactions.push(transaction);
      }
    }
    existingTransaction(address){
      return this.transactions.find(t => t.input.adress ===address);
    }
    validTransactions(){
      //returns an array of valid transactions as long as they have a valid signature and valid amounts
      return this.transactions.filter(transaction =>{
        const outputTotal = transaction.outputs.reduce((total,output) => {
          return total + output.amount;
        }, 0);
        if (transaction.input.amount !== outputTotal){
          console.log(`Invalid transaction from ${transaction.input.adress}.`);
          return;
        }
        if (!Transaction.verifyTransaction(transaction)){
          console.log(`Invalid signature from ${transaction.input.adress}.`);
          return;
        }
        return transaction;
      });
    }
  }
  
  module.exports = TransactionPool;