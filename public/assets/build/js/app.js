/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.jsx":
/*!*****************!*\
  !*** ./app.jsx ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ./modules/lib/mixins */ \"./modules/lib/mixins.ts\");\nconst underscore_1 = __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore.js\");\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_dom_1 = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\nconst supercapacitor_1 = __webpack_require__(/*! supercapacitor */ \"./node_modules/supercapacitor/dist/supercapacitor.js\");\nconst config_1 = __webpack_require__(/*! ./config */ \"./config.js\");\nconst alerts_jsx_1 = __webpack_require__(/*! ./modules/common/alerts/components/alerts.jsx */ \"./modules/common/alerts/components/alerts.jsx\");\nconst alert_store_1 = __webpack_require__(/*! ./modules/common/alerts/stores/alert_store */ \"./modules/common/alerts/stores/alert_store.js\");\nconst modals_jsx_1 = __webpack_require__(/*! ./modules/common/modals/components/modals.jsx */ \"./modules/common/modals/components/modals.jsx\");\nconst topnav_jsx_1 = __webpack_require__(/*! ./modules/layouts/components/topnav.jsx */ \"./modules/layouts/components/topnav.jsx\");\nconst signin_controller_jsx_1 = __webpack_require__(/*! ./modules/routes/users/controllers/signin_controller.jsx */ \"./modules/routes/users/controllers/signin_controller.jsx\");\nconst notfound_controller_jsx_1 = __webpack_require__(/*! ./modules/layouts/controllers/notfound_controller.jsx */ \"./modules/layouts/controllers/notfound_controller.jsx\");\nconst user_store_1 = __webpack_require__(/*! ./modules/routes/users/stores/user_store */ \"./modules/routes/users/stores/user_store.js\");\nconst routes_jsx_1 = __webpack_require__(/*! ./modules/routes/users/routes.jsx */ \"./modules/routes/users/routes.jsx\");\nconst routes_jsx_2 = __webpack_require__(/*! ./modules/routes/home/routes.jsx */ \"./modules/routes/home/routes.jsx\");\nconst lang_1 = __webpack_require__(/*! ./modules/lib/lang */ \"./modules/lib/lang.ts\");\nclass App extends react_1.default.Component {\n    constructor(props) {\n        super(props);\n        config_1.default.setEnv();\n    }\n    componentDidMount() {\n        this.registerGlobalEvents();\n    }\n    registerGlobalEvents() {\n        this.registerGlobalErrors();\n        user_store_1.default.on('signout.success', () => underscore_1.default.route('users/signin'));\n    }\n    /**\n       * Register Global Errors\n       */\n    registerGlobalErrors() {\n        function showErrors(errors) {\n            if (!underscore_1.default.isEmpty(errors)) {\n                underscore_1.default.each(errors, (error, name) => {\n                    error.title = 'Error';\n                    error.type = 'danger';\n                    error.message = lang_1.default(error.message);\n                    alert_store_1.default.add(error);\n                });\n            }\n        }\n        // Set events that handle signout and global app errors, etc\n        supercapacitor_1.Event.on('store.request.error.signout', (errors) => {\n            user_store_1.default.signOut();\n            if (!underscore_1.default.isEmpty(errors))\n                errors = [{ type: 'danger', message: 'Your session ended. Please log back in.' }];\n            showErrors(errors);\n        });\n        // Global error handling\n        supercapacitor_1.Event.on('store.request.error.landing', (errors) => {\n            showErrors(errors);\n            underscore_1.default.route('home/index');\n        });\n        supercapacitor_1.Event.on('store.request.error.maintenance', () => underscore_1.default.route('/maintenance'));\n        supercapacitor_1.Event.on('store.request.error.notfound', () => underscore_1.default.route('notfound'));\n        supercapacitor_1.Event.on('store.request.error', (errors) => showErrors(errors));\n    }\n    render() {\n        return (react_1.default.createElement(\"div\", null,\n            react_1.default.createElement(topnav_jsx_1.default, null),\n            react_1.default.createElement(alerts_jsx_1.default, null),\n            react_1.default.createElement(modals_jsx_1.default, null),\n            react_1.default.createElement(\"div\", { className: 'container' },\n                react_1.default.createElement(react_router_dom_1.Switch, null,\n                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: signin_controller_jsx_1.default }),\n                    react_1.default.createElement(react_router_dom_1.Route, { path: '/users', component: routes_jsx_1.default }),\n                    react_1.default.createElement(react_router_dom_1.Route, { path: '/home', component: routes_jsx_2.default }),\n                    react_1.default.createElement(react_router_dom_1.Route, { component: notfound_controller_jsx_1.default })))));\n    }\n}\nreact_dom_1.default.render(react_1.default.createElement(react_router_dom_1.HashRouter, null,\n    react_1.default.createElement(App, null)), document.getElementById('app'));\n\n\n//# sourceURL=webpack:///./app.jsx?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Config\n */\nclass Config {\n    constructor() {\n        this.env = '';\n    }\n    /**\n       * getEnv\n       */\n    getEnv() {\n        return this.env;\n    }\n    /**\n       * Is Local\n       */\n    isLocal() {\n        return this.env === 'local';\n    }\n    /**\n       * Is Production\n       */\n    isProduction() {\n        return this.env === 'production';\n    }\n    /**\n       * Set Env\n       */\n    setEnv(env) {\n        if (env) {\n            this.env = env;\n            return;\n        }\n        // Local ends with a .dev\n        if (window.location.hostname.match(/.*\\.dev$/)) {\n            this.env = 'local';\n        }\n        else {\n            this.env = 'production';\n        }\n    }\n}\n// Config needs to be a singleton thus the new\nmodule.exports = new Config();\n\n\n//# sourceURL=webpack:///./config.js?");

/***/ }),

/***/ "./modules/common/alerts/components/alerts.jsx":
/*!*****************************************************!*\
  !*** ./modules/common/alerts/components/alerts.jsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/ts-loader/index.js):\\nError: ENOENT: no such file or directory, open '/home/doccer/Projects/boxless/client/modules/common/alerts/components/alerts.jsx'\");\n\n//# sourceURL=webpack:///./modules/common/alerts/components/alerts.jsx?");

/***/ }),

/***/ "./modules/common/alerts/stores/alert_store.js":
/*!*****************************************************!*\
  !*** ./modules/common/alerts/stores/alert_store.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/ts-loader/index.js):\\nError: ENOENT: no such file or directory, open '/home/doccer/Projects/boxless/client/modules/common/alerts/stores/alert_store.js'\");\n\n//# sourceURL=webpack:///./modules/common/alerts/stores/alert_store.js?");

/***/ }),

/***/ "./modules/common/dropdown/components/dropdown.jsx":
/*!*********************************************************!*\
  !*** ./modules/common/dropdown/components/dropdown.jsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\nconst underscore_1 = __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore.js\");\nclass Dropdown extends react_1.default.Component {\n    constructor(props) {\n        super(props);\n        this.id = underscore_1.default.uuid();\n        this.state = {\n            show: false\n        };\n    }\n    handleClick() {\n        this.setState({ show: !this.state.show });\n    }\n    handleClose(e) {\n        // Handle close is not controlled by its own click\n        if (e.target.id === this.id)\n            return;\n        if (this.state.show) {\n            this.setState({ show: false }, () => {\n                if (underscore_1.default.isFunction(this.props.onClose)) {\n                    this.props.onClose();\n                }\n            });\n        }\n    }\n    render() {\n        return (react_1.default.createElement(\"div\", { id: this.props.id, className: this.props.className ? ('dropdown ' + this.props.className) : 'dropdown' },\n            react_1.default.createElement(\"div\", null,\n                react_1.default.createElement(\"a\", { href: 'javascript:void(0)', id: this.id, className: this.props.trigger.className || 'dropdown-toggle', onClick: this.handleClick.bind(this) },\n                    this.props.trigger.label,\n                    \" \",\n                    this.props.caret && react_1.default.createElement(\"span\", { className: 'caret' })),\n                this.state.show &&\n                    react_1.default.createElement(\"ul\", { className: 'dropdown-menu', onClick: this.handleClick.bind(this) }, this.props.links.map((link, i) => {\n                        if (link.text) {\n                            return react_1.default.createElement(\"li\", { key: i, className: 'text' }, link.text);\n                        }\n                        else if (link.divider) {\n                            return react_1.default.createElement(\"li\", { key: i, role: 'separator', className: 'divider' });\n                        }\n                        else if (link.handleClick) {\n                            return react_1.default.createElement(\"li\", { key: i },\n                                react_1.default.createElement(\"a\", { href: 'javascript:void(0)', className: 'link', onClick: link.handleClick }, link.label));\n                        }\n                        return react_1.default.createElement(\"li\", { key: i },\n                            react_1.default.createElement(react_router_dom_1.Link, { to: link.to }, link.label));\n                    })))));\n    }\n}\nexports.default = Dropdown;\n\n\n//# sourceURL=webpack:///./modules/common/dropdown/components/dropdown.jsx?");

/***/ }),

