import mongoose from 'mongoose'

import GridFS from '../../lib/gridfs'

const gfs = GridFS()
const ObjectId = mongoose.Types.ObjectId

export {
  readStream,
  writeStream,
  findOne,
  exist,
  remove
}

function readStream (id) {
  const query = {_id: ObjectId(id)}
  return gfs.createReadStream(query)
}

function writeStream (options = {}) {
  return gfs.createWriteStream({
    filename: options.name,
    content_type: options.type,
    metadata: options.metadata
  })
}

function findOne (id) {
  const query = {_id: ObjectId(id)}
  return new Promise((resolve, reject) => {
    gfs.files.findOne(query, (err, file) => {
      if (err) return reject(err)
      resolve(file)
    })
  })
}

function exist (id) {
  const query = {_id: ObjectId(id)}
  return new Promise((resolve, reject) => {
    gfs.exist(query, (err, found) => {
      if (err) return reject(err)
      resolve(found)
    })
  })
}

function remove (id) {
  const query = {_id: ObjectId(id)}
  return new Promise((resolve, reject) => {
    gfs.remove(query, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}
