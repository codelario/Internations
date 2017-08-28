const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { Users } = require('../models/users.model');
const { Groups } = require('../models/groups.model');

const app = require('../server');

const users = [{
  _id: new ObjectID(),
  name: 'Jon',
  lastname: 'Snow'
}, {
  _id: new ObjectID(),
  name: 'Sansa',
  lastname: 'Stark',
  completed: true,
  completedAt: 333
}];

const groups = [{
  _id: new ObjectID(),
  name: 'Grupo 1'
}, {
  _id: new ObjectID(),
  name: 'Grupo 2'
}, {
  _id: new ObjectID(),
  name: 'Grupo 3'
}];

beforeEach((done) => {
  Users.remove({}).then(() => {
    return Users.insertMany(users);
  }).then(() => done());
});

beforeEach((done) => {
  Groups.remove({}).then(() => {
    return Groups.insertMany(groups);
  }).then(() => done());
});

describe('GET /users', () => {
  it('should get all users', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.users.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /groups', () => {
  it('should get all groups', (done) => {
    request(app)
      .get('/groups')
      .expect(200)
      .expect((res) => {
        expect(res.body.groups.length).toBe(3);
      })
      .end(done);
  });

  describe('POST /users', () => {
    it('should create a new user', (done) => {
      let user = {
        name: "test",
        lastname: "test"
      }

      request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(user))
        .expect(200)
        .expect((res) => {
          expect(res.body.users.name).toBe(user.name);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Users.findById(new ObjectID(res.body.users._id)).then((users) => {
            expect(users.name).toBe(user.name);
            expect(users.lastname).toBe(user.lastname);
            done();
          }).catch((e) => done(e));
        });
    });
  });
});