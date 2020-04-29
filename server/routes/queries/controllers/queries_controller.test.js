const axios = require('axios')
const expect = require('expect')
const util = require('../../../lib/test/util')
const seeder = require('../../../lib/test/seeder')

describe('Seed', () => {
  it('seeding', done => {
    seeder
      .seed('greeting')
      .then(() => {
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

describe('Queries', () => {
  describe('greetings', () => {
    const url = util.buildUrl('query')

    it('set token', done => {
      axios
        .put(util.buildUrl('users/signin'), {
          email: 'master@dude.com',
          password: 'password123'
        })
        .then(response => {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${response.data.token}`
          }
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it('insert bad greetings properties', done => {
      axios
        .post(url, {
          queries: [
            {
              name: 'greetings.insert',
              properties: {
                extra: 'kind'
              }
            }
          ]
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data.queries).toEqual([
            {
              name: 'greetings.insert',
              error: {
                code: 'ERROR_QUERY_INBOUND_VALIDATION',
                details: [
                  {
                    dataPath: '',
                    keyword: 'additionalProperties',
                    message: 'should NOT have additional properties',
                    params: {
                      additionalProperty: 'extra'
                    },
                    schemaPath: '#/additionalProperties'
                  }
                ],
                errno: 1004
              }
            }
          ])
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it('insert missing name greetings', done => {
      axios
        .post(url, {
          queries: [
            {
              properties: {
                description: 'kind'
              }
            }
          ]
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data.queries).toEqual([
            {
              name: 'ERROR_MISSING_NAME',
              error: {
                code: 'ERROR_QUERY_NOT_FOUND',
                errno: 1002
              }
            }
          ])
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it('insert missing statement in definition', done => {
      axios
        .post(url, {
          queries: [
            {
              name: 'missing.statement'
            }
          ]
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data.queries).toEqual([
            {
              details: 'ER_EMPTY_QUERY: Query was empty',
              error: {
                code: 'ERROR_IMPROPER_QUERY_STATEMENT',
                errno: 1006
              },
              name: 'missing.statement'
            }
          ])
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it('insert greetings', done => {
      axios
        .post(url, {
          queries: [
            {
              name: 'greetings.insert',
              properties: {
                description: 'kind',
                words: 'hello'
              }
            },
            {
              name: 'greetings.insert',
              properties: {
                description: 'cool',
                words: 'yo'
              }
            }
          ]
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data.queries).toEqual([
            {
              name: 'greetings.insert',
              results: {
                affectedRows: 1,
                changedRows: 0,
                fieldCount: 0,
                insertId: 1,
                message: '',
                protocol41: true,
                serverStatus: 2,
                warningCount: 0
              }
            },
            {
              name: 'greetings.insert',
              results: {
                affectedRows: 1,
                changedRows: 0,
                fieldCount: 0,
                insertId: 2,
                message: '',
                protocol41: true,
                serverStatus: 2,
                warningCount: 0
              }
            }
          ])
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it('greetings.select.after.insert', done => {
      axios
        .post(url, {
          queries: [
            {
              name: 'greetings.select.byDescription',
              properties: {
                description: 'kind',
                limit: 1
              }
            }
          ]
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data.queries).toEqual([
            {
              name: 'greetings.select.byDescription',
              results: [{ id: 1, description: 'kind', words: 'hello' }]
            }
          ])
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it('greetings.update', done => {
      axios
        .post(url, {
          queries: [
            {
              name: 'greetings.update',
              properties: {
                id: 1,
                description: 'nice'
              }
            },
            {
              name: 'greetings.update',
              properties: {
                id: 2,
                description: 'chill'
              }
            }
          ]
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data.queries).toEqual([
            {
              name: 'greetings.update',
              results: {
                affectedRows: 1,
                changedRows: 1,
                fieldCount: 0,
                insertId: 0,
                message: '(Rows matched: 1  Changed: 1  Warnings: 0',
                protocol41: true,
                serverStatus: 2,
                warningCount: 0
              }
            },
            {
              name: 'greetings.update',
              results: {
                affectedRows: 1,
                changedRows: 1,
                fieldCount: 0,
                insertId: 0,
                message: '(Rows matched: 1  Changed: 1  Warnings: 0',
                protocol41: true,
                serverStatus: 2,
                warningCount: 0
              }
            }
          ])
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it('greetings.select.after.update', done => {
      axios
        .post(url, {
          queries: [
            {
              name: 'greetings.select',
              properties: {
                select: ['description', 'words'],
                limit: 2
              }
            }
          ]
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data.queries).toEqual([
            {
              name: 'greetings.select',
              results: [
                { description: 'nice', words: 'hello' },
                { description: 'chill', words: 'yo' }
              ]
            }
          ])
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it('greetings.delete', done => {
      axios
        .post(url, {
          queries: [
            {
              name: 'greetings.delete',
              properties: {
                id: 2
              }
            }
          ]
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data.queries).toEqual([
            {
              name: 'greetings.delete',
              results: {
                affectedRows: 1,
                changedRows: 0,
                fieldCount: 0,
                insertId: 0,
                message: '',
                protocol41: true,
                serverStatus: 2,
                warningCount: 0
              }
            }
          ])
          done()
        })
        .catch(error => {
          done(error)
        })
    })

    it('greetings.select.after.delete', done => {
      axios
        .post(url, {
          queries: [
            {
              name: 'greetings.select',
              properties: {
                select: ['id', 'description', 'words'],
                limit: 2
              }
            }
          ]
        })
        .then(response => {
          expect(response.status).toEqual(200)
          expect(response.data.queries).toEqual([
            {
              name: 'greetings.select',
              results: [{ id: 1, description: 'nice', words: 'hello' }]
            }
          ])
          done()
        })
        .catch(error => {
          done(error)
        })
    })
  })
})

describe('Deseed', () => {
  it('deseeding', done => {
    seeder
      .deseed('greeting')
      .then(() => {
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})