/***/ "./modules/common/modals/components/modals.jsx":
/*!*****************************************************!*\
  !*** ./modules/common/modals/components/modals.jsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nclass Modals extends react_1.default.Component {\n    render() {\n        return (react_1.default.createElement(\"div\", { id: 'modals' }, this.props.modals && this.props.modals.map((modal, key) => react_1.default.cloneElement(modal, { key: key }))));\n    }\n}\nexports.default = Modals;\n\n\n//# sourceURL=webpack:///./modules/common/modals/components/modals.jsx?");

/***/ }),

/***/ "./modules/layouts/components/loading.jsx":
/*!************************************************!*\
  !*** ./modules/layouts/components/loading.jsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst prop_types_1 = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\nclass Loading extends react_1.default.Component {\n    render() {\n        return (react_1.default.createElement(\"div\", { className: 'text-center' },\n            react_1.default.createElement(\"svg\", { width: this.props.size + 'px', height: this.props.size + 'px', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 ' + this.props.size + ' ' + this.props.size, preserveAspectRatio: 'xMidYMid', class: 'uil-ripple' },\n                react_1.default.createElement(\"rect\", { x: '0', y: '0', width: this.props.size, height: this.props.size, fill: 'none', class: 'bk' }),\n                react_1.default.createElement(\"g\", null,\n                    react_1.default.createElement(\"animate\", { attributeName: 'opacity', dur: '2s', repeatCount: 'indefinite', begin: '0s', keyTimes: '0;0.33;1', values: '1;1;0' }),\n                    react_1.default.createElement(\"circle\", { cx: '50', cy: '50', r: '40', stroke: '#5cffd6', fill: 'none', strokeWidth: '8', strokeLinecap: 'round' },\n                        react_1.default.createElement(\"animate\", { attributeName: 'r', dur: '2s', repeatCount: 'indefinite', begin: '0s', keyTimes: '0;0.33;1', values: '0;22;44' }))),\n                react_1.default.createElement(\"g\", null,\n                    react_1.default.createElement(\"animate\", { attributeName: 'opacity', dur: '2s', repeatCount: 'indefinite', begin: '1s', keyTimes: '0;0.33;1', values: '1;1;0' }),\n                    react_1.default.createElement(\"circle\", { cx: '50', cy: '50', r: '40', stroke: '#75bf41', fill: 'none', strokeWidth: '8', strokeLinecap: 'round' },\n                        react_1.default.createElement(\"animate\", { attributeName: 'r', dur: '2s', repeatCount: 'indefinite', begin: '1s', keyTimes: '0;0.33;1', values: '0;22;44' }))))));\n    }\n}\nLoading.propTypes = {\n    size: prop_types_1.default.number\n};\nLoading.defaultProps = {\n    size: 100\n};\nexports.default = Loading;\n\n\n//# sourceURL=webpack:///./modules/layouts/components/loading.jsx?");

/***/ }),

/***/ "./modules/layouts/components/topnav.jsx":
/*!***********************************************!*\
  !*** ./modules/layouts/components/topnav.jsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst underscore_1 = __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore.js\");\nconst user_store_1 = __webpack_require__(/*! ../../routes/users/stores/user_store */ \"./modules/routes/users/stores/user_store.js\");\nconst dropdown_jsx_1 = __webpack_require__(/*! ../../common/dropdown/components/dropdown.jsx */ \"./modules/common/dropdown/components/dropdown.jsx\");\nclass TopNav extends react_1.default.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            current: user_store_1.default.current\n        };\n        user_store_1.default.on('saveToken.success', this.handleCurrentChange.bind(this));\n        user_store_1.default.on('signOut', this.handleCurrentChange.bind(this));\n        user_store_1.default.on('update.success', this.handleCurrentChange.bind(this));\n        user_store_1.default.on('reset.success', this.handleCurrentChange.bind(this));\n    }\n    /**\n       * Handle Current Change\n       */\n    handleCurrentChange() {\n        this.setState({ current: user_store_1.default.current });\n        if (user_store_1.default.current.id) {\n            window.location = '#/home/index';\n        }\n        else {\n            window.location = '#/';\n        }\n    }\n    /**\n       * Handle Sign Out\n       */\n    handleSignOut(e) {\n        user_store_1.default.signOut();\n    }\n    render() {\n        return (react_1.default.createElement(\"nav\", { className: 'navbar navbar-default navbar-static-top top-shade' },\n            react_1.default.createElement(\"div\", { className: 'container' },\n                react_1.default.createElement(\"div\", { className: 'navbar-header' },\n                    react_1.default.createElement(\"a\", { className: 'navbar-brand', href: '#' },\n                        react_1.default.createElement(\"img\", { src: '/assets/images/logo.png' }))),\n                !this.state.current.id &&\n                    react_1.default.createElement(\"div\", { className: 'container' },\n                        react_1.default.createElement(\"ul\", { className: 'nav navbar-nav' },\n                            react_1.default.createElement(\"li\", null,\n                                react_1.default.createElement(\"button\", { className: 'btn btn-default', onClick: () => underscore_1.default.route('users/signin') }, \"Sign In\"),\n                                react_1.default.createElement(\"button\", { className: 'btn btn-primary margin-left-sm', onClick: () => underscore_1.default.route('users/signup') }, \"Sign Up\")))),\n                this.state.current.id &&\n                    react_1.default.createElement(\"div\", { className: 'container' },\n                        react_1.default.createElement(\"ul\", { className: 'nav navbar-nav main-menu' },\n                            react_1.default.createElement(\"li\", null,\n                                react_1.default.createElement(dropdown_jsx_1.default, { trigger: { label: this.state.current.firstName }, links: [\n                                        { label: 'Home', to: '/home/index' },\n                                        { label: 'Account', to: '/users/account' },\n                                        { divider: true },\n                                        { label: 'Sign Out', handleClick: this.handleSignOut.bind(this) }\n                                    ], caret: true })))))));\n    }\n}\nexports.default = TopNav;\n\n\n//# sourceURL=webpack:///./modules/layouts/components/topnav.jsx?");

/***/ }),

/***/ "./modules/layouts/controllers/notfound_controller.jsx":
/*!*************************************************************!*\
  !*** ./modules/layouts/controllers/notfound_controller.jsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst underscore_1 = __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore.js\");\nclass NotFound extends react_1.default.Component {\n    render() {\n        return (react_1.default.createElement(\"div\", { className: '' },\n            react_1.default.createElement(\"h1\", { className: '' }, \"What!!?? Inconceivable.\"),\n            react_1.default.createElement(\"h3\", null, \"Something wrong has happend. Sorry mate! Try the following:\"),\n            react_1.default.createElement(\"p\", null,\n                react_1.default.createElement(\"button\", { type: 'button', className: 'btn btn-primary', onClick: () => underscore_1.default.route('home/index') }, \"Go to Home Page\"),\n                react_1.default.createElement(\"button\", { type: 'button', className: 'btn btn-default margin-left-sm', onClick: () => underscore_1.default.route('help/contact') }, \"Get Help\"))));\n    }\n}\nexports.default = NotFound;\n\n\n//# sourceURL=webpack:///./modules/layouts/controllers/notfound_controller.jsx?");

/***/ }),

