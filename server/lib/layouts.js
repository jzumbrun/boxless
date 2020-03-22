const glob = require('glob')
const server = require('@app/lib/server')

/**
 * Layout
 * Load the Layouts
 */
class Layouts {
  /**
   * Load all of the layout files
   */
  load () {
    var files = glob.sync('server/routes/**/layouts')
    // Save it to the server views
    server.set('views', files)
  }
}

module.exports = new Layouts()
