const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

// We use process.env.http_port in case that local host 3001 is being used for another task
// example: on the terminal we would run
// $ HTTP_PORT = 3002 npm run dev

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

const bc = new Blockchain();

const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());

// first endpoint of our API
//req -> request || res -> respond
app.get('/blocks', (req,res)=>{
    res.json(bc.chain);
});

//data of the block will be sent through the API in a JSON format
//We'll create a new block with that data

app.post('/mine',(req,res)=>{
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    res.redirect('/blocks');
}); 

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();
