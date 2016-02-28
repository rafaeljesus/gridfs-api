export default {
  test: 'mongodb://localhost/gridfs_test',
  development: 'mongodb://localhost/gridfs',
  production: process.env.MONGOHQ_URL
}
