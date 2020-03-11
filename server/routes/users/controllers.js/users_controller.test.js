const { get } = require('lodash');
const axios = require('axios');
const expect = require('expect');
const util = require('@app/lib/test/util');
const seeder = require('@app/lib/test/seeder');

function getUserFromToken(token) {
  token = Buffer.from(token.split('.')[1], 'base64').toString('utf-8');
  return JSON.parse(token);
}

describe('Seed', () => {
  it('seeding', done => {
    seeder
      .seed('user')
      .then(() => {
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});

describe('Users', () => {
  describe('management', () => {

    let reset;

    it('signup existing user', done => {
      axios
        .post(util.buildUrl('users/signup'), {
          email: 'master@dude.com',
          password: 'wrongpasswordhere'
        })
        .catch(error => {
          expect(error.response.status).toEqual(422);
          expect(error.response.data).toEqual({
            error: { errno: 2001, code: 'ERROR_EMAIL_EXISTS' }
          });
          done();
        });
    });

    it('signup new user', done => {
      axios
        .post(util.buildUrl('users/signup'), {
          name: 'Double Dude',
          email: 'dude@dude.com',
          password: 'password321'
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.data.token.length).toBeGreaterThan(20);
          done();
        })
        .catch(error => {
          done(get(error, 'response.data', error));
        });
    });

    it('signin new user', done => {
      axios
        .put(util.buildUrl('users/signin'), {
          email: 'dude@dude.com',
          password: 'password321'
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.data.token.length).toBeGreaterThan(20);
          axios.defaults.headers.common = {
            Authorization: `Bearer ${response.data.token}`
          };
          done();
        })
        .catch(error => {
          done(get(error, 'response.data', error));
        });
    });

    it('update session user', done => {
      axios
        .put(util.buildUrl('users/session'), {
          name: 'Triple Dude',
          email: 'triple@dude.com',
          password: 'password123321'
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.data.token.length).toBeGreaterThan(20);

          const user = getUserFromToken(response.data.token);
          expect(user).toEqual({
            id: 2,
            name: 'Triple Dude',
            email: 'triple@dude.com',
            access: ["user"],
            exp: user.exp,
            iat: user.iat
          });
          axios.defaults.headers.common = {
            Authorization: `Bearer ${response.data.token}`
          };
          done();
        })
        .catch(error => {
          done(get(error, 'response.data', error));
        });
    });

    it('update session user name', done => {
      axios
        .put(util.buildUrl('users/session'), {
          name: 'Triple Triple TripleDude'
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.data.token.length).toBeGreaterThan(20);

          const user = getUserFromToken(response.data.token);
          expect(user).toEqual({
            id: 2,
            name: 'Triple Triple TripleDude',
            email: 'triple@dude.com',
            access: ["user"],
            exp: user.exp,
            iat: user.iat
          });

          axios.defaults.headers.common = {
            Authorization: `Bearer ${response.data.token}`
          };
          done();
        })
        .catch(error => {
          done(get(error, 'response.data', error));
        });
    });

    it('signin updated user with wrong password', done => {
      axios
        .put(util.buildUrl('users/signin'), {
          email: 'triple@dude.com',
          password: 'password321'
        })
        .catch(error => {
          expect(error.response.status).toEqual(422);
          expect(error.response.data).toEqual({
            errno: 2000,
            code: 'ERROR_USER_NOT_FOUND'
          });
          done();
        });
    });

    it('signin updated user with good password', done => {
      axios
        .put(util.buildUrl('users/signin'), {
          email: 'triple@dude.com',
          password: 'password123321'
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.data.token.length).toBeGreaterThan(20);
          axios.defaults.headers.common = {};
          done();
        })
        .catch(error => {
          done(get(error, 'response.data', error));
        });
    });

    it('forgot error', done => {
      axios
        .put(util.buildUrl('users/forgot'), {
          email: 'nothing@nothing.com'
        })
        .catch(error => {
          expect(error.response.status).toEqual(422);
          expect(error.response.data.error).toEqual({
            errno: 2002,
            code: 'ERROR_EMAIL_DOES_NOT_EXIST'
          });
          done();
        });
    });

    it('forgot', done => {
      axios
        .put(util.buildUrl('users/forgot'), {
          email: 'triple@dude.com'
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.data[0].details.from).toEqual('Supercontainer');
          expect(response.data[0].details.to).toEqual('triple@dude.com');
          expect(response.data[0].details.subject).toEqual(
            'Super Container Password Reset'
          );
          expect(response.data[0].details.text).toContain(
            'http://localhost:8081/#/users/reset/2/'
          );

          let sections = response.data[0].details.text.split('/');
          reset = sections[sections.length -1];
          done();
        })
        .catch(error => {
          done(get(error, 'response.data', error));
        });
    });

    it('reset wrong', (done) => {
      axios.put(util.buildUrl('users/reset'), {
          id: 2, password: 'resetPassword123321', reset: 'ABCDEFG'
      }).catch(error => {
        expect(error.response.status).toEqual(422);
        expect(error.response.data.error).toEqual({
          errno: 2000,
          code: 'ERROR_USER_NOT_FOUND'
        });
        done();
      })
    });

    it('reset', (done) => {
        axios.put(util.buildUrl('users/reset'), {
            id: 2, password: 'resetPassword123321', reset
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data.token.length).toBeGreaterThan(20);
          done();
        })
        .catch(error => {
          done(get(error, 'response.data', error));
        })
    });

    it('signin reset user', done => {
      axios
        .put(util.buildUrl('users/signin'), {
          email: 'triple@dude.com',
          password: 'resetPassword123321'
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.data.token.length).toBeGreaterThan(20);
          const user = getUserFromToken(response.data.token);
          expect(user).toEqual({
            id: 2,
            name: 'Triple Triple TripleDude',
            email: 'triple@dude.com',
            access: ["user"],
            exp: user.exp,
            iat: user.iat
          });
          done();
        })
        .catch(error => {
          done(get(error, 'response.data', error));
        });
    });
  });
});

describe('Deseed', () => {
  it('deseeding', done => {
    seeder
      .deseed('user')
      .then(() => {
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});
