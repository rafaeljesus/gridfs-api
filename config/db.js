'use strict'

module.exports = {
  test: 'mongodb://localhost/gridfs_test',
  development: 'mongodb://localhost/gridfs',
  production: process.env.MONGOHQ_URL
}
