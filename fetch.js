'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var apiURL = _ref2.apiURL,
        contentType = _ref2.contentType,
        singleType = _ref2.singleType,
        graphqlType = _ref2.graphqlType,
        jwtToken = _ref2.jwtToken,
        queryLimit = _ref2.queryLimit,
        reporter = _ref2.reporter;
    var options, apiBase, apiEndpoint, data, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Define API options.
            options = (0, _extends3.default)({}, addAuthorizationHeader({}, jwtToken));

            // Define API endpoint.

            apiBase = void 0;
            apiEndpoint = void 0;
            _context.t0 = true;
            _context.next = _context.t0 === !!contentType ? 6 : _context.t0 === !!singleType ? 10 : _context.t0 === !!graphqlType ? 14 : 17;
            break;

          case 6:
            options = (0, _extends3.default)({}, options, {
              method: 'GET'
            });

            apiBase = apiURL + '/' + (0, _pluralize2.default)(contentType);
            apiEndpoint = apiBase + '?_limit=' + queryLimit;
            return _context.abrupt('break', 17);

          case 10:
            options = (0, _extends3.default)({}, options, {
              method: 'GET'
            });

            apiBase = apiURL + '/' + singleType;
            apiEndpoint = apiBase + '?_limit=' + queryLimit;

            return _context.abrupt('break', 17);

          case 14:
            options = (0, _extends3.default)({}, options, {
              method: 'POST',
              data: {
                query: (0, _lodash.get)(graphqlType, 'query', {}),
                variables: (0, _lodash.get)(graphqlType, 'variables', {})
              }
            });

            apiEndpoint = apiURL + '/graphql';
            return _context.abrupt('break', 17);

          case 17:

            reporter.info('Starting to fetch data from Strapi - ' + apiEndpoint);

            _context.prev = 18;
            data = void 0;
            _context.next = 22;
            return (0, _axios2.default)(apiEndpoint, options);

          case 22:
            result = _context.sent;


            if (!!graphqlType) {
              data = result.data.data;
            } else {
              data = result.data;
            }

            return _context.abrupt('return', (0, _lodash.castArray)(data).map(clean));

          case 27:
            _context.prev = 27;
            _context.t1 = _context['catch'](18);

            reporter.panic('Failed to fetch data from Strapi', _context.t1);

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[18, 27]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Remove fields starting with `_` symbol.
 *
 * @param {object} item - Entry needing clean
 * @returns {object} output - Object cleaned
 */
var clean = function clean(item) {
  (0, _lodash.forEach)(item, function (value, key) {
    if (key === '__v') {
      // Remove mongo's __v
      delete item[key];
    } else if (key === '_id') {
      // Rename mongo's "_id" key to "id".
      delete item[key];
      item.id = value;
    } else if ((0, _lodash.startsWith)(key, '__')) {
      // Gatsby reserves double-underscore prefixes – replace prefix with "strapi"
      delete item[key];
      item['strapi_' + key.slice(2)] = value;
    } else if ((0, _lodash.isObject)(value)) {
      item[key] = clean(value);
    }
  });

  return item;
};

var addAuthorizationHeader = function addAuthorizationHeader(options, token) {
  if (token) {
    (0, _lodash.set)(options, 'headers.Authorization', 'Bearer ' + token);
  }

  return options;
};