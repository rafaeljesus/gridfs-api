import supertest from 'supertest'
import chai from 'chai'
import fs from 'fs'

import * as File from '../../api/files/model'
import app from '../../'

const request = supertest(app.listen())
const expect = chai.expect

describe('Files:RoutesSpec', () => {
  let s
  let fileId

  before(() => {
    s = fs.createReadStream(`${__dirname}/file.pdf`)
  })

  beforeEach((done) => {
    const ws = File.writeStream()
    ws.on('close', (file) => {
      fileId = file._id
      done()
    })
    s.pipe(ws)
  })

  describe('POST /v1/files', () => {
    const queryStr = {
      name: 'foo',
      type: 'application/pdf',
      metadata: {
        userId: 'bar'
      }
    }

    it('should create file', (done) => {
      request
      .post('/v1/files')
      .type('multipart/form-data')
      .query(queryStr)
      .send(new Buffer(s.toString(), 'base64'))
      .expect(200, (err, res) => {
        if (err) return done(err)
        expect(res.body._id).to.be.ok
        done()
      })
    })
  })

  describe('GET /v1/files/:id', () => {
    it('should show a file', (done) => {
      request
      .get(`/v1/files/${fileId}`)
      .expect(200, done)
    })
  })

  describe('GET /v1/files/:id/check-exists', () => {
    it('should check if a file exists', (done) => {
      request
      .get(`/v1/files/${fileId}/check-exists`)
      .expect(200, done)
    })
  })

  describe('DELETE /v1/files/:id', () => {
    it('should delete a file', (done) => {
      request
      .del(`/v1/files/${fileId}`)
      .expect(200, done)
    })
  })
})
