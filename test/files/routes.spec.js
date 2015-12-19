'use strict'

const supertest = require('supertest')
  , chai = require('chai')
  , fs = require('fs')
  , GridFS = require('../../lib/gridfs')
  , app = require('../../')
  , request = supertest(app.listen())
  , gfs = GridFS()
  , expect = chai.expect

describe('Files:RoutesSpec', () => {

  let s

  before(() => {
    s = fs.createReadStream(__dirname + '/file.pdf')
  })

  describe('POST /v1/files', () => {

    const queryStr = {
      name: 'foo',
      type: 'application/pdf',
      metadata: {
        userId: 'bar'
      }
    }

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

  describe('GET /v1/files/:id', () => {

    let fileId

    beforeEach(done => {
      const ws = gfs.createWriteStream()
      ws.on('close', file => {
        fileId = file._id
        done()
      })
      s.pipe(ws)
    })

    it('should show a file', done => {
      request.
        get(`/v1/files/${fileId}`).
        expect(200, done)
    })

  })
})
