const cluster = require('cluster')
const CPUS = require('os').cpus()

const log = require('./lib/log')

if (cluster.isMaster) {

  require('./lib/db')

  CPUS.forEach(() => cluster.fork())

  cluster.on('listening', worker => log.info(`Worker ${worker.process.pid} connected`))
  cluster.on('disconnect', worker => log.info(`Worker ${worker.process.pid} disconnect`))
  cluster.on('exit', worker => {
    log.info(`Worker ${worker.process.pid} exited`)
    cluster.fork()
  })
}

if (cluster.isWorker) {
  require('./bin/www')
}
