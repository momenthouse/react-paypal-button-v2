"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayPalButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PayPalButton = /*#__PURE__*/function (_React$Component) {
  _inherits(PayPalButton, _React$Component);

  var _super = _createSuper(PayPalButton);

  function PayPalButton(props) {
    var _this;

    _classCallCheck(this, PayPalButton);

    _this = _super.call(this, props);
    _this.state = {
      isSdkReady: false
    };
    return _this;
  }

  _createClass(PayPalButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window !== 'undefined' && window !== undefined && window.paypal === undefined) {
        this.addPaypalSdk();
      } else if (typeof window !== 'undefined' && window !== undefined && window.paypal !== undefined && this.props.onButtonReady) {
        this.props.onButtonReady();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.currency != nextState.currency) {
        console.log('nextProps.currency', nextProps.currency);
        console.log('nextState.currency', nextState.currency);
        this.addPaypalSdk();
      }

      return nextProps.currency != nextState.currency;
    }
  }, {
    key: "createOrder",
    value: function createOrder(data, actions) {
      var _this$props = this.props,
          currency = _this$props.currency,
          options = _this$props.options,
          amount = _this$props.amount,
          shippingPreference = _this$props.shippingPreference;
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: currency ? currency : options && options.currency ? options.currency : 'USD',
            value: amount.toString()
          }
        }],
        application_context: {
          shipping_preference: shippingPreference
        }
      });
    }
  }, {
    key: "onApprove",
    value: function onApprove(data, actions) {
      var _this2 = this;

      return actions.order.capture().then(function (details) {
        if (_this2.props.onSuccess) {
          return _this2.props.onSuccess(details, data);
        }
      })["catch"](function (err) {
        if (_this2.props.catchError) {
          return _this2.props.catchError(err);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          amount = _this$props2.amount,
          onSuccess = _this$props2.onSuccess,
          createOrder = _this$props2.createOrder,
          createSubscription = _this$props2.createSubscription,
          onApprove = _this$props2.onApprove,
          style = _this$props2.style;
      var isSdkReady = this.state.isSdkReady;

      if (!isSdkReady && (typeof window === 'undefined' || window.paypal === undefined)) {
        return null;
      }

      var Button = window.paypal.Buttons.driver('react', {
        React: _react["default"],
        ReactDOM: _reactDom["default"]
      });
      var createOrderFn = amount && !createOrder ? function (data, actions) {
        return _this3.createOrder(data, actions);
      } : function (data, actions) {
        return createOrder(data, actions);
      };
      return /*#__PURE__*/_react["default"].createElement(Button, _extends({}, this.props, {
        createOrder: createSubscription ? undefined : createOrderFn,
        createSubscription: createSubscription,
        onApprove: onSuccess ? function (data, actions) {
          return _this3.onApprove(data, actions);
        } : function (data, actions) {
          return onApprove(data, actions);
        },
        style: style
      }));
    }
  }, {
    key: "addPaypalSdk",
    value: function addPaypalSdk() {
      var _this4 = this;

      var _this$props3 = this.props,
          currency = _this$props3.currency,
          options = _this$props3.options,
          onButtonReady = _this$props3.onButtonReady;
      var loadedScript = this.state.loadedScript;
      console.log('loadedScript', loadedScript);

      if (loadedScript) {
        loadedScript.remove();
      }

      var queryParams = []; // replacing camelCase with dashes

      Object.keys(options).forEach(function (k) {
        var name = k.split(/(?=[A-Z])/).join('-').toLowerCase();
        queryParams.push("".concat(name, "=").concat(options[k]));
      });
      queryParams.push("currency=".concat(currency));
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = "https://www.paypal.com/sdk/js?".concat(queryParams.join('&'));
      script.async = true;

      script.onload = function () {
        _this4.setState({
          isSdkReady: true
        });

        if (onButtonReady) {
          onButtonReady();
        }
      };

      script.onerror = function () {
        throw new Error('Paypal SDK could not be loaded.');
      };

      document.body.appendChild(script);
      this.setState({
        loadedScript: script
      });
    }
  }]);

  return PayPalButton;
}(_react["default"].Component);