/***/ "./modules/lib/form.ts":
/*!*****************************!*\
  !*** ./modules/lib/form.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Form {\n    /**\n    * Handle Change\n    * this is object's this\n    */\n    static handleChange(component, field, e, callback) {\n        // Fast shallow copy\n        var form = Object.assign({}, component.state.form);\n        if (typeof e !== \"string\") {\n            form[field] = e.target.value;\n            if (e.target.type === 'checkbox') {\n                form[field] = e.target.checked;\n            }\n        }\n        else {\n            form[field] = e;\n        }\n        component.setState({ form: form }, callback || (() => { }));\n    }\n}\nexports.default = Form;\n\n\n//# sourceURL=webpack:///./modules/lib/form.ts?");

/***/ }),

/***/ "./modules/lib/lang.ts":
/*!*****************************!*\
  !*** ./modules/lib/lang.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst en_1 = __webpack_require__(/*! ./langs/en */ \"./modules/lib/langs/en.ts\");\nexports.default = (words) => {\n    return en_1.default[words] || words;\n};\n\n\n//# sourceURL=webpack:///./modules/lib/lang.ts?");

/***/ }),

/***/ "./modules/lib/langs/en.ts":
/*!*********************************!*\
  !*** ./modules/lib/langs/en.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = {\n    password_length: 'Password length is too short.',\n    unauthorized: 'Sorry, your session has ended. Please sign in again.',\n    unknown_error: 'Sorry, we encountered an Unknown Error.',\n    email_or_password_wrong: 'That email was not found or that password was wrong.',\n    reset_email_sent: 'An email was sent to you including a link to reset your password.',\n    emailed_password_reset: 'Your password has been successfully reset.',\n    password_reset: 'Password successfully reset. You are current now signed in.',\n    reset_password_wrong: 'Reset password token is invalid. Please start password reset proccess over.',\n    contact_message_sent: 'Message sent. You will hear from us shortly.',\n    all_fields_required: 'All fields are required.'\n};\n\n\n//# sourceURL=webpack:///./modules/lib/langs/en.ts?");

/***/ }),

/***/ "./modules/lib/mixins.ts":
/*!*******************************!*\
  !*** ./modules/lib/mixins.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore.js\");\n_.mixin({\n    // Make routing available every where\n    route(url, options = {}) {\n        // JS routes look like: users/somthing\n        // Server routes look like /users\n        // External routes look like http://some.where\n        // If the url does begin with a / or have a . add the #/\n        if (url[0] !== '/' && url.indexOf('.') === -1) {\n            url = '#/' + url;\n        }\n        // We have an external site, add target: _blank\n        if (url.indexOf('.') > -1 && (options === null || options === void 0 ? void 0 : options._blank) !== false) {\n            window.open(url, '_blank').focus();\n            // Internal js or server route\n        }\n        else\n            window.location.href = url;\n    },\n    getRoute() {\n        var route = window.location.hash.replace('#/', '').replace(/\\/?\\?.*$/, '');\n        return route || 'home/index';\n    },\n    // True deep native copy.\n    // Neither Object.create(obj), _.clone and _.extend are deep copies\n    copy(obj) {\n        return JSON.parse(JSON.stringify(obj));\n    },\n    // True deep native equals.\n    // Neither Object.is(obj) are good comparitors\n    equals(obj1, obj2) {\n        return JSON.stringify(obj1) === JSON.stringify(obj2);\n    },\n    capitalize(str) {\n        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();\n    },\n    uuid() {\n        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\n            var r = Math.random() * 16 | 0;\n            var v = c === 'x' ? r : (r & 0x3 | 0x8);\n            return v.toString(16);\n        });\n    },\n    base64Decode(str, callback) {\n        var output = str.replace('-', '+').replace('_', '/');\n        switch (output.length % 4) {\n            case 0:\n                break;\n            case 2:\n                output += '==';\n                break;\n            case 3:\n                output += '=';\n                break;\n            default:\n                if (_.isFunction(callback)) {\n                    return callback();\n                }\n        }\n        return window.atob(output);\n    },\n    // https://github.com/Battlefy/simple-slug\n    slug(str) {\n        return str\n            .replace(/\\s/g, '-')\n            .replace(/[^a-zA-Z0-9 -]+/g, '')\n            .replace(/^-+|-+$/g, '')\n            .replace(/-+/g, '-')\n            .toLowerCase();\n    }\n});\nexports.default = _;\n\n\n//# sourceURL=webpack:///./modules/lib/mixins.ts?");

/***/ }),

/***/ "./modules/routes/home/controllers/index_controller.jsx":
/*!**************************************************************!*\
  !*** ./modules/routes/home/controllers/index_controller.jsx ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst supercapacitor_1 = __webpack_require__(/*! supercapacitor */ \"./node_modules/supercapacitor/dist/supercapacitor.js\");\nconst user_store_1 = __webpack_require__(/*! ../../users/stores/user_store */ \"./modules/routes/users/stores/user_store.js\");\nconst home_store_1 = __webpack_require__(/*! ../../home/stores/home_store */ \"./modules/routes/home/stores/home_store.js\");\nclass Index extends supercapacitor_1.Component {\n    constructor(props) {\n        super(props);\n        user_store_1.default.is('user', true);\n        this.connect(home_store_1.default, 'getMe.success', this.onGetMeSuccess.bind(this));\n    }\n    componentDidMount() {\n        super.componentDidMount();\n        home_store_1.default.getMe();\n    }\n    onGetMeSuccess(data) {\n        debugger;\n        this.setState(data);\n    }\n    render() {\n        var _a;\n        var homeState = home_store_1.default.getState();\n        console.log(homeState);\n        return (react_1.default.createElement(\"div\", { className: 'container' },\n            react_1.default.createElement(\"div\", { className: 'page-header' },\n                react_1.default.createElement(\"h1\", null,\n                    \"Welcome Home \", (_a = homeState.me) === null || _a === void 0 ? void 0 :\n                    _a.firstName))));\n    }\n}\nexports.default = Index;\n\n\n//# sourceURL=webpack:///./modules/routes/home/controllers/index_controller.jsx?");

/***/ }),

/***/ "./modules/routes/home/routes.jsx":
/*!****************************************!*\
  !*** ./modules/routes/home/routes.jsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\nconst index_controller_jsx_1 = __webpack_require__(/*! ./controllers/index_controller.jsx */ \"./modules/routes/home/controllers/index_controller.jsx\");\nexports.default = () => {\n    return (react_1.default.createElement(react_router_dom_1.Switch, null,\n        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: '/home/index', component: index_controller_jsx_1.default })));\n};\n\n\n//# sourceURL=webpack:///./modules/routes/home/routes.jsx?");

/***/ }),

/***/ "./modules/routes/home/stores/home_store.js":
/*!**************************************************!*\
  !*** ./modules/routes/home/stores/home_store.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst supercapacitor_1 = __webpack_require__(/*! supercapacitor */ \"./node_modules/supercapacitor/dist/supercapacitor.js\");\nclass HomeStore extends supercapacitor_1.Store {\n    constructor() {\n        super('home.stores.home');\n    }\n    /**\n      * GetMe\n      */\n    getMe() {\n        this.post(`/query`, {\n            queries: [{\n                    name: 'me.select',\n                    properties: {\n                        select: ['id', 'firstName', 'lastName']\n                    }\n                }]\n        })\n            .then((res) => {\n            this.setState({ me: res.data.queries[0].results[0] });\n            this.emit('getMe.success');\n        });\n    }\n}\nexports.default = new HomeStore();\n\n\n//# sourceURL=webpack:///./modules/routes/home/stores/home_store.js?");

