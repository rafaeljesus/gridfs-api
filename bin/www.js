import http from 'http'

import app from '../'

const port = process.env.PORT || 3000

http.globalAgent.maxSockets = Infinity
http.createServer(app.callback())

app.listen(port)

console.log(`GridFS API - port ${port}`)
