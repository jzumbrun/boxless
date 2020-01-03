const glob = require('glob');

/**
 * Controllers
 * Controll the requests and data.
 */
class Controllers {
  /**
   * Load all of the controller files
   */
  load() {
    var files = glob.sync('server/routes/**/*_controller.js');

    files.forEach(function(file) {
      require(`../../${file}`);
    });
  }
}

module.exports = new Controllers();
