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
      isSdkReady: false,
      loadedScript: null
    };
    return _this;
  }

  _createClass(PayPalButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window !== 'undefined' && window !== undefined && window.paypal === undefined) {
        this.addPaypalSdk();
      } else if (typeof window !== 'undefined' && window !== undefined && window.paypal !== undefined && this.props.onButtonReady) {
        if (!document.querySelector("script[src='".concat(this.getScriptSrc(), "']"))) {
          this.addPaypalSdk();
        } else {
          this.props.onButtonReady();
        }
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var loadedScript = this.state.loadedScript;

      if (nextProps.currency && this.props.currency && nextProps.currency != this.props.currency) {
        //   if (loadedScript) {
        //     loadedScript.remove();
        //     delete window['zoid'];
        //     delete window['paypal'];
        //   }
        this.addPaypalSdk(nextProps.currency);
      }

      return true;
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

      if (typeof window === 'undefined' || window.paypal === undefined) {
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
    value: function addPaypalSdk(currency) {
      var _this4 = this;

      var _this$props3 = this.props,
          options = _this$props3.options,
          onButtonReady = _this$props3.onButtonReady;
      var loadedScript = this.state.loadedScript;
      console.log('options.clientId', options.clientId);
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.getScriptSrc(currency);
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
  }, {
    key: "getScriptSrc",
    value: function getScriptSrc(currency) {
      var options = this.props.options;

      if (!currency) {
        currency = this.props.currency;
      }

      var queryParams = []; // replacing camelCase with dashes

      Object.keys(options).forEach(function (k) {
        var name = k.split(/(?=[A-Z])/).join('-').toLowerCase();
        queryParams.push("".concat(name, "=").concat(options[k]));
      });
      queryParams.push("currency=".concat(currency));
      return "https://www.paypal.com/sdk/js?".concat(queryParams.join('&'));
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
    currency: ''
  },
  shippingPreference: 'GET_FROM_FILE'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUGF5UGFsQnV0dG9uIiwicHJvcHMiLCJzdGF0ZSIsImlzU2RrUmVhZHkiLCJsb2FkZWRTY3JpcHQiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJwYXlwYWwiLCJhZGRQYXlwYWxTZGsiLCJvbkJ1dHRvblJlYWR5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0U2NyaXB0U3JjIiwibmV4dFByb3BzIiwiY3VycmVuY3kiLCJkYXRhIiwiYWN0aW9ucyIsIm9wdGlvbnMiLCJhbW91bnQiLCJzaGlwcGluZ1ByZWZlcmVuY2UiLCJvcmRlciIsImNyZWF0ZSIsInB1cmNoYXNlX3VuaXRzIiwiY3VycmVuY3lfY29kZSIsInZhbHVlIiwidG9TdHJpbmciLCJhcHBsaWNhdGlvbl9jb250ZXh0Iiwic2hpcHBpbmdfcHJlZmVyZW5jZSIsImNhcHR1cmUiLCJ0aGVuIiwiZGV0YWlscyIsIm9uU3VjY2VzcyIsImVyciIsImNhdGNoRXJyb3IiLCJjcmVhdGVPcmRlciIsImNyZWF0ZVN1YnNjcmlwdGlvbiIsIm9uQXBwcm92ZSIsInN0eWxlIiwiQnV0dG9uIiwiQnV0dG9ucyIsImRyaXZlciIsIlJlYWN0IiwiUmVhY3RET00iLCJjcmVhdGVPcmRlckZuIiwiY29uc29sZSIsImxvZyIsImNsaWVudElkIiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJzcmMiLCJhc3luYyIsIm9ubG9hZCIsInNldFN0YXRlIiwib25lcnJvciIsIkVycm9yIiwiYm9keSIsImFwcGVuZENoaWxkIiwicXVlcnlQYXJhbXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImsiLCJuYW1lIiwic3BsaXQiLCJqb2luIiwidG9Mb3dlckNhc2UiLCJwdXNoIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwibnVtYmVyIiwic3RyaW5nIiwiZnVuYyIsIm9uRXJyb3IiLCJvYmplY3QiLCJzaGFwZSIsIm1lcmNoYW50SWQiLCJpbnRlbnQiLCJjb21taXQiLCJib29sIiwidmF1bHQiLCJjb21wb25lbnQiLCJkaXNhYmxlRnVuZGluZyIsImRpc2FibGVDYXJkIiwiaW50ZWdyYXRpb25EYXRlIiwibG9jYWxlIiwiYnV5ZXJDb3VudHJ5IiwiZGVidWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNENNQSxZOzs7OztBQXVDSix3QkFBWUMsS0FBWixFQUFzQztBQUFBOztBQUFBOztBQUNwQyw4QkFBTUEsS0FBTjtBQUVBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxVQUFVLEVBQUUsS0FERDtBQUVYQyxNQUFBQSxZQUFZLEVBQUU7QUFGSCxLQUFiO0FBSG9DO0FBT3JDOzs7O3dDQUVtQjtBQUNsQixVQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNBLE1BQU0sS0FBS0MsU0FBNUMsSUFBeURELE1BQU0sQ0FBQ0UsTUFBUCxLQUFrQkQsU0FBL0UsRUFBMEY7QUFDeEYsYUFBS0UsWUFBTDtBQUNELE9BRkQsTUFFTyxJQUNMLE9BQU9ILE1BQVAsS0FBa0IsV0FBbEIsSUFDQUEsTUFBTSxLQUFLQyxTQURYLElBRUFELE1BQU0sQ0FBQ0UsTUFBUCxLQUFrQkQsU0FGbEIsSUFHQSxLQUFLTCxLQUFMLENBQVdRLGFBSk4sRUFLTDtBQUNBLFlBQUksQ0FBQ0MsUUFBUSxDQUFDQyxhQUFULHVCQUFzQyxLQUFLQyxZQUFMLEVBQXRDLFFBQUwsRUFBcUU7QUFDbkUsZUFBS0osWUFBTDtBQUNELFNBRkQsTUFFTztBQUNMLGVBQUtQLEtBQUwsQ0FBV1EsYUFBWDtBQUNEO0FBQ0Y7QUFDRjs7OzBDQUVxQkksUyxFQUFXO0FBQUEsVUFDdkJULFlBRHVCLEdBQ04sS0FBS0YsS0FEQyxDQUN2QkUsWUFEdUI7O0FBRS9CLFVBQUlTLFNBQVMsQ0FBQ0MsUUFBVixJQUFzQixLQUFLYixLQUFMLENBQVdhLFFBQWpDLElBQTZDRCxTQUFTLENBQUNDLFFBQVYs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QSxXQUFXLEVBQUVmLHNCQUFVRyxNQVRBO0FBVXZCYSxJQUFBQSxlQUFlLEVBQUVoQixzQkFBVUcsTUFWSjtBQVd2QmMsSUFBQUEsTUFBTSxFQUFFakIsc0JBQVVHLE1BWEs7QUFZdkJlLElBQUFBLFlBQVksRUFBRWxCLHNCQUFVRyxNQVpEO0FBYXZCZ0IsSUFBQUEsS0FBSyxFQUFFbkIsc0JBQVVDLFNBQVYsQ0FBb0IsQ0FBQ0Qsc0JBQVVXLElBQVgsRUFBaUJYLHNCQUFVRyxNQUEzQixDQUFwQjtBQWJnQixHQUFoQixDQVhRO0FBMEJqQi9ELEVBQUFBLGFBQWEsRUFBRTRELHNCQUFVSTtBQTFCUixDOztnQkFEZnpFLFksa0JBOEJrQjtBQUNwQnFDLEVBQUFBLEtBQUssRUFBRSxFQURhO0FBRXBCcEIsRUFBQUEsT0FBTyxFQUFFO0FBQ1A2QixJQUFBQSxRQUFRLEVBQUUsSUFESDtBQUVQaEMsSUFBQUEsUUFBUSxFQUFFO0FBRkgsR0FGVztBQU1wQkssRUFBQUEsa0JBQWtCLEVBQUU7QUFOQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBwYXlwYWw6IGFueTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBheVBhbEJ1dHRvblByb3BzIHtcbiAgYW1vdW50PzogbnVtYmVyIHwgc3RyaW5nO1xuICBjdXJyZW5jeT86IG51bWJlciB8IHN0cmluZztcbiAgc2hpcHBpbmdQcmVmZXJlbmNlPzogJ05PX1NISVBQSU5HJyB8ICdHRVRfRlJPTV9GSUxFJyB8ICdTRVRfUFJPVklERURfQUREUkVTUyc7XG4gIG9uU3VjY2Vzcz86IEZ1bmN0aW9uO1xuICBjYXRjaEVycm9yPzogRnVuY3Rpb247XG4gIG9uRXJyb3I/OiBGdW5jdGlvbjtcbiAgY3JlYXRlT3JkZXI/OiBGdW5jdGlvbjtcbiAgY3JlYXRlU3Vic2NyaXB0aW9uPzogRnVuY3Rpb247XG4gIG9uQXBwcm92ZT86IEZ1bmN0aW9uO1xuICBzdHlsZT86IG9iamVjdDtcbiAgb3B0aW9ucz86IFBheXBhbE9wdGlvbnM7XG4gIG9uQnV0dG9uUmVhZHk/OiBGdW5jdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXlQYWxCdXR0b25TdGF0ZSB7XG4gIGlzU2RrUmVhZHk6IGJvb2xlYW47XG4gIGxvYWRlZFNjcmlwdDogSFRNTFNjcmlwdEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5cGFsT3B0aW9ucyB7XG4gIGNsaWVudElkPzogc3RyaW5nO1xuICBtZXJjaGFudElkPzogc3RyaW5nO1xuICBjdXJyZW5jeT86IG51bWJlciB8IHN0cmluZztcbiAgaW50ZW50Pzogc3RyaW5nO1xuICBjb21taXQ/OiBib29sZWFuIHwgc3RyaW5nO1xuICB2YXVsdD86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIGNvbXBvbmVudD86IHN0cmluZztcbiAgZGlzYWJsZUZ1bmRpbmc/OiBzdHJpbmc7XG4gIGRpc2FibGVDYXJkPzogc3RyaW5nO1xuICBpbnRlZ3JhdGlvbkRhdGU/OiBzdHJpbmc7XG4gIGxvY2FsZT86IHN0cmluZztcbiAgYnV5ZXJDb3VudHJ5Pzogc3RyaW5nO1xuICBkZWJ1Zz86IGJvb2xlYW4gfCBzdHJpbmc7XG59XG5cbmNsYXNzIFBheVBhbEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQYXlQYWxCdXR0b25Qcm9wcywgUGF5UGFsQnV0dG9uU3RhdGU+IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhbW91bnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICBjdXJyZW5jeTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIHNoaXBwaW5nUHJlZmVyZW5jZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvblN1Y2Nlc3M6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNhdGNoRXJyb3I6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRXJyb3I6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNyZWF0ZU9yZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjcmVhdGVTdWJzY3JpcHRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQXBwcm92ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGNsaWVudElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbWVyY2hhbnRJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGN1cnJlbmN5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgICBpbnRlbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBjb21taXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgICB2YXVsdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICAgIGNvbXBvbmVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGRpc2FibGVGdW5kaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgZGlzYWJsZUNhcmQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBpbnRlZ3JhdGlvbkRhdGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBidXllckNvdW50cnk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBkZWJ1ZzogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICB9KSxcbiAgICBvbkJ1dHRvblJlYWR5OiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHN0eWxlOiB7fSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBjbGllbnRJZDogJ3NiJyxcbiAgICAgIGN1cnJlbmN5OiAnJyxcbiAgICB9LFxuICAgIHNoaXBwaW5nUHJlZmVyZW5jZTogJ0dFVF9GUk9NX0ZJTEUnLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQYXlQYWxCdXR0b25Qcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc1Nka1JlYWR5OiBmYWxzZSxcbiAgICAgIGxvYWRlZFNjcmlwdDogbnVsbCxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAhPT0gdW5kZWZpbmVkICYmIHdpbmRvdy5wYXlwYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5hZGRQYXlwYWxTZGsoKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHdpbmRvdyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICB3aW5kb3cucGF5cGFsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHRoaXMucHJvcHMub25CdXR0b25SZWFkeVxuICAgICkge1xuICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzY3JpcHRbc3JjPScke3RoaXMuZ2V0U2NyaXB0U3JjKCl9J11gKSkge1xuICAgICAgICB0aGlzLmFkZFBheXBhbFNkaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkJ1dHRvblJlYWR5KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xuICAgIGNvbnN0IHsgbG9hZGVkU2NyaXB0IH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChuZXh0UHJvcHMuY3VycmVuY3kgJiYgdGhpcy5wcm9wcy5jdXJyZW5jeSAmJiBuZXh0UHJvcHMuY3VycmVuY3kgIT0gdGhpcy5wcm9wcy5jdXJyZW5jeSkge1xuICAgICAgLy8gICBpZiAobG9hZGVkU2NyaXB0KSB7XG4gICAgICAvLyAgICAgbG9hZGVkU2NyaXB0LnJlbW92ZSgpO1xuICAgICAgLy8gICAgIGRlbGV0ZSB3aW5kb3dbJ3pvaWQnXTtcbiAgICAgIC8vICAgICBkZWxldGUgd2luZG93WydwYXlwYWwnXTtcbiAgICAgIC8vICAgfVxuICAgICAgdGhpcy5hZGRQYXlwYWxTZGsobmV4dFByb3BzLmN1cnJlbmN5KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjcmVhdGVPcmRlcihkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkge1xuICAgIGNvbnN0IHsgY3VycmVuY3ksIG9wdGlvbnMsIGFtb3VudCwgc2hpcHBpbmdQcmVmZXJlbmNlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGFjdGlvbnMub3JkZXIuY3JlYXRlKHtcbiAgICAgIHB1cmNoYXNlX3VuaXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBhbW91bnQ6IHtcbiAgICAgICAgICAgIGN1cnJlbmN5X2NvZGU6IGN1cnJlbmN5ID8gY3VycmVuY3kgOiBvcHRpb25zICYmIG9wdGlvbnMuY3VycmVuY3kgPyBvcHRpb25zLmN1cnJlbmN5IDogJ1VTRCcsXG4gICAgICAgICAgICB2YWx1ZTogYW1vdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBhcHBsaWNhdGlvbl9jb250ZXh0OiB7XG4gICAgICAgIHNoaXBwaW5nX3ByZWZlcmVuY2U6IHNoaXBwaW5nUHJlZmVyZW5jZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBvbkFwcHJvdmUoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9ucy5vcmRlclxuICAgICAgLmNhcHR1cmUoKVxuICAgICAgLnRoZW4oKGRldGFpbHMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWNjZXNzKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25TdWNjZXNzKGRldGFpbHMsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2F0Y2hFcnJvcikge1xuICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNhdGNoRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBhbW91bnQsIG9uU3VjY2VzcywgY3JlYXRlT3JkZXIsIGNyZWF0ZVN1YnNjcmlwdGlvbiwgb25BcHByb3ZlLCBzdHlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGlzU2RrUmVhZHkgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgd2luZG93LnBheXBhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBCdXR0b24gPSB3aW5kb3cucGF5cGFsLkJ1dHRvbnMuZHJpdmVyKCdyZWFjdCcsIHtcbiAgICAgIFJlYWN0LFxuICAgICAgUmVhY3RET00sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjcmVhdGVPcmRlckZuID1cbiAgICAgIGFtb3VudCAmJiAhY3JlYXRlT3JkZXJcbiAgICAgICAgPyAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IHRoaXMuY3JlYXRlT3JkZXIoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IGNyZWF0ZU9yZGVyKGRhdGEsIGFjdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxCdXR0b25cbiAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgIGNyZWF0ZU9yZGVyPXtjcmVhdGVTdWJzY3JpcHRpb24gPyB1bmRlZmluZWQgOiBjcmVhdGVPcmRlckZufVxuICAgICAgICBjcmVhdGVTdWJzY3JpcHRpb249e2NyZWF0ZVN1YnNjcmlwdGlvbn1cbiAgICAgICAgb25BcHByb3ZlPXtcbiAgICAgICAgICBvblN1Y2Nlc3NcbiAgICAgICAgICAgID8gKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiB0aGlzLm9uQXBwcm92ZShkYXRhLCBhY3Rpb25zKVxuICAgICAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IG9uQXBwcm92ZShkYXRhLCBhY3Rpb25zKVxuICAgICAgICB9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUGF5cGFsU2RrKGN1cnJlbmN5Pykge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgb25CdXR0b25SZWFkeSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGxvYWRlZFNjcmlwdCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLmNsaWVudElkJywgb3B0aW9ucy5jbGllbnRJZCk7XG5cbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSB0aGlzLmdldFNjcmlwdFNyYyhjdXJyZW5jeSk7XG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzU2RrUmVhZHk6IHRydWUgfSk7XG5cbiAgICAgIGlmIChvbkJ1dHRvblJlYWR5KSB7XG4gICAgICAgIG9uQnV0dG9uUmVhZHkoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXlwYWwgU0RLIGNvdWxkIG5vdCBiZSBsb2FkZWQuJyk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkZWRTY3JpcHQ6IHNjcmlwdCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2NyaXB0U3JjKGN1cnJlbmN5Pykge1xuICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghY3VycmVuY3kpIHtcbiAgICAgIGN1cnJlbmN5ID0gdGhpcy5wcm9wcy5jdXJyZW5jeTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVyeVBhcmFtczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vIHJlcGxhY2luZyBjYW1lbENhc2Ugd2l0aCBkYXNoZXNcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga1xuICAgICAgICAuc3BsaXQoLyg/PVtBLVpdKS8pXG4gICAgICAgIC5qb2luKCctJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICBxdWVyeVBhcmFtcy5wdXNoKGAke25hbWV9PSR7b3B0aW9uc1trXX1gKTtcbiAgICB9KTtcblxuICAgIHF1ZXJ5UGFyYW1zLnB1c2goYGN1cnJlbmN5PSR7Y3VycmVuY3l9YCk7XG5cbiAgICByZXR1cm4gYGh0dHBzOi8vd3d3LnBheXBhbC5jb20vc2RrL2pzPyR7cXVlcnlQYXJhbXMuam9pbignJicpfWA7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGF5UGFsQnV0dG9uIH07XG4iXX0=