/***/ }),

/***/ "./modules/routes/users/controllers/account_controller.jsx":
/*!*****************************************************************!*\
  !*** ./modules/routes/users/controllers/account_controller.jsx ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst supercapacitor_1 = __webpack_require__(/*! supercapacitor */ \"./node_modules/supercapacitor/dist/supercapacitor.js\");\nconst user_store_1 = __webpack_require__(/*! ../stores/user_store */ \"./modules/routes/users/stores/user_store.js\");\nconst form_1 = __webpack_require__(/*! ../../../lib/form */ \"./modules/lib/form.ts\");\nclass Account extends supercapacitor_1.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            form: {\n                firstName: user_store_1.default.current.firstName,\n                lastName: user_store_1.default.current.lastName,\n                email: user_store_1.default.current.email,\n                password: user_store_1.default.current.password\n            }\n        };\n    }\n    /**\n      * Handle Sign Up\n      */\n    handleSubmit(e) {\n        e.preventDefault();\n        user_store_1.default.update(this.state.form);\n    }\n    render() {\n        return (react_1.default.createElement(\"div\", { className: 'container' },\n            react_1.default.createElement(\"div\", { className: 'page-header' },\n                react_1.default.createElement(\"h1\", null, \"Account\")),\n            react_1.default.createElement(\"form\", { className: 'margin-bottom-lg' },\n                react_1.default.createElement(\"legend\", null, \"Name\"),\n                react_1.default.createElement(\"div\", { className: 'row' },\n                    react_1.default.createElement(\"div\", { className: 'col-lg-6 margin-bottom-md' },\n                        react_1.default.createElement(\"label\", { htmlFor: 'firstName' }, \"First Name\"),\n                        react_1.default.createElement(\"input\", { type: 'text', value: this.state.form.firstName, className: 'form-control', onChange: form_1.default.handleChange(this, 'firstName') })),\n                    react_1.default.createElement(\"div\", { className: 'col-lg-6 margin-bottom-md' },\n                        react_1.default.createElement(\"label\", { htmlFor: 'lastName' }, \"Last Name\"),\n                        react_1.default.createElement(\"input\", { type: 'text', value: this.state.form.lastName, className: 'form-control', onChange: form_1.default.handleChange(this, 'lastName') }))),\n                react_1.default.createElement(\"legend\", null, \"Security\"),\n                react_1.default.createElement(\"div\", { className: 'row' },\n                    react_1.default.createElement(\"div\", { className: 'col-lg-6 margin-bottom-md' },\n                        react_1.default.createElement(\"label\", { htmlFor: 'email' }, \"Email Address\"),\n                        react_1.default.createElement(\"input\", { type: 'text', value: this.state.form.email, className: 'form-control', onChange: form_1.default.handleChange(this, 'email') })),\n                    react_1.default.createElement(\"div\", { className: 'col-lg-6 margin-bottom-md' },\n                        react_1.default.createElement(\"label\", { htmlFor: 'password' }, \"Password\"),\n                        react_1.default.createElement(\"input\", { type: 'password', className: 'form-control', placeholder: 'Leave blank to keep current password', onChange: form_1.default.handleChange(this, 'password') }))),\n                react_1.default.createElement(\"div\", { className: 'row' },\n                    react_1.default.createElement(\"div\", { className: 'col-lg-12 margin-top-md' },\n                        react_1.default.createElement(\"button\", { type: 'submit', className: 'btn btn-primary', onClick: this.handleSubmit.bind(this) }, \"GO\"))))));\n    }\n}\nexports.default = Account;\n\n\n//# sourceURL=webpack:///./modules/routes/users/controllers/account_controller.jsx?");

/***/ }),

/***/ "./modules/routes/users/controllers/forgot_controller.jsx":
/*!****************************************************************!*\
  !*** ./modules/routes/users/controllers/forgot_controller.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst supercapacitor_1 = __webpack_require__(/*! supercapacitor */ \"./node_modules/supercapacitor/dist/supercapacitor.js\");\nconst user_store_1 = __webpack_require__(/*! ../stores/user_store */ \"./modules/routes/users/stores/user_store.js\");\nconst alert_store_js_1 = __webpack_require__(/*! ../../../common/alerts/stores/alert_store.js */ \"./modules/common/alerts/stores/alert_store.js\");\nconst form_1 = __webpack_require__(/*! ../../../lib/form */ \"./modules/lib/form.ts\");\nconst lang_1 = __webpack_require__(/*! ../../../lib/lang */ \"./modules/lib/lang.ts\");\nclass Forgot extends supercapacitor_1.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            form: {\n                email: '',\n                alerts: []\n            }\n        };\n        this.connect(user_store_1.default, 'forgot.success', this.onForgotSuccess.bind(this));\n    }\n    onForgotSuccess() {\n        alert_store_js_1.default.add({ type: 'success', message: lang_1.default('reset_email_sent') });\n    }\n    /**\n      * Handle Sign Up\n      */\n    handleSubmit(e) {\n        e.preventDefault();\n        user_store_1.default.forgot(this.state.form);\n    }\n    render() {\n        return (react_1.default.createElement(\"div\", { className: 'col-md-8 col-md-offset-2 ' },\n            react_1.default.createElement(\"form\", null,\n                react_1.default.createElement(\"div\", { className: 'panel panel-default margin-top-xlg' },\n                    react_1.default.createElement(\"div\", { className: 'panel-heading' }, \"Forgot Password\"),\n                    react_1.default.createElement(\"div\", { className: 'panel-body' },\n                        react_1.default.createElement(\"div\", { className: 'form-group' },\n                            react_1.default.createElement(\"label\", { htmlFor: 'email' }, \"Email Address\"),\n                            react_1.default.createElement(\"input\", { type: 'text', className: 'form-control', onChange: form_1.default.handleChange(this, 'email') })),\n                        react_1.default.createElement(\"button\", { onClick: this.handleSubmit.bind(this), className: 'btn btn-primary' }, \"GO\"))))));\n    }\n}\nexports.default = Forgot;\n\n\n//# sourceURL=webpack:///./modules/routes/users/controllers/forgot_controller.jsx?");

/***/ }),

/***/ "./modules/routes/users/controllers/reset_controller.jsx":
/*!***************************************************************!*\
  !*** ./modules/routes/users/controllers/reset_controller.jsx ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst supercapacitor_1 = __webpack_require__(/*! supercapacitor */ \"./node_modules/supercapacitor/dist/supercapacitor.js\");\nconst user_store_1 = __webpack_require__(/*! ../stores/user_store */ \"./modules/routes/users/stores/user_store.js\");\nconst form_1 = __webpack_require__(/*! ../../../lib/form */ \"./modules/lib/form.ts\");\nclass Reset extends supercapacitor_1.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            form: {\n                _id: props.match.params._id,\n                reset_password: props.match.params.reset_password,\n                password: ''\n            }\n        };\n    }\n    /**\n      * Handle Sign Up\n      */\n    handleSubmit(e) {\n        e.preventDefault();\n        user_store_1.default.reset(this.state.form);\n    }\n    render() {\n        return (react_1.default.createElement(\"div\", { className: 'col-md-8 col-md-offset-2' },\n            react_1.default.createElement(\"form\", null,\n                react_1.default.createElement(\"div\", { className: 'panel panel-default margin-top-xlg' },\n                    react_1.default.createElement(\"div\", { className: 'panel-heading' }, \"Reset Password\"),\n                    react_1.default.createElement(\"div\", { className: 'panel-body' },\n                        react_1.default.createElement(\"div\", { className: 'form-group' },\n                            react_1.default.createElement(\"label\", { htmlFor: 'password' }, \"New Password\"),\n                            react_1.default.createElement(\"input\", { type: 'password', className: 'form-control', onChange: form_1.default.handleChange(this, 'password') })),\n                        react_1.default.createElement(\"button\", { onClick: this.handleSubmit.bind(this), className: 'btn btn-primary' }, \"GO\"))))));\n    }\n}\nexports.default = Reset;\n\n\n//# sourceURL=webpack:///./modules/routes/users/controllers/reset_controller.jsx?");

