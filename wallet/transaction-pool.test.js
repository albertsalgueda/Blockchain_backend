const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let tp, wallet, transaction;
  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    //transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30);
    //tp.updateOrAddTransaction(transaction);
    transaction = wallet.createTransaction('r4nd-4dr355', 10,tp);
  });

  it('adds a transaction to the pool', () => {
    if(this.item === undefined) {return}
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('updates a transaction in the pool', () => {
    if(this.item === undefined) {return}
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'foo-4ddr355', 40);
    tp.updateOrAddTransaction(newTransaction);
    expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
      .not.toEqual(oldTransaction);
  });

  it('clears transactions', ()=>{
    tp.clear();
    expect(tp.transactions).toEqual([]);
  });
  
  describe('mixing valid and corrupt transactions', ()=>{
    //create an array of valid transactions subset of the transaction pool
    let validTransaction;
    beforeEach(()=>{
        validTransactions = [...tp.transactions];
        //create corrupt and valid transactions to test functionality
        for (let i=0; i<6; i++){
            wallet = new Wallet();
            transaction = wallet.createTransaction('r4nd-4dr355', 1,tp);
            if ( i%2){
                //now we'll corrupt the transaction
                transaction.input.amount = 999999;
            }else{
                validTransactions.push(transaction);
            }
        }
    });
    it('differentiates valid and corrupt transactions', ()=>{
        expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
    });
    it('grabs valid transactions', ()=>{
        expect(tp.validTransactions()).toEqual(validTransactions);
    });
  });
});