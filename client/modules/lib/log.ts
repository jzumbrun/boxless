import { isString } from 'underscore'

class Log {
  log: boolean
  record: boolean
  constructor () {
    this.log = true
    this.record = true
  }

  /**
   * Og
   */
  og (options: string | Record<string,string>) {
    let log = {}
    if (isString(options)) log = { _: options }
    else {
      log = options;
      (options as Record<string,string>).rec && this.rec(log)
    }
    this.log && console.log(log)
  }

  /**
   * Rec
   */
  rec (log: unknown) {
    // TODO send log to somewhere other than console
  }
}

export default new Log()
