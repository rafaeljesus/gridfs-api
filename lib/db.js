import mongoose from 'mongoose'

import config from '../config/db'
import log from '../lib/log'

const dbUri = config[process.env.NODE_ENV]

export default mongoose

mongoose.connect(dbUri)
mongoose.connection.on('error', (err) => log.error(`Mongoose connection error: ${err}`))
process.on('SIGINT', () => mongoose.connection.close(() => process.exit(0)))
