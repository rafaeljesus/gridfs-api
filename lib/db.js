import mongoose from 'mongoose'

const config = {
  test: 'mongodb://localhost/gridfs_test',
  development: 'mongodb://localhost/gridfs',
  production: process.env.MONGOHQ_URL
}

const dbUri = config[process.env.NODE_ENV]

export default mongoose

mongoose.connect(dbUri)

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`)
})

process.on('SIGINT', () => mongoose.connection.close(() => process.exit(0)))
