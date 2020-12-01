const request = require('supertest')
const app = require('../app')

test('Post should return 200 by valid body', async () => {
    await request(app).post('/').send({
        "startDate": "2011-01-26",
        "endDate": "2019-01-01",
        "minCount": 1500,
        "maxCount": 3000
    }).expect(200)
})

test('Post should return 422 by invalid body', async () => {
    await request(app).post('/').send({
        "startDate": "2011-01-26",
        //endDate missing
        //"endDate": "2019-01-01",
        "minCount": 1500,
        "maxCount": 3000
    }).expect(422)
})

test('Post should return 422 by invalid body', async () => {
    await request(app).post('/').send({
        "startDate": "2011-01-26",
        "endDate": "2019-01-01",
        "minCount": 1500,
        //invalid param for maxCount
        "maxCount": "randomString"
    }).expect(422)
})