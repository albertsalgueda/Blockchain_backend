const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('./miner');
// We use process.env.http_port in case that local host 3001 is being used for another task
// example: on the terminal we would run
// $ HTTP_PORT = 3002 npm run dev

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

const bc = new Blockchain();

const wallet = new Wallet();

const tp = new TransactionPool();

const p2pServer = new P2pServer(bc,tp);

const miner = new Miner(bc,tp,wallet,p2pServer);

app.use(bodyParser.json());

// first endpoint of our API
//req -> request || res -> respond
app.get('/blocks', (req,res)=>{
    res.json(bc.chain);
});

//data of the block will be sent through the API in a JSON format
//We'll create a new block with that data

app.post('/mineBlock',(req,res)=>{
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    p2pServer.syncChains();
    res.redirect('/blocks');
}); 

//return all the transactions of the transaction pool
app.get('/transactions',(req,res)=>{
    res.json(tp.transactions);
});


app.post('/transact',(req,res)=>{
    //the user sends the data in their request
    const {recipient,amount} = req.body;
    //create the transaction
    const transaction = wallet.createTransaction(recipient,amount,bc,tp);
    //broadcast the transaction across the network so that peers can add it to their transaction pool
    p2pServer.broadcastTransaction(transaction);
    //redirect the user to visualize the transactionn
    res.redirect('/transactions');
});

app.get('/public-key',(req,res)=>{
    res.json({publicKey: wallet.publicKey});
});

//allow users to mine

app.get('/mine', (req,res)=>{
    const block = miner.mine();
    console.log(`new block has been added: ${block.toString()}`);
    res.redirect('/blocks');
});

app.get('/balance', (req,res)=>{
    res.json(wallet.calculateBalance(bc));
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
