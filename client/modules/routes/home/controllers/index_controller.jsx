import React from 'react'
import { Component } from 'supercapacitor'
import UserStore from '../../users/stores/user_store'
import HomeStore from '../../home/stores/home_store'

class Index extends Component {
  constructor (props) {
    super(props)
    UserStore.is('user', true)

    this.connect(HomeStore, 'getMe.success', this.onGetMeSuccess.bind(this))
  }

  componentDidMount () {
    super.componentDidMount()
    HomeStore.getMe()
  }

  onGetMeSuccess (data) {
    debugger
    this.setState(data)
  }

  render () {
    var homeState = HomeStore.getState()
    console.log(homeState)
    return (
      <div className='container'>
        <div className='page-header'>
          <h1>Welcome Home {homeState.me?.firstName}</h1>
        </div>
      </div>
    )
  }
}

export default Index
