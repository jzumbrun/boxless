const _ = require('lodash')
const nodemailer = require('nodemailer')
const config = require('../config')
const server = require('./server')

/**
 * Mailer
 * Merge config defaults and send single or multiple mails
 *
 * @param (object) express server
 */
class Mailer {
  constructor () {
    this.options = {}
    this.transporter = config.mailProvider.smtp
      ? nodemailer.createTransport(config.mailProvider.smtp)
      : null
  }

  /**
   * Set Defaults
   * Prep the config defaults, send the message
   *
   * @param (literal) options
   * @return (object) smtpTransport
   */
  setDefaults (options) {
    this.options = options

    // always force messages to be an array for convenience
    if (!_.isArray(this.options.message)) {
      this.options.message = [this.options.message]
    }

    // add mail if no parent dir is listed
    if (this.options.view.split('/').length) {
      this.options.view = 'mail/' + this.options.view
    }
  }

  /**
   * Transport
   * Loops through messages applying the view, then send mail
   *
   * @return (object) smtpTransport
   */
  async transport () {
    const log = []

    // we will always loop even on one message
    for (const message of this.options.message) {
      try {
        const out = await new Promise((resolve, reject) => {
          server.render(this.options.view, message.data, (error, out) => {
            if (error) reject(error)
            else resolve(out)
          })
        })

        const send = {
          from: config.mailProvider.from,
          to: message.to,
          subject: message.subject,
          text: out
        }

        log.push({ code: 'presend', details: send })
        if (config.mailProvider.smtp) {
          const sent = await new Promise((resolve, reject) => {
            this.transporter.sendMail(send, (error, info) => {
              if (error) reject(error)
              else resolve({ code: 'sentSuccess', details: info })
            })
          })
          log.push({ code: 'sentSuccess', details: sent })
        }
      } catch (error) {
        log.push(error)
      }
    }

    return log
  }

  /**
   * Send
   * Send the message using SMTP
   *
   * @param (literal) options
   * @return (object) smtpTransport
   */
  send (options) {
    this.setDefaults(options)
    return this.transport()
  }
}

/**
 * Mailer
 *
 */
module.exports = Mailer
