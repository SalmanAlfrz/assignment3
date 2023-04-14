const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

const userData = {
    username: 'user_pertama',
    email: 'user-pertama@mail.com',
    password: '123456'
}

const photoData = {
    title: 'photo pertama',
    caption: 'caption pertama',
    image_url: 'https://picsum.photos/200/300'
}

let token;

// before all test photo create user
beforeAll((done) => {
    request(app)
        .post('/users/register')
        .send(userData)
        .end((err, res) => {
            if (err) {
                done(err);
            } else {
                request(app)
                    .post('/users/login')
                    .send(userData)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                        } else {
                            token = res.body.token;
                            done();
                        }
                    });
            }
        });
});

// test photo create response 200 with token
describe('POST /photos', () => {
    it('should return 200 status code', (done) => {
        request(app)
            .post('/photos')
            .set('token', token)
            .send(photoData)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(200);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('title');
                    expect(res.body).toHaveProperty('caption');
                    expect(res.body).toHaveProperty('image_url');
                    expect(res.body).toHaveProperty('UserId');
                    expect(res.body.title).toEqual(photoData.title);
                    expect(res.body.caption).toEqual(photoData.caption);
                    expect(res.body.image_url).toEqual(photoData.image_url);
                    done();
                }
            });
    });
});

// test photo create response 401 without token
it('should return 401 status code', (done) => {
    request(app)
        .post('/photos')
        .send(photoData)
        .end((err, res) => {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).toEqual(401);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('jwt must be provided');
                done();
            }
        });
});

// test get all photo response success 200 with token response body must array
describe('GET /photos', () => {
    it('should return 200 status code', (done) => {
        request(app)
            .get('/photos')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(200);
                    expect(Array.isArray(res.body)).toEqual(true);
                    done();
                }
            });
    });
});


// test get all photo response 401 without token
it('should return 401 status code', (done) => {
    request(app)
        .get('/photos')
        .end((err, res) => {
            if (err) {
                done(err);
            } else {
                expect(res.statusCode).toEqual(401);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('jwt must be provided');
                done();
            }
        });
});

// test get photo by id response success 200 with token
describe('GET /photos/:id', () => {
    let photoId;
    // create photo baru untuk test get photo by id
    beforeAll(async () => {
        const photoResponse = await request(app)
            .post('/photos')
            .set('token', token)
            .send(photoData);
        photoId = photoResponse.body.id;
    });
    it('should return 200 status code', (done) => {
        request(app)
            .get(`/photos/${photoId}`)
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(200);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('title');
                    expect(res.body).toHaveProperty('caption');
                    expect(res.body).toHaveProperty('image_url');
                    expect(res.body).toHaveProperty('UserId');
                    expect(res.body.title).toEqual(photoData.title);
                    expect(res.body.caption).toEqual(photoData.caption);
                    expect(res.body.image_url).toEqual(photoData.image_url);
                    done();
                }
            });
    });
});

// test get photo by id response 401 without token
describe('GET /photos/:id', () => {
    let photoId;
    // create photo baru untuk test get photo by id
    beforeAll(async () => {
        const photoResponse = await request(app)
            .post('/photos')
            .set('token', token)
            .send(photoData);
        photoId = photoResponse.body.id;
    });
    it('should return 401 status code', (done) => {
        request(app)
            .get(`/photos/${photoId}`)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(401);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('message');
                    expect(res.body.message).toEqual('jwt must be provided');
                    done();
                }
            });
    });
});


// after all test photo delete user and photo
afterAll((done) => {
    sequelize.queryInterface.bulkDelete('Photos', {})
        .then(() => {
            return sequelize.queryInterface.bulkDelete('Users', {});
        })
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        });
});