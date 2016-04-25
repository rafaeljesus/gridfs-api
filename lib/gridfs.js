import Grid from 'gridfs-stream'

import db from './db'

export default () => Grid(db.connection.db, db.mongo)
