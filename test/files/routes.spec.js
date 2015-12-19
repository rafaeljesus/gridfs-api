'use strict'

const supertest = require('supertest')
  , chai = require('chai')
  , fs = require('fs')
  , app = require('../../')
  , request = supertest(app.listen())
  , expect = chai.expect

describe('Files:RoutesSpec', () => {

  describe('POST /v1/files', () => {

    let s
    const queryStr = {
      name: 'foo',
      type: 'application/pdf',
      metadata: {
        userId: 'bar'
      }
    }

    beforeEach(() => {
      s = fs.createReadStream(__dirname + '/file.pdf')
    })

    it('should create file', done => {
      request.
        post('/v1/files').
        type('multipart/form-data').
        query(queryStr).
        send(new Buffer(s.toString(), 'base64')).
        expect(200, (err, res) => {
          if (err) return done(err)
          expect(res.body._id).to.be.ok
          done()
        })
    })

  })
})
