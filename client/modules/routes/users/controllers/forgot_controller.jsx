import React from 'react'
import { Component } from 'supercapacitor'
import UserStore from '../stores/user_store'
import AlertStore from '../../../common/alerts/stores/alert_store.js'
import FormLib from '../../../lib/form'
import lang from '../../../lib/lang'

class Forgot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        email: '',
        alerts: []
      }
    }
    this.connect(UserStore, 'forgot.success', this.onForgotSuccess.bind(this))
  }

  onForgotSuccess () {
    AlertStore.add({ type: 'success', message: lang('reset_email_sent') })
  }

  /**
    * Handle Sign Up
    */
  handleSubmit (e) {
    e.preventDefault()
    UserStore.forgot(this.state.form)
  }

  render () {
    return (
      <div className='col-md-8 col-md-offset-2 '>
        <form>
          <div className='panel panel-default margin-top-xlg'>

            <div className='panel-heading'>
                            Forgot Password
            </div>
            <div className='panel-body'>
              <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input type='text' className='form-control' onChange={FormLib.handleChange(this, 'email')} />
              </div>

              <button onClick={this.handleSubmit.bind(this)} className='btn btn-primary'>GO</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Forgot
