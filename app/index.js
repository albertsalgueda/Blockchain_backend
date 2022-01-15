const express = require('express');
const Blockchain = require('../blockchain');
// We use process.env.http_port in case that local host 3001 is being used for another task
// example: on the terminal we would run
// $ HTTP_PORT = 3002 npm run dev
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

const bc = new Blockchain();

// first endpoint of our API
//req -> request || res -> respond
app.get('/blocks', (req,res)=>{
    res.json(bc.chain);
})


app.listen(HTTP_PORT, () => console.log('Listening on port ${HTTP_PORT}'));
