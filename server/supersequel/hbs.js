const Handlebars = require('handlebars');

class Factory {
  constructor() {
    this.instance = Handlebars.create();
  }

  registerHelpers(helpers = []) {
    for (const helper of helpers) {
      // Set defaults
      helper.functions = helper.functions || [];
      helper.prefix = helper.prefix || '';

      // Register a helper for every function
      for (const fn in helper.functions) {
        if (typeof helper.functions[fn] == 'function') {
          this.instance.registerHelper(`${helper.prefix}${fn}`, function(
            ...args
          ) {
            return helper.functions[fn](...args);
          });
        }
      }
    }
  }
}

module.exports = () => {
  return new Factory();
};
