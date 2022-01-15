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
      }
    
    connectSocket(socket){
        this.sockets.push(socket);
        console.log('Socket connected');
    }
    
    connectToPeers() {
        peers.forEach(peer => {
          const socket = new Websocket(peer);
          socket.on('open', () => this.connectSocket(socket));
        });
      }
    
    }
process.on('uncaughtException', function (err) {
    console.log(err);
}); 

module.exports = P2pServer;