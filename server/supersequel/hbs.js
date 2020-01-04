const Handlebars = require('handlebars');
const SqlString = require('sqlstring');

class Factory {
  constructor() {
    this.instance = Handlebars.create();
    this.HTMLEscapeExpression = this.instance.Utils.escapeExpression;
    this.escaped = [];
  }

  /**
   * Compile
   * Allows us to override the escape expression just for this compile call.
   * @param {string} expression
   * @param {object} data
   */
  compile(expression, data) {
    this.escaped = [];
    this.registerEscapeExpression();
    let compiled = this.instance.compile(expression)(data);
    this.unRegisterEscapeExpression();
    return compiled;
  }

  /**
   * Register Escape Expression
   */
  registerEscapeExpression() {
    this.instance.Utils.escapeExpression = value => {
      if (this.escaped.indexOf(value) === -1) return SqlString.escape(value);
      return value;
    };
  }

  /**
   * Unregister Escape Expression
   */
  unRegisterEscapeExpression() {
    this.instance.Utils.escapeExpression = this.HTMLEscapeExpression;
  }

  /**
   * Register Helpers
   * @param {array} helpers
   */
  registerHelpers(helpers = []) {
    helpers.push({
      functions: {
        ':': value => {
          let escaped = SqlString.escapeId(value);
          // We do not want escape to run again
          this.escaped.push(escaped);
          return escaped;
        },
        '?': value => {
          return this.HTMLEscapeExpression(value);
        }
      }
    });

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
            let context = args.pop();
            // Are we dealing with a block?
            if (typeof context.fn === 'function') {
              return helper.functions[fn](context.fn(this), ...args);
            }
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