/***/ }),

/***/ "./modules/routes/users/controllers/signin_controller.jsx":
/*!****************************************************************!*\
  !*** ./modules/routes/users/controllers/signin_controller.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst underscore_1 = __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore.js\");\nconst supercapacitor_1 = __webpack_require__(/*! supercapacitor */ \"./node_modules/supercapacitor/dist/supercapacitor.js\");\nconst loading_jsx_1 = __webpack_require__(/*! ../../../layouts/components/loading.jsx */ \"./modules/layouts/components/loading.jsx\");\nconst user_store_1 = __webpack_require__(/*! ../stores/user_store */ \"./modules/routes/users/stores/user_store.js\");\nconst form_1 = __webpack_require__(/*! ../../../lib/form */ \"./modules/lib/form.ts\");\nclass SignIn extends supercapacitor_1.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            form: {\n                email: '',\n                password: ''\n            }\n        };\n        // Force signed in user to contests list\n        if (user_store_1.default.current.id) {\n            underscore_1.default.route('home/index');\n        }\n    }\n    /**\n      * Handle Sign Up\n      */\n    handleSubmit(e) {\n        e.preventDefault();\n        user_store_1.default.signIn(this.state.form);\n    }\n    render() {\n        // Do not render if token\n        if (this.props.match.params && this.props.match.params.token) {\n            return (react_1.default.createElement(loading_jsx_1.default, null));\n        }\n        return (react_1.default.createElement(\"div\", { className: 'col-md-8 col-md-offset-2' },\n            react_1.default.createElement(\"form\", null,\n                react_1.default.createElement(\"div\", { className: 'panel panel-default margin-top-xlg' },\n                    react_1.default.createElement(\"div\", { className: 'panel-heading' }, \"Sign In\"),\n                    react_1.default.createElement(\"div\", { className: 'panel-body' },\n                        react_1.default.createElement(\"div\", { className: 'form-group' },\n                            react_1.default.createElement(\"label\", { htmlFor: 'email' }, \"Email Address\"),\n                            react_1.default.createElement(\"input\", { type: 'text', className: 'form-control', onBlur: form_1.default.handleChange(this, 'email'), onChange: form_1.default.handleChange(this, 'email') })),\n                        react_1.default.createElement(\"div\", { className: 'form-group' },\n                            react_1.default.createElement(\"label\", { htmlFor: 'password' }, \"Password\"),\n                            react_1.default.createElement(\"input\", { type: 'password', className: 'form-control', onBlur: form_1.default.handleChange(this, 'password'), onChange: form_1.default.handleChange(this, 'password') })),\n                        react_1.default.createElement(\"button\", { onClick: this.handleSubmit.bind(this), className: 'btn btn-primary' }, \"Sign In\"),\n                        \" \",\n                        react_1.default.createElement(\"a\", { className: 'margin-left-sm', href: '/#/users/forgot' }, \" Forgot Password?\"))),\n                react_1.default.createElement(\"div\", { className: 'text-center' },\n                    react_1.default.createElement(\"a\", { href: '/#/users/signup' }, \"Need an Account? Sign Up\")))));\n    }\n}\nexports.default = SignIn;\n\n\n//# sourceURL=webpack:///./modules/routes/users/controllers/signin_controller.jsx?");

/***/ }),

/***/ "./modules/routes/users/controllers/signup_controller.jsx":
/*!****************************************************************!*\
  !*** ./modules/routes/users/controllers/signup_controller.jsx ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst supercapacitor_1 = __webpack_require__(/*! supercapacitor */ \"./node_modules/supercapacitor/dist/supercapacitor.js\");\nconst user_store_1 = __webpack_require__(/*! ../stores/user_store */ \"./modules/routes/users/stores/user_store.js\");\nconst form_1 = __webpack_require__(/*! ../../../lib/form */ \"./modules/lib/form.ts\");\nclass SignUp extends supercapacitor_1.Component {\n    constructor(props) {\n        super(props);\n        this.state = {\n            form: {\n                firstName: '',\n                lastName: '',\n                email: '',\n                password: ''\n            }\n        };\n    }\n    /**\n      * Handle Sign Up\n      */\n    handleSubmit(e) {\n        e.preventDefault();\n        user_store_1.default.signUp(this.state.form);\n    }\n    render() {\n        // Do not render if token\n        if (this.props.match.params && this.props.match.params.token) {\n            return (react_1.default.createElement(\"p\", null));\n        }\n        return (react_1.default.createElement(\"div\", { className: 'col-md-8 col-md-offset-2' },\n            react_1.default.createElement(\"form\", null,\n                react_1.default.createElement(\"div\", { className: 'panel panel-default margin-top-xlg' },\n                    react_1.default.createElement(\"div\", { className: 'panel-heading' }, \"Sign Up\"),\n                    react_1.default.createElement(\"div\", { className: 'panel-body' },\n                        react_1.default.createElement(\"div\", { className: 'col-md-6 form-group' },\n                            react_1.default.createElement(\"label\", { htmlFor: 'firstName' }, \"First Name\"),\n                            react_1.default.createElement(\"input\", { type: 'text', className: 'form-control', value: this.state.form.firstName, onChange: form_1.default.handleChange(this, 'firstName') })),\n                        react_1.default.createElement(\"div\", { className: 'col-md-6 form-group' },\n                            react_1.default.createElement(\"label\", { htmlFor: 'lastName' }, \"Last Name\"),\n                            react_1.default.createElement(\"input\", { type: 'text', className: 'form-control', value: this.state.form.lastName, onChange: form_1.default.handleChange(this, 'lastName') })),\n                        react_1.default.createElement(\"div\", { className: 'col-md-6 form-group' },\n                            react_1.default.createElement(\"label\", { htmlFor: 'email' }, \"Email Address\"),\n                            react_1.default.createElement(\"input\", { type: 'text', className: 'form-control', value: this.state.form.email, onChange: form_1.default.handleChange(this, 'email') })),\n                        react_1.default.createElement(\"div\", { className: 'col-md-6 form-group' },\n                            react_1.default.createElement(\"label\", { htmlFor: 'password' }, \"Password\"),\n                            react_1.default.createElement(\"input\", { type: 'password', className: 'form-control', value: this.state.form.password, onChange: form_1.default.handleChange(this, 'password') })),\n                        react_1.default.createElement(\"div\", { className: 'col-md-6 form-group' },\n                            react_1.default.createElement(\"button\", { onClick: this.handleSubmit.bind(this), className: 'btn btn-primary' }, \"Sign Up\")))),\n                react_1.default.createElement(\"div\", { className: 'text-center' },\n                    react_1.default.createElement(\"a\", { href: '/#/users/signin' }, \"Already have an Account? Sign In\")))));\n    }\n}\nexports.default = SignUp;\n\n\n//# sourceURL=webpack:///./modules/routes/users/controllers/signup_controller.jsx?");

/***/ }),

