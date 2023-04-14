const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const userData = {
    username: 'user_pertama',
    email: 'user-pertama@mail.com',
    password: '123456'
}

describe('POST /users/register', () => {
    it('should return 201 status code', (done) => {
        request(app)
            .post('/users/register')
            .send(userData)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.statusCode).toEqual(201);
                    expect(typeof res.body).toEqual('object');
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('username');
                    expect(res.body).toHaveProperty('email');
                    expect(res.body.username).toEqual(userData.username);
                    expect(res.body.email).toEqual(userData.email);
                    done();
                }
            });
    });
});

describe('POST /users/login', () => {
    it('should return 200 status code', (done) => {
        request(app)
            .post('/users/login')
            .send(userData)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('token');
                expect(typeof res.body.token).toEqual('string');
                done();
            });
    });
});

const wrongUser = {
    username: 'user_pertama',
    email: 'wronguser@mail.com',
    password: '123456'
}

it('should return 401 status code', (done) => {
    request(app)
        .post('/users/login')
        .send(wrongUser)
        .end((err, res) => {
            if (err) {
                done(err);
            }
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual('object');
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('devMessage');
            expect(res.body.name).toEqual('User Login Error');
            done();
        });
});

afterAll((done) => {
    sequelize.queryInterface.bulkDelete('Users', {})
        .then(() => {
            done();
        })
        .catch(err => {
            done(err);
        });
});