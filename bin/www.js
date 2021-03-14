require('../config/env.config');


const connectToDB = function () {

  return new Promise((resolve, reject) => {
    let DbService = require('./../services/db.service')
    const MAX_TRY_ATTEMPT = 3;
    let noOfAttemptTried = 0
    let interval = setInterval(async function () {
      noOfAttemptTried++
      const { value, error } = await DbService.connect();
      if (value) {
        clearInterval(interval)
        resolve()
      } else if (noOfAttemptTried >= MAX_TRY_ATTEMPT) {
        clearInterval(interval)
        reject(error)
      }
    }, 2000)
  })
}


const connectToRedis = function () {
  return new Promise((resolve, reject) => {
    const RedisService = require('./../utils/redis')
    const MAX_TRY_ATTEMPT = 3;
    let noOfAttemptTried = 0
    let interval = setInterval(async function () {
      noOfAttemptTried++
      const { value, error } = await RedisService.connect();
      if (value) {
        clearInterval(interval)
        resolve()
      } else if (noOfAttemptTried >= MAX_TRY_ATTEMPT) {
        clearInterval(interval)
        reject(error)
      }
    }, 2000)
  })
}


function initiateServer() {
  var http = require('http')

  function normalizePort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false
  }



  const app = require('../app')
  const port = normalizePort(process.env.APP_PORT || '3001')
  app.set('port', port)


  var server = http.createServer(app);

  server.listen(port);

  server.on('error', (err) => {
    onError(err, port)
  })
  server.on('listening', () => {
    onListening(server)
  })


  function onError(error, port) {
    if (error.syscall !== 'listen') {
      console.log(error)
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.log(bind + ' requires elevated privileges. Error Code:' + error.code)
        //process.exit(1)
        break
      case 'EADDRINUSE':
        console.log(bind + ' is already in use. Error Code:' + error.code)
        //process.exit(1)
        break
      default:
        console.log(error)
    }

    throw error

  }

  // Event listener for HTTP server "listening" event.
  function onListening(server) {
    console.log('Server Info:', server.address());
    console.log(`Server Started. Server running on ${process.env.APP_REST_PROTOCOL}://${process.env.APP_HOST}${process.env.APP_PORT ? ':'.concat(process.env.APP_PORT) : ''}`)
  }



}




(async function () {
  try {
    console.log('Connecting to DB');
    await connectToDB();
    console.log('DB Connected');
    console.log('Connecting to Redis');
    await connectToRedis();
    console.log('Redis Connected');
    console.log('Starting Server');
    initiateServer();
  } catch (error) {
    console.log(error);
    process.exit(1)
  }

}())
