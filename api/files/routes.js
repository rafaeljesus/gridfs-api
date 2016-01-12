'use strict'

const krouter = require('koa-router')
  , Promise = require('bluebird')
  , ObjectId = require('mongoose').Types.ObjectId
  , GridFS = require('../../lib/gridfs')
  , router = krouter()
  , gfs = GridFS()

Promise.promisifyAll(gfs)
Promise.promisify(gfs.files.findOne)

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
  post('/v1/files', function *() {
    const ws = gfs.createWriteStream({
      filename: this.query.name,
      content_type: this.query.type,
      metadata: this.query.metadata
    })

    const fn = new Promise((resolve, reject) => {
      this.req.pipe(ws)
      ws.on('close', resolve)
      ws.on('error', reject)
    })

    this.body = yield fn.
      then(file => file).
      catch(err => this.throw(422, err))
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
  get('/v1/files/:id', function *() {
    const query = {_id: ObjectId(this.params.id)}
    yield gfs.files.
      findOne(query).
      then(file => {
        this.type = file.contentType
        this.body = file
        gfs.createReadStream(query).pipe(this.res)
      }).
      catch(err => this.throw(412, err))
  }).
  /**
  * @api {get} /v1/files/:id/check-exists Check if a file exists
  * @apiGroup File
  * @apiSuccess {String} id File id
  * @apiExample {json} Example usage:
  *   curl -X POST http://gridfs-api/v1/files/:id/check-exists \
  *   -d 'id=5674a8f04718fc712c0f05dd'
  * @apiSuccessExample {json} Success-Response:
  *   HTTP/1.1 200 true
  * @apiErrorExample {json} Error
  *   HTTP/1.1 412 Unprocessable Entity
  */
  get('/v1/files/:id/check-exists', function *() {
    const query = {_id: ObjectId(this.params.id)}
    yield gfs.exist(query).then(found => {
      this.body = found
    }).
    catch(err => this.throw(412, err))
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
  delete('/v1/files/:id', function *() {
    const query = {_id: ObjectId(this.params.id)}
    yield gfs.remove(query).then(() => {
      this.body = {message: 'OK'}
    }).
    catch(err => this.throw(412, err))
  })

module.exports = router
