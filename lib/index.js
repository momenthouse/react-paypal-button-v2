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
      if (nextProps.currency && nextState.currency && nextProps.currency != nextState.currency) {
        console.log('nextProps.currency', nextProps.currency);
        console.log('nextState.currency', nextState.currency);
        this.addPaypalSdk();
        return true;
      }

      return false;
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

      console.log('render');
      console.log('options.clientId', options.clientId);
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
      console.log('queryParams', queryParams);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUGF5UGFsQnV0dG9uIiwicHJvcHMiLCJzdGF0ZSIsImlzU2RrUmVhZHkiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJwYXlwYWwiLCJhZGRQYXlwYWxTZGsiLCJvbkJ1dHRvblJlYWR5IiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiY3VycmVuY3kiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImFjdGlvbnMiLCJvcHRpb25zIiwiYW1vdW50Iiwic2hpcHBpbmdQcmVmZXJlbmNlIiwib3JkZXIiLCJjcmVhdGUiLCJwdXJjaGFzZV91bml0cyIsImN1cnJlbmN5X2NvZGUiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiYXBwbGljYXRpb25fY29udGV4dCIsInNoaXBwaW5nX3ByZWZlcmVuY2UiLCJjYXB0dXJlIiwidGhlbiIsImRldGFpbHMiLCJvblN1Y2Nlc3MiLCJlcnIiLCJjYXRjaEVycm9yIiwiY3JlYXRlT3JkZXIiLCJjcmVhdGVTdWJzY3JpcHRpb24iLCJvbkFwcHJvdmUiLCJzdHlsZSIsImNsaWVudElkIiwiQnV0dG9uIiwiQnV0dG9ucyIsImRyaXZlciIsIlJlYWN0IiwiUmVhY3RET00iLCJjcmVhdGVPcmRlckZuIiwibG9hZGVkU2NyaXB0IiwicmVtb3ZlIiwicXVlcnlQYXJhbXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImsiLCJuYW1lIiwic3BsaXQiLCJqb2luIiwidG9Mb3dlckNhc2UiLCJwdXNoIiwic2NyaXB0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsInNyYyIsImFzeW5jIiwib25sb2FkIiwic2V0U3RhdGUiLCJvbmVycm9yIiwiRXJyb3IiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJzdHJpbmciLCJmdW5jIiwib25FcnJvciIsIm9iamVjdCIsInNoYXBlIiwibWVyY2hhbnRJZCIsImludGVudCIsImNvbW1pdCIsImJvb2wiLCJ2YXVsdCIsImNvbXBvbmVudCIsImRpc2FibGVGdW5kaW5nIiwiZGlzYWJsZUNhcmQiLCJpbnRlZ3JhdGlvbkRhdGUiLCJsb2NhbGUiLCJidXllckNvdW50cnkiLCJkZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0Q01BLFk7Ozs7O0FBdUNKLHdCQUFZQyxLQUFaLEVBQXNDO0FBQUE7O0FBQUE7O0FBQ3BDLDhCQUFNQSxLQUFOO0FBRUEsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLFVBQVUsRUFBRTtBQURELEtBQWI7QUFIb0M7QUFNckM7Ozs7d0NBRW1CO0FBQ2xCLFVBQUksT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQ0EsTUFBTSxLQUFLQyxTQUE1QyxJQUF5REQsTUFBTSxDQUFDRSxNQUFQLEtBQWtCRCxTQUEvRSxFQUEwRjtBQUN4RixhQUFLRSxZQUFMO0FBQ0QsT0FGRCxNQUVPLElBQ0wsT0FBT0gsTUFBUCxLQUFrQixXQUFsQixJQUNBQSxNQUFNLEtBQUtDLFNBRFgsSUFFQUQsTUFBTSxDQUFDRSxNQUFQLEtBQWtCRCxTQUZsQixJQUdBLEtBQUtKLEtBQUwsQ0FBV08sYUFKTixFQUtMO0FBQ0EsYUFBS1AsS0FBTCxDQUFXTyxhQUFYO0FBQ0Q7QUFDRjs7OzBDQUVxQkMsUyxFQUFXQyxTLEVBQVc7QUFDMUMsVUFBSUQsU0FBUyxDQUFDRSxRQUFWLElBQXNCRCxTQUFTLENBQUNDLFFBQWhDLElBQTRDRixTQUFTLENBQUNFLFFBQVYsSUFBc0JELFNBQVMsQ0FBQ0MsUUFBaEYsRUFBMEY7QUFDeEZDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaLEVBQWtDSixTQUFTLENBQUNFLFFBQTVDO0FBQ0FDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaLEVBQWtDSCxTQUFTLENBQUNDLFFBQTVDO0FBQ0EsYUFBS0osWUFBTDtBQUNBLGVBQU8sSUFB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QVd2QmMsSUFBQUEsTUFBTSxFQUFFakIsc0JBQVVHLE1BWEs7QUFZdkJlLElBQUFBLFlBQVksRUFBRWxCLHNCQUFVRyxNQVpEO0FBYXZCZ0IsSUFBQUEsS0FBSyxFQUFFbkIsc0JBQVVDLFNBQVYsQ0FBb0IsQ0FBQ0Qsc0JBQVVXLElBQVgsRUFBaUJYLHNCQUFVRyxNQUEzQixDQUFwQjtBQWJnQixHQUFoQixDQVhRO0FBMEJqQmhFLEVBQUFBLGFBQWEsRUFBRTZELHNCQUFVSTtBQTFCUixDOztnQkFEZnpFLFksa0JBOEJrQjtBQUNwQm9DLEVBQUFBLEtBQUssRUFBRSxFQURhO0FBRXBCcEIsRUFBQUEsT0FBTyxFQUFFO0FBQ1BxQixJQUFBQSxRQUFRLEVBQUUsSUFESDtBQUVQMUIsSUFBQUEsUUFBUSxFQUFFO0FBRkgsR0FGVztBQU1wQk8sRUFBQUEsa0JBQWtCLEVBQUU7QUFOQSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBwYXlwYWw6IGFueTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBheVBhbEJ1dHRvblByb3BzIHtcbiAgYW1vdW50PzogbnVtYmVyIHwgc3RyaW5nO1xuICBjdXJyZW5jeT86IG51bWJlciB8IHN0cmluZztcbiAgc2hpcHBpbmdQcmVmZXJlbmNlPzogJ05PX1NISVBQSU5HJyB8ICdHRVRfRlJPTV9GSUxFJyB8ICdTRVRfUFJPVklERURfQUREUkVTUyc7XG4gIG9uU3VjY2Vzcz86IEZ1bmN0aW9uO1xuICBjYXRjaEVycm9yPzogRnVuY3Rpb247XG4gIG9uRXJyb3I/OiBGdW5jdGlvbjtcbiAgY3JlYXRlT3JkZXI/OiBGdW5jdGlvbjtcbiAgY3JlYXRlU3Vic2NyaXB0aW9uPzogRnVuY3Rpb247XG4gIG9uQXBwcm92ZT86IEZ1bmN0aW9uO1xuICBzdHlsZT86IG9iamVjdDtcbiAgb3B0aW9ucz86IFBheXBhbE9wdGlvbnM7XG4gIG9uQnV0dG9uUmVhZHk/OiBGdW5jdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXlQYWxCdXR0b25TdGF0ZSB7XG4gIGlzU2RrUmVhZHk6IGJvb2xlYW47XG4gIGxvYWRlZFNjcmlwdDogSFRNTFNjcmlwdEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5cGFsT3B0aW9ucyB7XG4gIGNsaWVudElkPzogc3RyaW5nO1xuICBtZXJjaGFudElkPzogc3RyaW5nO1xuICBjdXJyZW5jeT86IG51bWJlciB8IHN0cmluZztcbiAgaW50ZW50Pzogc3RyaW5nO1xuICBjb21taXQ/OiBib29sZWFuIHwgc3RyaW5nO1xuICB2YXVsdD86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIGNvbXBvbmVudD86IHN0cmluZztcbiAgZGlzYWJsZUZ1bmRpbmc/OiBzdHJpbmc7XG4gIGRpc2FibGVDYXJkPzogc3RyaW5nO1xuICBpbnRlZ3JhdGlvbkRhdGU/OiBzdHJpbmc7XG4gIGxvY2FsZT86IHN0cmluZztcbiAgYnV5ZXJDb3VudHJ5Pzogc3RyaW5nO1xuICBkZWJ1Zz86IGJvb2xlYW4gfCBzdHJpbmc7XG59XG5cbmNsYXNzIFBheVBhbEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQYXlQYWxCdXR0b25Qcm9wcywgUGF5UGFsQnV0dG9uU3RhdGU+IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBhbW91bnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICBjdXJyZW5jeTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIHNoaXBwaW5nUHJlZmVyZW5jZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvblN1Y2Nlc3M6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNhdGNoRXJyb3I6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRXJyb3I6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNyZWF0ZU9yZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjcmVhdGVTdWJzY3JpcHRpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQXBwcm92ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgb3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGNsaWVudElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbWVyY2hhbnRJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGN1cnJlbmN5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgICBpbnRlbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBjb21taXQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgICB2YXVsdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICAgIGNvbXBvbmVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGRpc2FibGVGdW5kaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgZGlzYWJsZUNhcmQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBpbnRlZ3JhdGlvbkRhdGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBsb2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBidXllckNvdW50cnk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBkZWJ1ZzogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICB9KSxcbiAgICBvbkJ1dHRvblJlYWR5OiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHN0eWxlOiB7fSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBjbGllbnRJZDogJ3NiJyxcbiAgICAgIGN1cnJlbmN5OiAnVVNEJyxcbiAgICB9LFxuICAgIHNoaXBwaW5nUHJlZmVyZW5jZTogJ0dFVF9GUk9NX0ZJTEUnLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQYXlQYWxCdXR0b25Qcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc1Nka1JlYWR5OiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAhPT0gdW5kZWZpbmVkICYmIHdpbmRvdy5wYXlwYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5hZGRQYXlwYWxTZGsoKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHdpbmRvdyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICB3aW5kb3cucGF5cGFsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHRoaXMucHJvcHMub25CdXR0b25SZWFkeVxuICAgICkge1xuICAgICAgdGhpcy5wcm9wcy5vbkJ1dHRvblJlYWR5KCk7XG4gICAgfVxuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgaWYgKG5leHRQcm9wcy5jdXJyZW5jeSAmJiBuZXh0U3RhdGUuY3VycmVuY3kgJiYgbmV4dFByb3BzLmN1cnJlbmN5ICE9IG5leHRTdGF0ZS5jdXJyZW5jeSkge1xuICAgICAgY29uc29sZS5sb2coJ25leHRQcm9wcy5jdXJyZW5jeScsIG5leHRQcm9wcy5jdXJyZW5jeSk7XG4gICAgICBjb25zb2xlLmxvZygnbmV4dFN0YXRlLmN1cnJlbmN5JywgbmV4dFN0YXRlLmN1cnJlbmN5KTtcbiAgICAgIHRoaXMuYWRkUGF5cGFsU2RrKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY3JlYXRlT3JkZXIoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpIHtcbiAgICBjb25zdCB7IGN1cnJlbmN5LCBvcHRpb25zLCBhbW91bnQsIHNoaXBwaW5nUHJlZmVyZW5jZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBhY3Rpb25zLm9yZGVyLmNyZWF0ZSh7XG4gICAgICBwdXJjaGFzZV91bml0czogW1xuICAgICAgICB7XG4gICAgICAgICAgYW1vdW50OiB7XG4gICAgICAgICAgICBjdXJyZW5jeV9jb2RlOiBjdXJyZW5jeSA/IGN1cnJlbmN5IDogb3B0aW9ucyAmJiBvcHRpb25zLmN1cnJlbmN5ID8gb3B0aW9ucy5jdXJyZW5jeSA6ICdVU0QnLFxuICAgICAgICAgICAgdmFsdWU6IGFtb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgYXBwbGljYXRpb25fY29udGV4dDoge1xuICAgICAgICBzaGlwcGluZ19wcmVmZXJlbmNlOiBzaGlwcGluZ1ByZWZlcmVuY2UsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgb25BcHByb3ZlKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSB7XG4gICAgcmV0dXJuIGFjdGlvbnMub3JkZXJcbiAgICAgIC5jYXB0dXJlKClcbiAgICAgIC50aGVuKChkZXRhaWxzKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uU3VjY2Vzcykge1xuICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uU3VjY2VzcyhkZXRhaWxzLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhdGNoRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jYXRjaEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgYW1vdW50LCBvblN1Y2Nlc3MsIGNyZWF0ZU9yZGVyLCBjcmVhdGVTdWJzY3JpcHRpb24sIG9uQXBwcm92ZSwgc3R5bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBpc1Nka1JlYWR5IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKCFpc1Nka1JlYWR5ICYmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB3aW5kb3cucGF5cGFsID09PSB1bmRlZmluZWQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcicpO1xuICAgIGNvbnNvbGUubG9nKCdvcHRpb25zLmNsaWVudElkJywgb3B0aW9ucy5jbGllbnRJZCk7XG5cbiAgICBjb25zdCBCdXR0b24gPSB3aW5kb3cucGF5cGFsLkJ1dHRvbnMuZHJpdmVyKCdyZWFjdCcsIHtcbiAgICAgIFJlYWN0LFxuICAgICAgUmVhY3RET00sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjcmVhdGVPcmRlckZuID1cbiAgICAgIGFtb3VudCAmJiAhY3JlYXRlT3JkZXJcbiAgICAgICAgPyAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IHRoaXMuY3JlYXRlT3JkZXIoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IGNyZWF0ZU9yZGVyKGRhdGEsIGFjdGlvbnMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxCdXR0b25cbiAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgIGNyZWF0ZU9yZGVyPXtjcmVhdGVTdWJzY3JpcHRpb24gPyB1bmRlZmluZWQgOiBjcmVhdGVPcmRlckZufVxuICAgICAgICBjcmVhdGVTdWJzY3JpcHRpb249e2NyZWF0ZVN1YnNjcmlwdGlvbn1cbiAgICAgICAgb25BcHByb3ZlPXtcbiAgICAgICAgICBvblN1Y2Nlc3NcbiAgICAgICAgICAgID8gKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiB0aGlzLm9uQXBwcm92ZShkYXRhLCBhY3Rpb25zKVxuICAgICAgICAgICAgOiAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IG9uQXBwcm92ZShkYXRhLCBhY3Rpb25zKVxuICAgICAgICB9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUGF5cGFsU2RrKCkge1xuICAgIGNvbnN0IHsgY3VycmVuY3ksIG9wdGlvbnMsIG9uQnV0dG9uUmVhZHkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBsb2FkZWRTY3JpcHQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zb2xlLmxvZygnbG9hZGVkU2NyaXB0JywgbG9hZGVkU2NyaXB0KTtcbiAgICBpZiAobG9hZGVkU2NyaXB0KSB7XG4gICAgICBsb2FkZWRTY3JpcHQucmVtb3ZlKCk7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLy8gcmVwbGFjaW5nIGNhbWVsQ2FzZSB3aXRoIGRhc2hlc1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBrXG4gICAgICAgIC5zcGxpdCgvKD89W0EtWl0pLylcbiAgICAgICAgLmpvaW4oJy0nKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYCR7bmFtZX09JHtvcHRpb25zW2tdfWApO1xuICAgIH0pO1xuXG4gICAgcXVlcnlQYXJhbXMucHVzaChgY3VycmVuY3k9JHtjdXJyZW5jeX1gKTtcbiAgICBjb25zb2xlLmxvZygncXVlcnlQYXJhbXMnLCBxdWVyeVBhcmFtcyk7XG5cbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSBgaHR0cHM6Ly93d3cucGF5cGFsLmNvbS9zZGsvanM/JHtxdWVyeVBhcmFtcy5qb2luKCcmJyl9YDtcbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNTZGtSZWFkeTogdHJ1ZSB9KTtcblxuICAgICAgaWYgKG9uQnV0dG9uUmVhZHkpIHtcbiAgICAgICAgb25CdXR0b25SZWFkeSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BheXBhbCBTREsgY291bGQgbm90IGJlIGxvYWRlZC4nKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRlZFNjcmlwdDogc2NyaXB0IH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IFBheVBhbEJ1dHRvbiB9O1xuIl19