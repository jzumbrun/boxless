import { Store } from 'supercapacitor'

class HomeStore extends Store {
  constructor () {
    super('home.stores.home')
  }

  /**
    * GetMe
    */
  getMe () {
    this.post(`/query`, {
      queries: [{
        name: 'me.select',
        properties: {
          select: ['id', 'firstName', 'lastName']
        }
    }]})
    .then((res) => {
        this.setState({ me: res.data.queries[0].results[0] })
        this.emit('getMe.success')
    })
  }
}

export default new HomeStore()
