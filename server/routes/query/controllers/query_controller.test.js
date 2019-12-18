const axios = require('axios')
const expect = require('expect')
const util = require('@app/lib/test/util')
const seeder = require('@app/lib/test/seeder')


describe('Seed', () => {
    it('seeding...', (done) => {
        seeder.seed()
        .then(() => {
            done()
        }).catch(error => {
            done(error)
        })

    })
})

describe('Queries', () => {

    describe('greetings', () => {
        let url = util.buildUrl('query')
        
        it('set token', (done) => {
            axios.put(util.buildUrl('users/signin'), {
                email: 'master@dude.com',
                password: 'password123'  
            }).then((response) => {
                axios.defaults.headers.common = {Authorization: `Bearer ${response.data.token}`}
                done()
            }).catch(error => {
                done(error)
            })
        })

        it('insert greetings', (done) => {
            axios.post(url, {
                queries: [{
                    name: 'greetings.insert',
                    properties: {
                        'description': 'kind',
                        'words': 'hello'
                    }
                },{
                    name: 'greetings.insert',
                    properties: {
                        'description': 'cool',
                        'words': 'yo'
                    }
                }]
            }).then(response => {
                expect(response.status).toEqual(200)
                expect(response.data.queries).toEqual([{
                    name: 'greetings.insert',
                    results: {
                        'affectedRows': 1,
                        'changedRows': 0,
                        'fieldCount': 0,
                        'insertId': 1,
                        'message': '',
                        'protocol41': true,
                        'serverStatus': 2,
                        'warningCount': 0
                    }
                },
                {
                    name: 'greetings.insert',
                    results: {
                        'affectedRows': 1,
                        'changedRows': 0,
                        'fieldCount': 0,
                        'insertId': 2,
                        'message': '',
                        'protocol41': true,
                        'serverStatus': 2,
                        'warningCount': 0
                    }
                }])
                done()
            }).catch(error => {
                done(error)
            })
        })

        it('greetings.select.after.insert', (done) => {
            axios.post(url, {
                queries: [{
                    name: 'greetings.select.byDescription',
                    properties: {
                        'description': 'kind',
                        'limit': 1
                    }
                }]
            }).then(response => {
                expect(response.status).toEqual(200)
                expect(response.data.queries).toEqual([{
                    name: 'greetings.select.byDescription',
                    results: [ { id: 1, description: 'kind', words: 'hello', user_id: 1 } ]
                }])
                done()
            }).catch(error => {
                done(error)
            })
        })

        it('greetings.update', (done) => {
            axios.post(url, {
                queries: [{
                    name: 'greetings.update',
                    properties: {
                        'id': 1,
                        'description': 'nice',
                    }
                },{
                    name: 'greetings.update',
                    properties: {
                        'id': 2,
                        'description': 'chill',
                    }
                }]
            }).then(response => {
                expect(response.status).toEqual(200)
                expect(response.data.queries).toEqual([{
                    name: 'greetings.update',
                    results: {
                      fieldCount: 0,
                      affectedRows: 1,
                      insertId: 0,
                      serverStatus: 2,
                      warningCount: 0,
                      message: '(Rows matched: 1  Changed: 1  Warnings: 0',
                      protocol41: true,
                      changedRows: 1
                    }
                  },
                  {
                    name: 'greetings.update',
                    results: {
                      fieldCount: 0,
                      affectedRows: 1,
                      insertId: 0,
                      serverStatus: 2,
                      warningCount: 0,
                      message: '(Rows matched: 1  Changed: 1  Warnings: 0',
                      protocol41: true,
                      changedRows: 1
                    }
                  }
                ])
                done()
            }).catch(error => {
                done(error)
            })
        })

        it('greetings.select.after.update', (done) => {
            axios.post(url, {
                queries: [{
                    name: 'greetings.select',
                    properties: {
                        'select': ["description", "words"],
                        'limit': 2
                    }
                }]
            }).then(response => {
                expect(response.status).toEqual(200)
                expect(response.data.queries).toEqual([{
                    name: 'greetings.select',
                    results: [ { description: 'nice', words: 'hello' }, { description: 'chill', words: 'yo' } ] }])
                done()
            }).catch(error => {
                done(error)
            })
        })

        it('greetings.delete', (done) => {
            axios.post(url, {
                queries: [{
                    name: 'greetings.delete',
                    properties: {
                        'id': 2,
                    }
                }]
            }).then(response => {
                expect(response.status).toEqual(200)
                expect(response.data.queries).toEqual([{
                    name: 'greetings.delete',
                    results: {
                        fieldCount: 0,
                        affectedRows: 1,
                        insertId: 0,
                        serverStatus: 2,
                        warningCount: 0,
                        message: '',
                        protocol41: true,
                        changedRows: 0
                      }
                }])
                done()
            }).catch(error => {
                done(error)
            })
        })

        it('greetings.select.after.delete', (done) => {
            axios.post(url, {
                queries: [{
                    name: 'greetings.select',
                    properties: {
                        'select': ["id", "description", "words"],
                        'limit': 2
                    }
                }]
            }).then(response => {
                expect(response.status).toEqual(200)
                expect(response.data.queries).toEqual([{
                    name: 'greetings.select',
                    results: [ { id: 1, description: 'nice', words: 'hello' } ] } ])
                done()
            }).catch(error => {
                done(error)
            })
        })

    })
})

describe('Deseed', () => {
    it('deseeding...', (done) => {
        seeder.deseed()
        .then(() => {
            done()
        }).catch(error => {
            done(error)
        })

    })
})