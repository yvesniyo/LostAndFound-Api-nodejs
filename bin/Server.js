#!/usr/bin/env node

/**
 * Module dependencies.
 */
const debug = require('debug')('web:server')
const http = require('http')
const AppContainer = require("../app/Helpers/app")

class Server {

  constructor() {

    const myApp = AppContainer("myApp");
    this.app = myApp.getApp()
    this.debug = debug;
    this.http = http;
    this.httpServer = null
    this.port = null

  }

  startServer() {
    this.getPORT()
    this.createHttpServer()
    this.listenOnPort()
  }

  /**
   * Normalize a port into a number, string, or false.
   */
  normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      // named pipe
      return val;
    }
    if (port >= 0) {
      // port number
      return port;
    }
    return false;
  }

  /**
  * Get port from environment and store in Express.
  */
  getPORT() {
    this.port = this.normalizePort(process.env.PORT || '3000');
    this.app.set('port', this.port);
  }

  /**
   * Create HTTP server.
   */
  createHttpServer() {
    this.httpServer = this.http.createServer(this.app);
  }

  /**
 * Listen on provided port, on all network interfaces.
 */
  listenOnPort() {
    this.httpServer.listen(this.port);

  }

  on(event, callback) {
    this.httpServer.on(event, callback);
  }
}



const server = new Server()

//start server
server.startServer()

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', () => {
  var addr = server.httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  server.debug('Listening on ' + bind);
  console.log(`HTTP Server Listening On ${bind}`);
});

