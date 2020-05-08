var jsdom = require('mocha-jsdom')
var React = require('react')
var ReactDOM = require('react-dom')
var TestUtils = require('react-addons-test-utils')
var Signup = {}

require('should')

describe('Signup', function () {
  jsdom()

  before(function () {
    global.localStorage = {
      getItem: function () {},
      setItem: function () {}
    }
  })

  beforeEach(function () {
    Signup = require('../components/signup.jsx')
  })

  describe('form', function () {
    it('should have correct fields', function () {
      var $ = require('jquery')

      // Render a checkbox with label in the document
      var signup, signupHtml

      signup = TestUtils.renderIntoDocument(<Signup />)
      signupHtml = ReactDOM.findDOMNode(signup).outerHTML

      $(signupHtml, window).find('input').should.have.length(4)
    })
  })
})
