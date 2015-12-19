'use strict'

const Grid = require('gridfs-stream')
  , db = require('./db')

module.exports = () => Grid(db.connection.db, db.mongo)