/***/ "./modules/routes/users/routes.jsx":
/*!*****************************************!*\
  !*** ./modules/routes/users/routes.jsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst react_1 = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\nconst account_controller_jsx_1 = __webpack_require__(/*! ./controllers/account_controller.jsx */ \"./modules/routes/users/controllers/account_controller.jsx\");\nconst signup_controller_jsx_1 = __webpack_require__(/*! ./controllers/signup_controller.jsx */ \"./modules/routes/users/controllers/signup_controller.jsx\");\nconst signin_controller_jsx_1 = __webpack_require__(/*! ./controllers/signin_controller.jsx */ \"./modules/routes/users/controllers/signin_controller.jsx\");\nconst forgot_controller_jsx_1 = __webpack_require__(/*! ./controllers/forgot_controller.jsx */ \"./modules/routes/users/controllers/forgot_controller.jsx\");\nconst reset_controller_jsx_1 = __webpack_require__(/*! ./controllers/reset_controller.jsx */ \"./modules/routes/users/controllers/reset_controller.jsx\");\nexports.default = () => {\n    return (react_1.default.createElement(react_router_dom_1.Switch, null,\n        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: '/users/account', component: account_controller_jsx_1.default }),\n        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: '/users/signup', component: signup_controller_jsx_1.default }),\n        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: '/users/signin', component: signin_controller_jsx_1.default }),\n        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: '/users/forgot', component: forgot_controller_jsx_1.default }),\n        react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: '/users/reset/:_id/:reset_password', component: reset_controller_jsx_1.default })));\n};\n\n\n//# sourceURL=webpack:///./modules/routes/users/routes.jsx?");

/***/ }),

/***/ "./modules/routes/users/stores/user_store.js":
/*!***************************************************!*\
  !*** ./modules/routes/users/stores/user_store.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst supercapacitor_1 = __webpack_require__(/*! supercapacitor */ \"./node_modules/supercapacitor/dist/supercapacitor.js\");\nconst underscore_1 = __webpack_require__(/*! underscore */ \"./node_modules/underscore/underscore.js\");\nclass UserStore extends supercapacitor_1.Store {\n    constructor() {\n        super('users.stores.user');\n        this.current = this.getCurrent();\n    }\n    /**\n     * Get Subdomain\n     */\n    getSubdomain(hostname) {\n        return hostname.split('.')[0];\n    }\n    /**\n     * Get Token\n     */\n    getCurrent() {\n        var token = localStorage.getItem('token');\n        try {\n            if (token) {\n                return JSON.parse(underscore_1.default.base64Decode(token.split('.')[1]));\n            }\n            return {};\n        }\n        catch (err) {\n            localStorage.removeItem('token');\n        }\n    }\n    /**\n     * Is\n     */\n    is(access, redirect) {\n        access = access || 'user';\n        if (!this.current.access || (underscore_1.default.isArray(this.current.access) && this.current.access.indexOf(access) === -1)) {\n            if (redirect) {\n                this.signOut();\n            }\n            return false;\n        }\n        return true;\n    }\n    /**\n      * Update\n      */\n    update(options) {\n        this.put('/users', options)\n            .then((res) => {\n            localStorage.setItem('token', res.data.token);\n            this.current = this.getCurrent();\n            this.emit('update.success');\n        })\n            .catch(this.emitRequestError.bind(this));\n    }\n    /**\n     * Save Token\n     */\n    saveToken(token) {\n        localStorage.setItem('token', token);\n        this.current = this.getCurrent();\n        this.emit('saveToken.success');\n    }\n    /**\n     * Sign Up\n     */\n    signUp(options) {\n        this.post('/users/signup', options)\n            .then((res) => {\n            this.saveToken(res.data.token);\n        })\n            .catch(this.emitRequestError.bind(this));\n    }\n    /**\n     * Sign Out\n     */\n    signOut(redirect) {\n        localStorage.removeItem('token');\n        this.current = {};\n        this.emit('signOut', redirect);\n    }\n    /**\n     * Sign In\n     */\n    signIn(options) {\n        this.put('/users/signin', options)\n            .then((res) => {\n            this.saveToken(res.data.token);\n        })\n            .catch(this.emitRequestError.bind(this));\n    }\n    /**\n     * Forgot\n     */\n    forgot(options) {\n        this.request('put', '/users/forgot', 'forgot.success', options);\n    }\n    /**\n     * Reset\n     */\n    reset(options) {\n        this.put('/users/reset', options)\n            .then((res) => {\n            localStorage.setItem('token', res.data.token);\n            this.current = this.getCurrent();\n            this.emit('reset.success');\n        })\n            .catch(this.emitRequestError.bind(this));\n    }\n}\nexports.default = new UserStore();\n\n\n//# sourceURL=webpack:///./modules/routes/users/stores/user_store.js?");

/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************************************************!*\
  !*** delegated ./node_modules/prop-types/index.js from dll-reference vendor ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(0);\n\n//# sourceURL=webpack:///delegated_./node_modules/prop-types/index.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/react-dom/index.js":
/*!*****************************************************************************!*\
  !*** delegated ./node_modules/react-dom/index.js from dll-reference vendor ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(43);\n\n//# sourceURL=webpack:///delegated_./node_modules/react-dom/index.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/react-router-dom/es/index.js":
/*!***************************************************************************************!*\
  !*** delegated ./node_modules/react-router-dom/es/index.js from dll-reference vendor ***!
  \***************************************************************************************/
/*! exports provided: BrowserRouter, HashRouter, Link, MemoryRouter, NavLink, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, withRouter */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(47);\n\n//# sourceURL=webpack:///delegated_./node_modules/react-router-dom/es/index.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference vendor ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(1);\n\n//# sourceURL=webpack:///delegated_./node_modules/react/index.js_from_dll-reference_vendor?");

/***/ }),

