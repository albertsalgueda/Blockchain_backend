const Websocket = require('ws');
//avility to override the port if needed
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
//Peers = ws://localhost:3001,ws://localhost:3002...

//will return an array containing those Websocket addresses.

class P2pServer {
    constructor(blockchain) {
      this.blockchain = blockchain;
      this.sockets = [];
    }
  
    listen() {
      const server = new Websocket.Server({ port: P2P_PORT });
      server.on('connection', socket => this.connectSocket(socket));
  
      this.connectToPeers();
  
      console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }
    connectToPeers() {
      peers.forEach(peer => {
        const socket = new Websocket(peer);
  
        socket.on('open', () => this.connectSocket(socket));
      });
    }
  
    connectSocket(socket) {
      this.sockets.push(socket);
      console.log('Socket connected');
  
      this.messageHandler(socket);
      socket.send(JSON.stringify(this.blockchain.chain));
      this.sendChain(socket);
    }

    messageHandler(socket){
      socket.on('message', message => {
        const data = JSON.parse(message);
        //console.log('data',data);
        this.blockchain.replaceChain(data)
      })
    }

    sendChain(socket){
      socket.send(JSON.stringify(this.blockchain.chain));
    }
    //send the new chain to all the peers
    syncChains(){
      this.sockets.forEach(socket=> {
        this.sendChain(socket)
      });
    }
  }

//    process.on('uncaughtException', function (err) {
//  console.log(err);}); 

module.exports = P2pServer;