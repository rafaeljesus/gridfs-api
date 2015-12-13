'use strict'

const Grid = require('gridfs-stream')
  , mongoose = require('mongoose')
  , gfs = Grid(mongoose.connection.db, mongoose.mongo)

module.exports = gfs
