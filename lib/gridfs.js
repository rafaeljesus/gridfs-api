'use strict'

const Grid = require('gridfs-stream')

const db = require('./db')

module.exports = () => Grid(db.connection.db, db.mongo)