/***/ "./node_modules/supercapacitor/dist/supercapacitor.js":
/*!************************************************************!*\
  !*** ./node_modules/supercapacitor/dist/supercapacitor.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ \"./node_modules/react/index.js\")):undefined}(window,(function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&\"object\"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,\"default\",{enumerable:!0,value:e}),2&t&&\"string\"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,\"a\",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p=\"\",n(n.s=30)}([function(e,t,n){\"use strict\";var r=n(2),o=n(14),i=Object.prototype.toString;function a(e){return\"[object Array]\"===i.call(e)}function u(e){return null!==e&&\"object\"==typeof e}function s(e){return\"[object Function]\"===i.call(e)}function c(e,t){if(null!=e)if(\"object\"!=typeof e&&(e=[e]),a(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:a,isArrayBuffer:function(e){return\"[object ArrayBuffer]\"===i.call(e)},isBuffer:o,isFormData:function(e){return\"undefined\"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return\"undefined\"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return\"string\"==typeof e},isNumber:function(e){return\"number\"==typeof e},isObject:u,isUndefined:function(e){return void 0===e},isDate:function(e){return\"[object Date]\"===i.call(e)},isFile:function(e){return\"[object File]\"===i.call(e)},isBlob:function(e){return\"[object Blob]\"===i.call(e)},isFunction:s,isStream:function(e){return u(e)&&s(e.pipe)},isURLSearchParams:function(e){return\"undefined\"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return(\"undefined\"==typeof navigator||\"ReactNative\"!==navigator.product&&\"NativeScript\"!==navigator.product&&\"NS\"!==navigator.product)&&(\"undefined\"!=typeof window&&\"undefined\"!=typeof document)},forEach:c,merge:function e(){var t={};function n(n,r){\"object\"==typeof t[r]&&\"object\"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},deepMerge:function e(){var t={};function n(n,r){\"object\"==typeof t[r]&&\"object\"==typeof n?t[r]=e(t[r],n):t[r]=\"object\"==typeof n?e({},n):n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},extend:function(e,t,n){return c(t,(function(t,o){e[o]=n&&\"function\"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\\s*/,\"\").replace(/\\s*$/,\"\")}}},function(e,t){e.exports.each=function(e,t){Object.keys(e).forEach((function(n){t(e[n],n,e)}))}},function(e,t,n){\"use strict\";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){\"use strict\";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,\"@\").replace(/%3A/gi,\":\").replace(/%24/g,\"$\").replace(/%2C/gi,\",\").replace(/%20/g,\"+\").replace(/%5B/gi,\"[\").replace(/%5D/gi,\"]\")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var a=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+=\"[]\":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+\"=\"+o(e))})))})),i=a.join(\"&\")}if(i){var u=e.indexOf(\"#\");-1!==u&&(e=e.slice(0,u)),e+=(-1===e.indexOf(\"?\")?\"?\":\"&\")+i}return e}},function(e,t,n){\"use strict\";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){\"use strict\";(function(t){var r=n(0),o=n(20),i={\"Content-Type\":\"application/x-www-form-urlencoded\"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e[\"Content-Type\"])&&(e[\"Content-Type\"]=t)}var u,s={adapter:(void 0!==t&&\"[object process]\"===Object.prototype.toString.call(t)?u=n(6):\"undefined\"!=typeof XMLHttpRequest&&(u=n(6)),u),transformRequest:[function(e,t){return o(t,\"Accept\"),o(t,\"Content-Type\"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,\"application/x-www-form-urlencoded;charset=utf-8\"),e.toString()):r.isObject(e)?(a(t,\"application/json;charset=utf-8\"),JSON.stringify(e)):e}],transformResponse:[function(e){if(\"string\"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:\"XSRF-TOKEN\",xsrfHeaderName:\"X-XSRF-TOKEN\",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};s.headers={common:{Accept:\"application/json, text/plain, */*\"}},r.forEach([\"delete\",\"get\",\"head\"],(function(e){s.headers[e]={}})),r.forEach([\"post\",\"put\",\"patch\"],(function(e){s.headers[e]=r.merge(i)})),e.exports=s}).call(this,n(19))},function(e,t,n){\"use strict\";var r=n(0),o=n(21),i=n(3),a=n(23),u=n(24),s=n(7);e.exports=function(e){return new Promise((function(t,c){var f=e.data,l=e.headers;r.isFormData(f)&&delete l[\"Content-Type\"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||\"\",d=e.auth.password||\"\";l.Authorization=\"Basic \"+btoa(h+\":\"+d)}if(p.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf(\"file:\"))){var n=\"getAllResponseHeaders\"in p?a(p.getAllResponseHeaders()):null,r={data:e.responseType&&\"text\"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:n,config:e,request:p};o(t,c,r),p=null}},p.onabort=function(){p&&(c(s(\"Request aborted\",e,\"ECONNABORTED\",p)),p=null)},p.onerror=function(){c(s(\"Network Error\",e,null,p)),p=null},p.ontimeout=function(){c(s(\"timeout of \"+e.timeout+\"ms exceeded\",e,\"ECONNABORTED\",p)),p=null},r.isStandardBrowserEnv()){var m=n(25),y=(e.withCredentials||u(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0;y&&(l[e.xsrfHeaderName]=y)}if(\"setRequestHeader\"in p&&r.forEach(l,(function(e,t){void 0===f&&\"content-type\"===t.toLowerCase()?delete l[t]:p.setRequestHeader(t,e)})),e.withCredentials&&(p.withCredentials=!0),e.responseType)try{p.responseType=e.responseType}catch(t){if(\"json\"!==e.responseType)throw t}\"function\"==typeof e.onDownloadProgress&&p.addEventListener(\"progress\",e.onDownloadProgress),\"function\"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener(\"progress\",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),c(e),p=null)})),void 0===f&&(f=null),p.send(f)}))}},function(e,t,n){\"use strict\";var r=n(22);e.exports=function(e,t,n,o,i){var a=new Error(e);return r(a,t,n,o,i)}},function(e,t,n){\"use strict\";var r=n(0);e.exports=function(e,t){t=t||{};var n={};return r.forEach([\"url\",\"method\",\"params\",\"data\"],(function(e){void 0!==t[e]&&(n[e]=t[e])})),r.forEach([\"headers\",\"auth\",\"proxy\"],(function(o){r.isObject(t[o])?n[o]=r.deepMerge(e[o],t[o]):void 0!==t[o]?n[o]=t[o]:r.isObject(e[o])?n[o]=r.deepMerge(e[o]):void 0!==e[o]&&(n[o]=e[o])})),r.forEach([\"baseURL\",\"transformRequest\",\"transformResponse\",\"paramsSerializer\",\"timeout\",\"withCredentials\",\"adapter\",\"responseType\",\"xsrfCookieName\",\"xsrfHeaderName\",\"onUploadProgress\",\"onDownloadProgress\",\"maxContentLength\",\"validateStatus\",\"maxRedirects\",\"httpAgent\",\"httpsAgent\",\"cancelToken\",\"socketPath\"],(function(r){void 0!==t[r]?n[r]=t[r]:void 0!==e[r]&&(n[r]=e[r])})),n}},function(e,t,n){\"use strict\";function r(e){this.message=e}r.prototype.toString=function(){return\"Cancel\"+(this.message?\": \"+this.message:\"\")},r.prototype.__CANCEL__=!0,e.exports=r},function(t,n){t.exports=e},function(e,t){function n(){}n.prototype={on:function(e,t,n){var r=this.e||(this.e={});return(r[e]||(r[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){var r=this;function o(){r.off(e,o),t.apply(n,arguments)}return o._=t,this.on(e,o,n)},emit:function(e){for(var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),r=0,o=n.length;r<o;r++)n[r].fn.apply(n[r].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),r=n[e],o=[];if(r&&t)for(var i=0,a=r.length;i<a;i++)r[i].fn!==t&&r[i].fn._!==t&&o.push(r[i]);return o.length?n[e]=o:delete n[e],this}},e.exports=n,e.exports.TinyEmitter=n},function(e,t,n){e.exports=n(13)},function(e,t,n){\"use strict\";var r=n(0),o=n(2),i=n(15),a=n(8);function u(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var s=u(n(5));s.Axios=i,s.create=function(e){return u(a(s.defaults,e))},s.Cancel=n(9),s.CancelToken=n(28),s.isCancel=n(4),s.all=function(e){return Promise.all(e)},s.spread=n(29),e.exports=s,e.exports.default=s},function(e,t){\n/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\ne.exports=function(e){return null!=e&&null!=e.constructor&&\"function\"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},function(e,t,n){\"use strict\";var r=n(0),o=n(3),i=n(16),a=n(17),u=n(8);function s(e){this.defaults=e,this.interceptors={request:new i,response:new i}}s.prototype.request=function(e){\"string\"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=u(this.defaults,e)).method=e.method?e.method.toLowerCase():\"get\";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},s.prototype.getUri=function(e){return e=u(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\\?/,\"\")},r.forEach([\"delete\",\"get\",\"head\",\"options\"],(function(e){s.prototype[e]=function(t,n){return this.request(r.merge(n||{},{method:e,url:t}))}})),r.forEach([\"post\",\"put\",\"patch\"],(function(e){s.prototype[e]=function(t,n,o){return this.request(r.merge(o||{},{method:e,url:t,data:n}))}})),e.exports=s},function(e,t,n){\"use strict\";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},function(e,t,n){\"use strict\";var r=n(0),o=n(18),i=n(4),a=n(5),u=n(26),s=n(27);function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return c(e),e.baseURL&&!u(e.url)&&(e.url=s(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach([\"delete\",\"get\",\"head\",\"post\",\"put\",\"patch\",\"common\"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return c(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,n){\"use strict\";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},function(e,t){var n,r,o=e.exports={};function i(){throw new Error(\"setTimeout has not been defined\")}function a(){throw new Error(\"clearTimeout has not been defined\")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n=\"function\"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r=\"function\"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var s,c=[],f=!1,l=-1;function p(){f&&s&&(f=!1,s.length?c=s.concat(c):l=-1,c.length&&h())}function h(){if(!f){var e=u(p);f=!0;for(var t=c.length;t;){for(s=c,c=[];++l<t;)s&&s[l].run();l=-1,t=c.length}s=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function d(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new d(e,t)),1!==c.length||f||u(h)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title=\"browser\",o.browser=!0,o.env={},o.argv=[],o.version=\"\",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error(\"process.binding is not supported\")},o.cwd=function(){return\"/\"},o.chdir=function(e){throw new Error(\"process.chdir is not supported\")},o.umask=function(){return 0}},function(e,t,n){\"use strict\";var r=n(0);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},function(e,t,n){\"use strict\";var r=n(7);e.exports=function(e,t,n){var o=n.config.validateStatus;!o||o(n.status)?e(n):t(r(\"Request failed with status code \"+n.status,n.config,null,n.request,n))}},function(e,t,n){\"use strict\";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,n){\"use strict\";var r=n(0),o=[\"age\",\"authorization\",\"content-length\",\"content-type\",\"etag\",\"expires\",\"from\",\"host\",\"if-modified-since\",\"if-unmodified-since\",\"last-modified\",\"location\",\"max-forwards\",\"proxy-authorization\",\"referer\",\"retry-after\",\"user-agent\"];e.exports=function(e){var t,n,i,a={};return e?(r.forEach(e.split(\"\\n\"),(function(e){if(i=e.indexOf(\":\"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]=\"set-cookie\"===t?(a[t]?a[t]:[]).concat([n]):a[t]?a[t]+\", \"+n:n}})),a):a}},function(e,t,n){\"use strict\";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement(\"a\");function o(e){var r=e;return t&&(n.setAttribute(\"href\",r),r=n.href),n.setAttribute(\"href\",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,\"\"):\"\",host:n.host,search:n.search?n.search.replace(/^\\?/,\"\"):\"\",hash:n.hash?n.hash.replace(/^#/,\"\"):\"\",hostname:n.hostname,port:n.port,pathname:\"/\"===n.pathname.charAt(0)?n.pathname:\"/\"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){\"use strict\";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,a){var u=[];u.push(e+\"=\"+encodeURIComponent(t)),r.isNumber(n)&&u.push(\"expires=\"+new Date(n).toGMTString()),r.isString(o)&&u.push(\"path=\"+o),r.isString(i)&&u.push(\"domain=\"+i),!0===a&&u.push(\"secure\"),document.cookie=u.join(\"; \")},read:function(e){var t=document.cookie.match(new RegExp(\"(^|;\\\\s*)(\"+e+\")=([^;]*)\"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,\"\",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){\"use strict\";e.exports=function(e){return/^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(e)}},function(e,t,n){\"use strict\";e.exports=function(e,t){return t?e.replace(/\\/+$/,\"\")+\"/\"+t.replace(/^\\/+/,\"\"):e}},function(e,t,n){\"use strict\";var r=n(9);function o(e){if(\"function\"!=typeof e)throw new TypeError(\"executor must be a function.\");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},function(e,t,n){\"use strict\";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){\"use strict\";n.r(t);var r=n(10),o=n.n(r),i=n(1);function a(e){return(a=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return!t||\"object\"!==a(t)&&\"function\"!=typeof t?function(e){if(void 0===e)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var l=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,t),(n=s(this,c(t).call(this,e))).connections=[],n.loading=[],n}var n,r,o;return function(e,t){if(\"function\"!=typeof t&&null!==t)throw new TypeError(\"Super expression must either be null or a function\");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,e),n=t,(r=[{key:\"defaultCallback\",value:function(e){this.setState(e)}},{key:\"componentDidMount\",value:function(){var e=this;Object(i.each)(this.connections,(function(t){return t[0].on(t[1],e[t[2]]&&e[t[2]].bind(e)||e.defaultCallback.bind(e))}))}},{key:\"componentWillUnmount\",value:function(){var e=this;Object(i.each)(this.connections,(function(t){return t[0].off(t[1],e[t[2]]&&e[t[2]].bind(e)||e.defaultCallback.bind(e))}))}},{key:\"connect\",value:function(e,t,n){this.connections.push([e,t,n])}}])&&u(n.prototype,r),o&&u(n,o),t}(o.a.Component),p=n(11),h=new(n.n(p).a);function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var m=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,e)}var t,n,r;return t=e,(n=[{key:\"errors\",value:function(e){var t=[],n=e||{};return n.errors=n.errors||{},Object(i.each)(n.errors,(function(e){t.push({type:\"warning\",message:e.reason||e.message})})),t}},{key:\"emitRequestError\",value:function(e){switch((e=e||{response:{}}).response.status){case 401:case 406:h.emit(\"store.request.error.signout\",[{type:\"warning\",message:\"unauthorized\"}]);break;case 404:case 410:h.emit(\"store.request.error.landing\",this.errors(e.response.data));break;case 500:h.emit(\"store.request.error.notfound\");break;case 503:h.emit(\"store.request.error.maintenance\");break;default:h.emit(\"store.request.error\",this.errors(e.response.data))}}}])&&d(t.prototype,n),r&&d(t,r),e}()),y=n(12),v=n.n(y);function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var b=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,e),this._state={}}var t,n,r;return t=e,(n=[{key:\"parse\",value:function(e){return void 0===e?null:JSON.parse(e)}},{key:\"get\",value:function(e){var t=this;if(void 0===e){var n={};return Object(i.each)(this._state,(function(e,r){return n[r]=t.parse(e)})),n}return this.parse(this._state[e])}},{key:\"set\",value:function(e,t){void 0!==t&&(this._state[e]=JSON.stringify(t))}},{key:\"delete\",value:function(e){delete this._state[e]}},{key:\"clear\",value:function(){this._state={}}}])&&g(t.prototype,n),r&&g(t,r),e}();function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x=function(){function e(t){if(function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,e),void 0===t)throw new Error(\"Stores require a namespace\");this.namespace=t,this.state=new b}var t,n,r;return t=e,(n=[{key:\"getState\",value:function(e){return this.state.get(e)}},{key:\"setState\",value:function(e){var t=this;Object(i.each)(e,(function(e,n){t.state.set(n,e)}))}},{key:\"clearState\",value:function(){this.state.clear()}},{key:\"deleteState\",value:function(e){this.state.delete(e)}},{key:\"emit\",value:function(e,t){h.emit(this.namespace+\".\"+e,t)}},{key:\"on\",value:function(e,t){h.on(this.namespace+\".\"+e,t)}},{key:\"off\",value:function(e,t){h.off(this.namespace+\".\"+e,t)}},{key:\"get\",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this._request({url:e,method:\"GET\",params:t})}},{key:\"post\",value:function(e,t){return this._request({url:e,data:t,method:\"POST\"})}},{key:\"put\",value:function(e,t){return this._request({url:e,data:t,method:\"PUT\"})}},{key:\"delete\",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this._request({url:e,method:\"DELETE\",params:t})}},{key:\"request\",value:function(e,t,n,r){var o=this;this[e](t,r).then((function(e){o.setState(e.data),o.emit(n,e.data)})).catch(this.emitRequestError.bind(this))}},{key:\"_request\",value:function(e){return v()({url:e.url,headers:{Authorization:\"Bearer \"+localStorage.getItem(\"token\")},data:e.data,method:e.method})}},{key:\"emitRequestError\",value:function(e){m.emitRequestError(e)}}])&&w(t.prototype,n),r&&w(t,r),e}();n.d(t,\"Component\",(function(){return l})),n.d(t,\"Doh\",(function(){return m})),n.d(t,\"Event\",(function(){return h})),n.d(t,\"Store\",(function(){return x}))}])}));\n\n//# sourceURL=webpack:///./node_modules/supercapacitor/dist/supercapacitor.js?");

/***/ }),

/***/ "./node_modules/underscore/underscore.js":
/*!***********************************************************************************!*\
  !*** delegated ./node_modules/underscore/underscore.js from dll-reference vendor ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor */ \"dll-reference vendor\"))(38);\n\n//# sourceURL=webpack:///delegated_./node_modules/underscore/underscore.js_from_dll-reference_vendor?");

/***/ }),

/***/ "dll-reference vendor":
/*!*************************!*\
  !*** external "vendor" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = vendor;\n\n//# sourceURL=webpack:///external_%22vendor%22?");

/***/ })

/******/ });