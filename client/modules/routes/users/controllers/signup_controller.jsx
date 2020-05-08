import React from 'react'
import { Component } from 'supercapacitor'
import UserStore from 'modules/routes/users/stores/user_store'
import FormLib from 'modules/lib/form'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }

    }
  }

  /**
    * Handle Sign Up
    */
  handleSubmit (e) {
    e.preventDefault()
    UserStore.signUp(this.state.form)
  }

  render () {
    // Do not render if token
    if (this.props.match.params && this.props.match.params.token) { return (<p />) }

    return (
      <div className='col-md-8 col-md-offset-2'>
        <form>
          <div className='panel panel-default margin-top-xlg'>

            <div className='panel-heading'>
                            Sign Up
            </div>
            <div className='panel-body'>
              <div className='col-md-6 form-group'>
                <label htmlFor='firstName'>First Name</label>
                <input type='text' className='form-control' value={this.state.form.firstName} onChange={FormLib.handleChange.bind(this, 'firstName')} />
              </div>
              <div className='col-md-6 form-group'>
                <label htmlFor='lastName'>Last Name</label>
                <input type='text' className='form-control' value={this.state.form.lastName} onChange={FormLib.handleChange.bind(this, 'lastName')} />
              </div>
              <div className='col-md-6 form-group'>
                <label htmlFor='email'>Email Address</label>
                <input type='text' className='form-control' value={this.state.form.email} onChange={FormLib.handleChange.bind(this, 'email')} />
              </div>
              <div className='col-md-6 form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' className='form-control' value={this.state.form.password} onChange={FormLib.handleChange.bind(this, 'password')} />
              </div>
              <div className='col-md-6 form-group'>
                <button onClick={this.handleSubmit.bind(this)} className='btn btn-primary'>Sign Up</button>
              </div>
            </div>
          </div>
          <div className='text-center'><a href='/#/users/signin'>Already have an Account? Sign In</a></div>

        </form>
      </div>
    )
  }
}

export default SignUp
