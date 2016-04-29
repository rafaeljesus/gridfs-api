import supertest from 'supertest-as-promised'
import chai from 'chai'
import fs from 'fs'

import { writeStream } from '../../resources/files/model'
import { test as wrap } from '../../lib/wrap'
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
    const ws = writeStream()
    ws.on('close', (file) => {
      fileId = file._id
      done()
    })
    s.pipe(ws)
  })

  describe('POST /v1/files', () => {
    it('should create file', wrap(async () => {
      const res = await request
      .post('/v1/files')
      .type('multipart/form-data')
      .query({
        name: 'foo',
        type: 'application/pdf',
        metadata: {
          userId: 'bar'
        }
      })
      .send(new Buffer(s.toString(), 'base64'))
      .expect(201)

      expect(res.body._id).to.be.ok
    }))
  })

  describe('GET /v1/files/:id', () => {
    it('should show a file', wrap(async () => {
      const res = await request
      .get(`/v1/files/${fileId}`)
      .expect(200)

      expect(res.body).to.exist
    }))
  })

  describe('GET /v1/files/:id/check-exists', () => {
    it('should check if a file exists', wrap(async () => {
      const res = await request
      .get(`/v1/files/${fileId}/check-exists`)
      .expect(200)

      expect(res.body).to.exist
    }))
  })

  describe('DELETE /v1/files/:id', () => {
    it('should delete a file', () => {
      return request
      .del(`/v1/files/${fileId}`)
      .expect(200)
    })
  })
})
