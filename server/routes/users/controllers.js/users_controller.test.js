const axios = require('axios');
const expect = require('expect');
const util = require('@app/lib/test/util');
const seeder = require('@app/lib/test/seeder');

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
    let url = util.buildUrl('query');

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
          done(error.response.data);
        });
    });

    it('signin new user', done => {
      axios
        .put(util.buildUrl('users/signin'), {
          name: 'Double Dude',
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
          done(error.response.data);
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
          axios.defaults.headers.common = {};
          done();
        })
        .catch(error => {
          done(error.response.data);
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
          done(error.response.data);
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
            'Contest Farm Password Reset'
          );
          expect(response.data[0].details.text).toContain(
            'http://localhost:8081/#/users/reset/2/'
          );
          done();
        })
        .catch(error => {
          done(error.response.data);
        });
    });

    // it('reset wrong', (done) => {
    //     axios.put(util.buildUrl('users/reset'), {
    //         id: '2',
    //         reset: '123'
    //     }).then((response) => {
    //         expect(response.status).toEqual(200)
    //         expect(response.data[0].details.from).toEqual('Supercontainer')
    //         expect(response.data[0].details.to).toEqual('triple@dude.com')
    //         expect(response.data[0].details.subject).toEqual('Contest Farm Password Reset')
    //         expect(response.data[0].details.text).toContain('http://localhost:8081/#/users/reset/2/')
    //         done()
    //     }).catch(error => {
    //         done(error.response.data)
    //     })
    // })
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
