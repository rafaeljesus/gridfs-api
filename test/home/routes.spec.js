import supertest from 'supertest'

import app from '../../'

const request = supertest(app.listen())

describe('Home:RoutesSpec', () => {
  it('should return 200', (done) => {
    request.get('/').expect(200, done)
  })
})
