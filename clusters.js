const cluster = require('cluster')
  , CPUS = require('os').cpus()
  , log = require('./lib/log')

if (cluster.isMaster) {

  CPUS.forEach(() => cluster.fork())

  cluster.on('listening', worker => {
    log.info('Worker %d connected', worker.process.pid)
  })

  cluster.on('disconnect', worker => {
    log.info('Worker %d disconnect', worker.process.pid)
  })

  cluster.on('exit', worker => {
    log.info('Worker %d exited', worker.process.pid)
    cluster.fork()
  })
}

if (cluster.isWorker) {
  require('./bin/www')
}
