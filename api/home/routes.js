'use strict'

const express = require('express')
  , router = express.Router()

/**
 * @api {get} / API Status
 * @apiGroup Status
 * @apiSuccess {String} status API status message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "GridFS API"
 *    }
 */
router.
  get('/', (req, res) => {
    return res.status(200).json({
      status: 'GridFS API'
    })
  })

module.exports = router
