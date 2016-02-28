import Grid from 'gridfs-stream'

import db from './db'

export default () => {
  return Grid(db.connection.db, db.mongo)
}
