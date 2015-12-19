'use strict'

const express = require('express')
  , mongoose = require('mongoose')
  , GridFS = require('../../lib/gridfs')
  , router  = express.Router()
  , gfs = GridFS()

router.
  /**
  * @api {post} /v1/files Store new File
  * @apiGroup File
  * @apiSuccess {String} name File name
  * @apiSuccess {String} type contentType
  * @apiSuccess {Object} metadata Store any properties
  * @apiExample {json} Example usage:
  *   curl -X POST http://gridfs-api/v1/files \
  *   -d 'name=foo.pdf' \
  *   -d 'type=application/pdf' \
  *   -d 'metadata={
  *         "userId": "123456"
  *       }'
  * @apiSuccess {json} Success
  *   HTTP/1.1 200 OK {id: "5674a8f04718fc712c0f05dd"}
  * @apiErrorExample {json} Error
  *   HTTP/1.1 422 Unprocessable Entity
  */
  post('/v1/files', (req, res) => {
    const ws = gfs.createWriteStream({
      filename: req.query.name,
      /*eslint camelcase: 0*/
      content_type: req.query.type,
      metadata: req.query.metadata
    })

    ws.on('close', file => res.status(200).json(file))
    ws.on('error', () => res.sendStatus(412))
    req.pipe(ws)
  }).
  /**
  * @api {get} /v1/files/:id Retrieves a file by id
  * @apiGroup File
  * @apiSuccess {String} id File id
  * @apiExample {json} Example usage:
  *   curl -X POST http://gridfs-api/v1/files/:id \
  *   -d 'id=5674a8f04718fc712c0f05dd'
  * @apiSuccess {Object} File to download
  * @apiErrorExample {json} Error
  *   HTTP/1.1 412 Unprocessable Entity
  */
  get('/v1/files/:id', (req, res) => {
    const query = {_id: mongoose.Types.ObjectId(req.params.id)}
    gfs.files.findOne(query, (err, file) => {
      res.contentType(file.contentType)
      gfs.createReadStream(query).pipe(res)
    })
  }).
  /**
  * @api {delete} /v1/files Remove a File by id
  * @apiGroup File
  * @apiSuccess {String} id File id
  * @apiExample {json} Example usage:
  *   curl -X DELETE http://gridfs-api/v1/files/5674a8f04718fc712c0f05dd
  * @apiSuccessExample {json} Success-Response:
  *   HTTP/1.1 200 OK
  *   {
  *     "message": "OK"
  *   }
  * @apiErrorExample {json} Error
  *   HTTP/1.1 412 Precondition Failed
  */
  delete('/v1/files/:id', (req, res) => {
    const query = {_id: mongoose.Types.ObjectId(req.params.id)}
    gfs.remove(query, err => {
      if (err) return res.sendStatus(412)
      return res.status(200).json({message: 'OK'})
    })
  })

module.exports = router
