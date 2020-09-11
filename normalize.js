'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fp = require('lodash/fp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('gatsby-source-filesystem'),
    createRemoteFileNode = _require.createRemoteFileNode;

var inspectObject = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var apiURL = _ref2.apiURL,
        store = _ref2.store,
        cache = _ref2.cache,
        createNode = _ref2.createNode,
        touchNode = _ref2.touchNode,
        auth = _ref2.auth,
        field = _ref2.field;
    var fileNodeID, source_url, fileNode;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(field !== null && (0, _fp.has)('url', field))) {
              _context.next = 16;
              break;
            }

            fileNodeID = void 0;

            if (fileNodeID) {
              _context.next = 13;
              break;
            }

            _context.prev = 3;

            // full media url
            source_url = '' + (field.url.startsWith('http') ? '' : apiURL) + field.url;
            _context.next = 7;
            return createRemoteFileNode({
              url: source_url,
              store: store,
              cache: cache,
              createNode: createNode,
              auth: auth
            });

          case 7:
            fileNode = _context.sent;


            if (fileNode) {
              fileNodeID = fileNode.id;
            }
            _context.next = 13;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](3);

          case 13:
            if (fileNodeID) {
              field.remoteImage___NODE = fileNodeID;
            }
            _context.next = 19;
            break;

          case 16:
            if (!(field !== null && (typeof field === 'undefined' ? 'undefined' : (0, _typeof3.default)(field)) === 'object')) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return extractFields(apiURL, store, cache, createNode, touchNode, auth, field);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 11]]);
  }));

  return function inspectObject(_x) {
    return _ref.apply(this, arguments);
  };
}();

var extractFields = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(apiURL, store, cache, createNode, touchNode, auth, item) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, field;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 3;
            _iterator = (0, _getIterator3.default)((0, _keys2.default)(item));

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 18;
              break;
            }

            key = _step.value;
            field = item[key];

            if (!Array.isArray(field)) {
              _context3.next = 13;
              break;
            }

            _context3.next = 11;
            return _promise2.default.all(field.map(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(f) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return inspectObject({
                          apiURL: apiURL,
                          store: store,
                          cache: cache,
                          createNode: createNode,
                          touchNode: touchNode,
                          auth: auth,
                          field: f
                        });

                      case 2:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x9) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 11:
            _context3.next = 15;
            break;

          case 13:
            _context3.next = 15;
            return inspectObject({
              apiURL: apiURL,
              store: store,
              cache: cache,
              createNode: createNode,
              touchNode: touchNode,
              auth: auth,
              field: field
            });

          case 15:
            _iteratorNormalCompletion = true;
            _context3.next = 5;
            break;

          case 18:
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context3.t0;

          case 24:
            _context3.prev = 24;
            _context3.prev = 25;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 27:
            _context3.prev = 27;

            if (!_didIteratorError) {
              _context3.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context3.finish(27);

          case 31:
            return _context3.finish(24);

          case 32:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 20, 24, 32], [25,, 27, 31]]);
  }));

  return function extractFields(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

// Downloads media from image type fields
exports.downloadMediaFiles = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref6) {
    var entities = _ref6.entities,
        apiURL = _ref6.apiURL,
        store = _ref6.store,
        cache = _ref6.cache,
        createNode = _ref6.createNode,
        touchNode = _ref6.touchNode,
        auth = _ref6.jwtToken;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt('return', _promise2.default.all(entities.map(function () {
              var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(entity) {
                var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item;

                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context4.prev = 3;
                        _iterator2 = (0, _getIterator3.default)(entity);

                      case 5:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                          _context4.next = 12;
                          break;
                        }

                        item = _step2.value;
                        _context4.next = 9;
                        return extractFields(apiURL, store, cache, createNode, touchNode, auth, item);

                      case 9:
                        _iteratorNormalCompletion2 = true;
                        _context4.next = 5;
                        break;

                      case 12:
                        _context4.next = 18;
                        break;

                      case 14:
                        _context4.prev = 14;
                        _context4.t0 = _context4['catch'](3);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context4.t0;

                      case 18:
                        _context4.prev = 18;
                        _context4.prev = 19;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                          _iterator2.return();
                        }

                      case 21:
                        _context4.prev = 21;

                        if (!_didIteratorError2) {
                          _context4.next = 24;
                          break;
                        }

                        throw _iteratorError2;

                      case 24:
                        return _context4.finish(21);

                      case 25:
                        return _context4.finish(18);

                      case 26:
                        return _context4.abrupt('return', entity);

                      case 27:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined, [[3, 14, 18, 26], [19,, 21, 25]]);
              }));

              return function (_x11) {
                return _ref7.apply(this, arguments);
              };
            }())));

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x10) {
    return _ref5.apply(this, arguments);
  };
}();