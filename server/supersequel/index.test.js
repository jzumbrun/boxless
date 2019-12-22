const expect = require('expect')
const { route } = require('./index')

function release(response) {
    // nothing
}

function query(expression) {
    return new Promise((resolve, reject) => {
        const number = parseInt(expression)
        if(parseInt(expression) > -1) {
            setTimeout(() => {
                resolve(expression)
            }, number)
        }
        else {
            resolve(expression)
        }
        
    })
}

describe('Supersequel', () => {

    describe('route', (done) => {
            
        const res = {
            send: (response) => {
                res.data = response
            }
        }
        
        it('sql injection', (done) => {
            route({
                user: {
                    id: 123,
                    access: ['user']
                },
                body: {
                    queries: [
                        {
                            name: 'sql.injection',
                            properties: {
                                select: ['id'],
                                injection: 'OR 1=1;'
                            }
                        }
                    ]
                }
            }, res, {
                definitions: [
                    {
                        name: 'sql.injection',
                        expression: 'SELECT {{select}} FROM Users WHERE UserId = 105 {{injection}}',
                        access: ['user']
                    }
                ],
                query: query,
                release: release
            }).then(() => {
                expect(res.data.queries[0].results).toEqual('SELECT id FROM Users WHERE UserId = 105 OR 1&#x3D;1;')
                done()
            }).catch(() => {
                done()
            })
        })

        it('sync', (done) => {
            route({
                user: {
                    id: 123,
                    access: ['user']
                },
                body: {
                    queries: [
                        {
                            id: '1',
                            name: 'long',
                            sync: true
                        },
                        {
                            id: '2',
                            name: 'long'
                        },
                        {
                            id: '3',
                            name: 'short'
                        },
                        {
                            id: '4',
                            name: 'immediate',
                            sync: true
                        }
                    ]
                }
            }, res, {
                definitions: [
                    {
                        name: 'immediate',
                        expression: '0',
                        access: ['user']
                    },
                    {
                        name: 'short',
                        expression: '100',
                        access: ['user']
                    },
                    {
                        name: 'long',
                        expression: '200',
                        access: ['user']
                    }
                ],
                query: query,
                release: release
            }).then(() => {
                expect(res.data.queries).toEqual([
                    { id: '1', name: 'long', results: '200' },
                    { id: '4', name: 'immediate', results: '0' },
                    { id: '3', name: 'short', results: '100' },
                    { id: '2', name: 'long', results: '200' }
                    ])
                done()
            }).catch(() => {
                done()
            })
        })
    })
})
