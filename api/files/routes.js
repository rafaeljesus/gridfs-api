'use strict'

const express = require('express')
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
  })

module.exports = router
