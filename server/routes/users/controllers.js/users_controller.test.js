const axios = require('axios')
const expect = require('expect')
const util = require('@app/lib/test/util')


describe('Users', function() {

    describe('manage', () => {
        let url = util.buildUrl('query')

        it('signup', (done) => {
            axios.post(url, {
                queries: [{
                    name: '_.users.signup',
                    params: {
                        'name': 'JZ',
                        'email': 'jzumbrun@gmail.com',
                        'password': 'jz321321'
                    }
                }]
            }).then(response => {
                expect(response.status).toEqual(200)
                expect(response.data.queries).toEqual()
                done()
            }).catch(error => {
                console.log(error)
                done(error)
            })
        })
    })
})