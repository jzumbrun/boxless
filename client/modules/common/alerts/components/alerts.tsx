import React from 'react'
import AlertStore, { IAlert, IMessage } from '../stores/alert_store.js'

interface IProps {

}

interface IState {
  alerts: IAlert[]
}

class Alerts extends React.Component {
  state: IState
  constructor (props: IProps) {
    super(props)

    this.state = {
      alerts: []
    }

    AlertStore.on('add.success', (alerts: IAlert[]) => {
      this.setState({ alerts: alerts })
    })

    AlertStore.on('delete.success', (alerts: IAlert[]) => {
      this.setState({ alerts: alerts })
    })
  }

  /**
    * Handle Dismiss
    */
  handleDismiss (message: IMessage) {
    AlertStore.delete(message)
  }

  render () {
    return (
      <div id='alerts'>
        {this.state.alerts.map((alert, key) => {
          return (
            <div key={key} className={'alert alert-' + alert.type + ' alert-dismissible'} role='alert'>
              <button type='button' className='close' onClick={this.handleDismiss.bind(this, alert.message)} data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              {alert.title ? <h4>{alert.title}</h4> : ''}
              {alert.message}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Alerts