exports.PayPalButton = PayPalButton;

_defineProperty(PayPalButton, "propTypes", {
  amount: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  shippingPreference: _propTypes["default"].string,
  onSuccess: _propTypes["default"].func,
  catchError: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  createOrder: _propTypes["default"].func,
  createSubscription: _propTypes["default"].func,
  onApprove: _propTypes["default"].func,
  style: _propTypes["default"].object,
  options: _propTypes["default"].shape({
    clientId: _propTypes["default"].string,
    merchantId: _propTypes["default"].string,
    currency: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    intent: _propTypes["default"].string,
    commit: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
    vault: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
    component: _propTypes["default"].string,
    disableFunding: _propTypes["default"].string,
    disableCard: _propTypes["default"].string,
    integrationDate: _propTypes["default"].string,
    locale: _propTypes["default"].string,
    buyerCountry: _propTypes["default"].string,
    debug: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string])
  }),
  onButtonReady: _propTypes["default"].func
});

_defineProperty(PayPalButton, "defaultProps", {
  style: {},
  options: {
    clientId: 'sb',
    currency: 'USD'
  },
  shippingPreference: 'GET_FROM_FILE'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUGF5UGFsQnV0dG9uIiwicHJvcHMiLCJzdGF0ZSIsImlzU2RrUmVhZHkiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJwYXlwYWwiLCJhZGRQYXlwYWxTZGsiLCJvbkJ1dHRvblJlYWR5IiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiY3VycmVuY3kiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImFjdGlvbnMiLCJvcHRpb25zIiwiYW1vdW50Iiwic2hpcHBpbmdQcmVmZXJlbmNlIiwib3JkZXIiLCJjcmVhdGUiLCJwdXJjaGFzZV91bml0cyIsImN1cnJlbmN5X2NvZGUiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiYXBwbGljYXRpb25fY29udGV4dCIsInNoaXBwaW5nX3ByZWZlcmVuY2UiLCJjYXB0dXJlIiwidGhlbiIsImRldGFpbHMiLCJvblN1Y2Nlc3MiLCJlcnIiLCJjYXRjaEVycm9yIiwiY3JlYXRlT3JkZXIiLCJjcmVhdGVTdWJzY3JpcHRpb24iLCJvbkFwcHJvdmUiLCJzdHlsZSIsIkJ1dHRvbiIsIkJ1dHRvbnMiLCJkcml2ZXIiLCJSZWFjdCIsIlJlYWN0RE9NIiwiY3JlYXRlT3JkZXJGbiIsImxvYWRlZFNjcmlwdCIsInJlbW92ZSIsInF1ZXJ5UGFyYW1zIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrIiwibmFtZSIsInNwbGl0Iiwiam9pbiIsInRvTG93ZXJDYXNlIiwicHVzaCIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJzcmMiLCJhc3luYyIsIm9ubG9hZCIsInNldFN0YXRlIiwib25lcnJvciIsIkVycm9yIiwiYm9keSIsImFwcGVuZENoaWxkIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwibnVtYmVyIiwic3RyaW5nIiwiZnVuYyIsIm9uRXJyb3IiLCJvYmplY3QiLCJzaGFwZSIsImNsaWVudElkIiwibWVyY2hhbnRJZCIsImludGVudCIsImNvbW1pdCIsImJvb2wiLCJ2YXVsdCIsImNvbXBvbmVudCIsImRpc2FibGVGdW5kaW5nIiwiZGlzYWJsZUNhcmQiLCJpbnRlZ3JhdGlvbkRhdGUiLCJsb2NhbGUiLCJidXllckNvdW50cnkiLCJkZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQ01BLFk7Ozs7O0FBdUNKLHdCQUFZQyxLQUFaLEVBQXNDO0FBQUE7O0FBQUE7O0FBQ3BDLDhCQUFNQSxLQUFOO0FBRUEsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLFVBQVUsRUFBRTtBQURELEtBQWI7QUFIb0M7QUFNckM7Ozs7d0NBRW1CO0FBQ2xCLFVBQUksT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQ0EsTUFBTSxLQUFLQyxTQUE1QyxJQUF5REQsTUFBTSxDQUFDRSxNQUFQLEtBQWtCRCxTQUEvRSxFQUEwRjtBQUN4RixhQUFLRSxZQUFMO0FBQ0QsT0FGRCxNQUVPLElBQ0wsT0FBT0gsTUFBUCxLQUFrQixXQUFsQixJQUNBQSxNQUFNLEtBQUtDLFNBRFgsSUFFQUQsTUFBTSxDQUFDRSxNQUFQLEtBQWtCRCxTQUZsQixJQUdBLEtBQUtKLEtBQUwsQ0FBV08sYUFKTixFQUtMO0FBQ0EsYUFBS1AsS0FBTCxDQUFXTyxhQUFYO0FBQ0Q7QUFDRjs7OzBDQUVxQkMsUyxFQUFXQyxTLEVBQVc7QUFDMUMsVUFBSUQsU0FBUyxDQUFDRSxRQUFWLElBQXNCRCxTQUFTLENBQUNDLFFBQXBDLEVBQThDO0FBQzVDQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ0osU0FBUyxDQUFDRSxRQUE1QztBQUNBQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ0gsU0FBUyxDQUFDQyxRQUE1QztBQUNBLGFBQUtKLFlBQUw7QUFDRDs7QUFDRCxhQUFPRSxTQUFTLENBQUNFLFFBQVYsSUFBc0JELFNBQVMsQ0FBQ0MsUUFBdkM7QUFD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QUEwQmpCL0QsRUFBQUEsYUFBYSxFQUFFNEQsc0JBQVVJO0FBMUJSLEM7O2dCQURmeEUsWSxrQkE4QmtCO0FBQ3BCb0MsRUFBQUEsS0FBSyxFQUFFLEVBRGE7QUFFcEJwQixFQUFBQSxPQUFPLEVBQUU7QUFDUDRELElBQUFBLFFBQVEsRUFBRSxJQURIO0FBRVBqRSxJQUFBQSxRQUFRLEVBQUU7QUFGSCxHQUZXO0FBTXBCTyxFQUFBQSxrQkFBa0IsRUFBRTtBQU5BLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIHBheXBhbDogYW55O1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5UGFsQnV0dG9uUHJvcHMge1xuICBhbW91bnQ/OiBudW1iZXIgfCBzdHJpbmc7XG4gIGN1cnJlbmN5PzogbnVtYmVyIHwgc3RyaW5nO1xuICBzaGlwcGluZ1ByZWZlcmVuY2U/OiAnTk9fU0hJUFBJTkcnIHwgJ0dFVF9GUk9NX0ZJTEUnIHwgJ1NFVF9QUk9WSURFRF9BRERSRVNTJztcbiAgb25TdWNjZXNzPzogRnVuY3Rpb247XG4gIGNhdGNoRXJyb3I/OiBGdW5jdGlvbjtcbiAgb25FcnJvcj86IEZ1bmN0aW9uO1xuICBjcmVhdGVPcmRlcj86IEZ1bmN0aW9uO1xuICBjcmVhdGVTdWJzY3JpcHRpb24/OiBGdW5jdGlvbjtcbiAgb25BcHByb3ZlPzogRnVuY3Rpb247XG4gIHN0eWxlPzogb2JqZWN0O1xuICBvcHRpb25zPzogUGF5cGFsT3B0aW9ucztcbiAgb25CdXR0b25SZWFkeT86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBheVBhbEJ1dHRvblN0YXRlIHtcbiAgaXNTZGtSZWFkeTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXlwYWxPcHRpb25zIHtcbiAgY2xpZW50SWQ/OiBzdHJpbmc7XG4gIG1lcmNoYW50SWQ/OiBzdHJpbmc7XG4gIGN1cnJlbmN5PzogbnVtYmVyIHwgc3RyaW5nO1xuICBpbnRlbnQ/OiBzdHJpbmc7XG4gIGNvbW1pdD86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIHZhdWx0PzogYm9vbGVhbiB8IHN0cmluZztcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xuICBkaXNhYmxlRnVuZGluZz86IHN0cmluZztcbiAgZGlzYWJsZUNhcmQ/OiBzdHJpbmc7XG4gIGludGVncmF0aW9uRGF0ZT86IHN0cmluZztcbiAgbG9jYWxlPzogc3RyaW5nO1xuICBidXllckNvdW50cnk/OiBzdHJpbmc7XG4gIGRlYnVnPzogYm9vbGVhbiB8IHN0cmluZztcbn1cblxuY2xhc3MgUGF5UGFsQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFBheVBhbEJ1dHRvblByb3BzLCBQYXlQYWxCdXR0b25TdGF0ZT4ge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFtb3VudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIGN1cnJlbmN5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgc2hpcHBpbmdQcmVmZXJlbmNlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uU3VjY2VzczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2F0Y2hFcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY3JlYXRlT3JkZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNyZWF0ZVN1YnNjcmlwdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25BcHByb3ZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgY2xpZW50SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXJjaGFudElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgY3VycmVuY3k6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICAgIGludGVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGNvbW1pdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICAgIHZhdWx0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgZGlzYWJsZUZ1bmRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBkaXNhYmxlQ2FyZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGludGVncmF0aW9uRGF0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGJ1eWVyQ291bnRyeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGRlYnVnOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIH0pLFxuICAgIG9uQnV0dG9uUmVhZHk6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc3R5bGU6IHt9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGNsaWVudElkOiAnc2InLFxuICAgICAgY3VycmVuY3k6ICdVU0QnLFxuICAgIH0sXG4gICAgc2hpcHBpbmdQcmVmZXJlbmNlOiAnR0VUX0ZST01fRklMRScsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFBheVBhbEJ1dHRvblByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzU2RrUmVhZHk6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICE9PSB1bmRlZmluZWQgJiYgd2luZG93LnBheXBhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFkZFBheXBhbFNkaygpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgd2luZG93ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHdpbmRvdy5wYXlwYWwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdGhpcy5wcm9wcy5vbkJ1dHRvblJlYWR5XG4gICAgKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQnV0dG9uUmVhZHkoKTtcbiAgICB9XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICBpZiAobmV4dFByb3BzLmN1cnJlbmN5ICE9IG5leHRTdGF0ZS5jdXJyZW5jeSkge1xuICAgICAgY29uc29sZS5sb2coJ25leHRQcm9wcy5jdXJyZW5jeScsIG5leHRQcm9wcy5jdXJyZW5jeSk7XG4gICAgICBjb25zb2xlLmxvZygnbmV4dFN0YXRlLmN1cnJlbmN5JywgbmV4dFN0YXRlLmN1cnJlbmN5KTtcbiAgICAgIHRoaXMuYWRkUGF5cGFsU2RrKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0UHJvcHMuY3VycmVuY3kgIT0gbmV4dFN0YXRlLmN1cnJlbmN5O1xuICB9XG5cbiAgY3JlYXRlT3JkZXIoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpIHtcbiAgICBjb25zdCB7IGN1cnJlbmN5LCBvcHRpb25zLCBhbW91bnQsIHNoaXBwaW5nUHJlZmVyZW5jZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBhY3Rpb25zLm9yZGVyLmNyZWF0ZSh7XG4gICAgICBwdXJjaGFzZV91bml0czogW1xuICAgICAgICB7XG4gICAgICAgICAgYW1vdW50OiB7XG4gICAgICAgICAgICBjdXJyZW5jeV9jb2RlOiBjdXJyZW5jeSA/IGN1cnJlbmN5IDogb3B0aW9ucyAmJiBvcHRpb25zLmN1cnJlbmN5ID8gb3B0aW9ucy5jdXJyZW5jeSA6ICdVU0QnLFxuICAgICAgICAgICAgdmFsdWU6IGFtb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgYXBwbGljYXRpb25fY29udGV4dDoge1xuICAgICAgICBzaGlwcGluZ19wcmVmZXJlbmNlOiBzaGlwcGluZ1ByZWZlcmVuY2UsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgb25BcHByb3ZlKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSB7XG4gICAgcmV0dXJuIGFjdGlvbnMub3JkZXJcbiAgICAgIC5jYXB0dXJlKClcbiAgICAgIC50aGVuKChkZXRhaWxzKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2Vzcykge1xuICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uU3VjY2VzcyhkZXRhaWxzLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhdGNoRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jYXRjaEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgYW1vdW50LCBvblN1Y2Nlc3MsIGNyZWF0ZU9yZGVyLCBjcmVhdGVTdWJzY3JpcHRpb24sIG9uQXBwcm92ZSwgc3R5bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBpc1Nka1JlYWR5IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKCFpc1Nka1JlYWR5ICYmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB3aW5kb3cucGF5cGFsID09PSB1bmRlZmluZWQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBCdXR0b24gPSB3aW5kb3cucGF5cGFsLkJ1dHRvbnMuZHJpdmVyKCdyZWFjdCcsIHtcbiAgICAgIFJlYWN0LFxuICAgICAgUmVhY3RET00sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjcmVhdGVPcmRlckZuID1cbiAgICAgIGFtb3VudCAmJiAhY3JlYXRlT3JkZXJcbiAgICAgICAgPyAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IHRoaXMuY3JlYXRlT3JkZXIoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IGNyZWF0ZU9yZGVyKGRhdGEsIGFjdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxCdXR0b25cbiAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgIGNyZWF0ZU9yZGVyPXtjcmVhdGVTdWJzY3JpcHRpb24gPyB1bmRlZmluZWQgOiBjcmVhdGVPcmRlckZufVxuICAgICAgICBjcmVhdGVTdWJzY3JpcHRpb249e2NyZWF0ZVN1YnNjcmlwdGlvbn1cbiAgICAgICAgb25BcHByb3ZlPXtcbiAgICAgICAgICBvblN1Y2Nlc3NcbiAgICAgICAgICAgID8gKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiB0aGlzLm9uQXBwcm92ZShkYXRhLCBhY3Rpb25zKVxuICAgICAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IG9uQXBwcm92ZShkYXRhLCBhY3Rpb25zKVxuICAgICAgICB9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUGF5cGFsU2RrKCkge1xuICAgIGNvbnN0IHsgY3VycmVuY3ksIG9wdGlvbnMsIG9uQnV0dG9uUmVhZHkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBsb2FkZWRTY3JpcHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zb2xlLmxvZygnbG9hZGVkU2NyaXB0JywgbG9hZGVkU2NyaXB0KTtcbiAgICBpZiAobG9hZGVkU2NyaXB0KSB7XG4gICAgICBsb2FkZWRTY3JpcHQucmVtb3ZlKCk7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLy8gcmVwbGFjaW5nIGNhbWVsQ2FzZSB3aXRoIGRhc2hlc1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBrXG4gICAgICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAgICAgLmpvaW4oJy0nKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYCR7bmFtZX09JHtvcHRpb25zW2tdfWApO1xuICAgIH0pO1xuXG4gICAgcXVlcnlQYXJhbXMucHVzaChgY3VycmVuY3k9JHtjdXJyZW5jeX1gKTtcblxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgc2NyaXB0LnNyYyA9IGBodHRwczovL3d3dy5wYXlwYWwuY29tL3Nkay9qcz8ke3F1ZXJ5UGFyYW1zLmpvaW4oJyYnKX1gO1xuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1Nka1JlYWR5OiB0cnVlIH0pO1xuXG4gICAgICBpZiAob25CdXR0b25SZWFkeSkge1xuICAgICAgICBvbkJ1dHRvblJlYWR5KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGF5cGFsIFNESyBjb3VsZCBub3QgYmUgbG9hZGVkLicpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGVkU2NyaXB0OiBzY3JpcHQgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGF5UGFsQnV0dG9uIH07XG4iXX0=