'use strict'

const supertest = require('supertest')

const app = require('../../')
const request = supertest(app.listen())

describe('Home:RoutesSpec', () => {

  it('should return 200', done => {
    request.
      get('/').
      expect(200, done)
  })
})
