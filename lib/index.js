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
    value: function shouldComponentUpdate(nextProps) {
      console.log('nextProps.currency', nextProps.currency, this.props.currency);

      if (nextProps.currency && this.props.currency && nextProps.currency != this.props.currency) {
        console.log('nextProps.currency', nextProps.currency);
        console.log('this.props.currency', this.props.currency);
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
      console.log('options.clientId', options.clientId);
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
      console.log('script', script);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUGF5UGFsQnV0dG9uIiwicHJvcHMiLCJzdGF0ZSIsImlzU2RrUmVhZHkiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJwYXlwYWwiLCJhZGRQYXlwYWxTZGsiLCJvbkJ1dHRvblJlYWR5IiwibmV4dFByb3BzIiwiY29uc29sZSIsImxvZyIsImN1cnJlbmN5IiwiZGF0YSIsImFjdGlvbnMiLCJvcHRpb25zIiwiYW1vdW50Iiwic2hpcHBpbmdQcmVmZXJlbmNlIiwib3JkZXIiLCJjcmVhdGUiLCJwdXJjaGFzZV91bml0cyIsImN1cnJlbmN5X2NvZGUiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiYXBwbGljYXRpb25fY29udGV4dCIsInNoaXBwaW5nX3ByZWZlcmVuY2UiLCJjYXB0dXJlIiwidGhlbiIsImRldGFpbHMiLCJvblN1Y2Nlc3MiLCJlcnIiLCJjYXRjaEVycm9yIiwiY3JlYXRlT3JkZXIiLCJjcmVhdGVTdWJzY3JpcHRpb24iLCJvbkFwcHJvdmUiLCJzdHlsZSIsIkJ1dHRvbiIsIkJ1dHRvbnMiLCJkcml2ZXIiLCJSZWFjdCIsIlJlYWN0RE9NIiwiY3JlYXRlT3JkZXJGbiIsImxvYWRlZFNjcmlwdCIsImNsaWVudElkIiwicmVtb3ZlIiwicXVlcnlQYXJhbXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImsiLCJuYW1lIiwic3BsaXQiLCJqb2luIiwidG9Mb3dlckNhc2UiLCJwdXNoIiwic2NyaXB0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsInNyYyIsImFzeW5jIiwib25sb2FkIiwic2V0U3RhdGUiLCJvbmVycm9yIiwiRXJyb3IiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJzdHJpbmciLCJmdW5jIiwib25FcnJvciIsIm9iamVjdCIsInNoYXBlIiwibWVyY2hhbnRJZCIsImludGVudCIsImNvbW1pdCIsImJvb2wiLCJ2YXVsdCIsImNvbXBvbmVudCIsImRpc2FibGVGdW5kaW5nIiwiZGlzYWJsZUNhcmQiLCJpbnRlZ3JhdGlvbkRhdGUiLCJsb2NhbGUiLCJidXllckNvdW50cnkiLCJkZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0Q01BLFk7Ozs7O0FBdUNKLHdCQUFZQyxLQUFaLEVBQXNDO0FBQUE7O0FBQUE7O0FBQ3BDLDhCQUFNQSxLQUFOO0FBRUEsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLFVBQVUsRUFBRTtBQURELEtBQWI7QUFIb0M7QUFNckM7Ozs7d0NBRW1CO0FBQ2xCLFVBQUksT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQ0EsTUFBTSxLQUFLQyxTQUE1QyxJQUF5REQsTUFBTSxDQUFDRSxNQUFQLEtBQWtCRCxTQUEvRSxFQUEwRjtBQUN4RixhQUFLRSxZQUFMO0FBQ0QsT0FGRCxNQUVPLElBQ0wsT0FBT0gsTUFBUCxLQUFrQixXQUFsQixJQUNBQSxNQUFNLEtBQUtDLFNBRFgsSUFFQUQsTUFBTSxDQUFDRSxNQUFQLEtBQWtCRCxTQUZsQixJQUdBLEtBQUtKLEtBQUwsQ0FBV08sYUFKTixFQUtMO0FBQ0EsYUFBS1AsS0FBTCxDQUFXTyxhQUFYO0FBQ0Q7QUFDRjs7OzBDQUVxQkMsUyxFQUFXO0FBQy9CQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ0YsU0FBUyxDQUFDRyxRQUE1QyxFQUFzRCxLQUFLWCxLQUFMLENBQVdXLFFBQWpFOztBQUNBLFVBQUlILFNBQVMsQ0FBQ0csUUFBVixJQUFzQixLQUFLWCxLQUFMLENBQVdXLFFBQWpDLElBQTZDSCxTQUFTLENBQUNHLFFBQVYsSUFBc0IsS0FBS1gsS0FBTCxDQUFXVyxRQUFsRixFQUE0RjtBQUMxRkYsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQVosRUFBa0NGLFNBQVMsQ0FBQ0csUUFBNUM7QUFDQUYsUUFB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dkJVLElBQUFBLFNBQVMsRUFBRWIsc0JBQVVHLE1BUEU7QUFRdkJXLElBQUFBLGNBQWMsRUFBRWQsc0JBQVVHLE1BUkg7QUFTdkJZLElBQUFBLFdBQVcsRUFBRWYsc0JBQVVHLE1BVEE7QUFVdkJhLElBQUFBLGVBQWUsRUFBRWhCLHNCQUFVRyxNQVZKO0FBV3ZCYyxJQUFBQSxNQUFNLEVBQUVqQixzQkFBVUcsTUFYSztBQVl2QmUsSUFBQUEsWUFBWSxFQUFFbEIsc0JBQVVHLE1BWkQ7QUFhdkJnQixJQUFBQSxLQUFLLEVBQUVuQixzQkFBVUMsU0FBVixDQUFvQixDQUFDRCxzQkFBVVcsSUFBWCxFQUFpQlgsc0JBQVVHLE1BQTNCLENBQXBCO0FBYmdCLEdBQWhCLENBWFE7QUEwQmpCL0QsRUFBQUEsYUFBYSxFQUFFNEQsc0JBQVVJO0FBMUJSLEM7O2dCQURmeEUsWSxrQkE4QmtCO0FBQ3BCbUMsRUFBQUEsS0FBSyxFQUFFLEVBRGE7QUFFcEJwQixFQUFBQSxPQUFPLEVBQUU7QUFDUDRCLElBQUFBLFFBQVEsRUFBRSxJQURIO0FBRVAvQixJQUFBQSxRQUFRLEVBQUU7QUFGSCxHQUZXO0FBTXBCSyxFQUFBQSxrQkFBa0IsRUFBRTtBQU5BLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIHBheXBhbDogYW55O1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5UGFsQnV0dG9uUHJvcHMge1xuICBhbW91bnQ/OiBudW1iZXIgfCBzdHJpbmc7XG4gIGN1cnJlbmN5PzogbnVtYmVyIHwgc3RyaW5nO1xuICBzaGlwcGluZ1ByZWZlcmVuY2U/OiAnTk9fU0hJUFBJTkcnIHwgJ0dFVF9GUk9NX0ZJTEUnIHwgJ1NFVF9QUk9WSURFRF9BRERSRVNTJztcbiAgb25TdWNjZXNzPzogRnVuY3Rpb247XG4gIGNhdGNoRXJyb3I/OiBGdW5jdGlvbjtcbiAgb25FcnJvcj86IEZ1bmN0aW9uO1xuICBjcmVhdGVPcmRlcj86IEZ1bmN0aW9uO1xuICBjcmVhdGVTdWJzY3JpcHRpb24/OiBGdW5jdGlvbjtcbiAgb25BcHByb3ZlPzogRnVuY3Rpb247XG4gIHN0eWxlPzogb2JqZWN0O1xuICBvcHRpb25zPzogUGF5cGFsT3B0aW9ucztcbiAgb25CdXR0b25SZWFkeT86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBheVBhbEJ1dHRvblN0YXRlIHtcbiAgaXNTZGtSZWFkeTogYm9vbGVhbjtcbiAgbG9hZGVkU2NyaXB0OiBIVE1MU2NyaXB0RWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXlwYWxPcHRpb25zIHtcbiAgY2xpZW50SWQ/OiBzdHJpbmc7XG4gIG1lcmNoYW50SWQ/OiBzdHJpbmc7XG4gIGN1cnJlbmN5PzogbnVtYmVyIHwgc3RyaW5nO1xuICBpbnRlbnQ/OiBzdHJpbmc7XG4gIGNvbW1pdD86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIHZhdWx0PzogYm9vbGVhbiB8IHN0cmluZztcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xuICBkaXNhYmxlRnVuZGluZz86IHN0cmluZztcbiAgZGlzYWJsZUNhcmQ/OiBzdHJpbmc7XG4gIGludGVncmF0aW9uRGF0ZT86IHN0cmluZztcbiAgbG9jYWxlPzogc3RyaW5nO1xuICBidXllckNvdW50cnk/OiBzdHJpbmc7XG4gIGRlYnVnPzogYm9vbGVhbiB8IHN0cmluZztcbn1cblxuY2xhc3MgUGF5UGFsQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFBheVBhbEJ1dHRvblByb3BzLCBQYXlQYWxCdXR0b25TdGF0ZT4ge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFtb3VudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIGN1cnJlbmN5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgc2hpcHBpbmdQcmVmZXJlbmNlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uU3VjY2VzczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2F0Y2hFcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY3JlYXRlT3JkZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNyZWF0ZVN1YnNjcmlwdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25BcHByb3ZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgY2xpZW50SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXJjaGFudElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgY3VycmVuY3k6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICAgIGludGVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGNvbW1pdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICAgIHZhdWx0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgZGlzYWJsZUZ1bmRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBkaXNhYmxlQ2FyZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGludGVncmF0aW9uRGF0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGJ1eWVyQ291bnRyeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGRlYnVnOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIH0pLFxuICAgIG9uQnV0dG9uUmVhZHk6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc3R5bGU6IHt9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGNsaWVudElkOiAnc2InLFxuICAgICAgY3VycmVuY3k6ICdVU0QnLFxuICAgIH0sXG4gICAgc2hpcHBpbmdQcmVmZXJlbmNlOiAnR0VUX0ZST01fRklMRScsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFBheVBhbEJ1dHRvblByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzU2RrUmVhZHk6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICE9PSB1bmRlZmluZWQgJiYgd2luZG93LnBheXBhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFkZFBheXBhbFNkaygpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgd2luZG93ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHdpbmRvdy5wYXlwYWwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdGhpcy5wcm9wcy5vbkJ1dHRvblJlYWR5XG4gICAgKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQnV0dG9uUmVhZHkoKTtcbiAgICB9XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ25leHRQcm9wcy5jdXJyZW5jeScsIG5leHRQcm9wcy5jdXJyZW5jeSwgdGhpcy5wcm9wcy5jdXJyZW5jeSk7XG4gICAgaWYgKG5leHRQcm9wcy5jdXJyZW5jeSAmJiB0aGlzLnByb3BzLmN1cnJlbmN5ICYmIG5leHRQcm9wcy5jdXJyZW5jeSAhPSB0aGlzLnByb3BzLmN1cnJlbmN5KSB7XG4gICAgICBjb25zb2xlLmxvZygnbmV4dFByb3BzLmN1cnJlbmN5JywgbmV4dFByb3BzLmN1cnJlbmN5KTtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGlzLnByb3BzLmN1cnJlbmN5JywgdGhpcy5wcm9wcy5jdXJyZW5jeSk7XG4gICAgICB0aGlzLmFkZFBheXBhbFNkaygpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNyZWF0ZU9yZGVyKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSB7XG4gICAgY29uc3QgeyBjdXJyZW5jeSwgb3B0aW9ucywgYW1vdW50LCBzaGlwcGluZ1ByZWZlcmVuY2UgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gYWN0aW9ucy5vcmRlci5jcmVhdGUoe1xuICAgICAgcHVyY2hhc2VfdW5pdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFtb3VudDoge1xuICAgICAgICAgICAgY3VycmVuY3lfY29kZTogY3VycmVuY3kgPyBjdXJyZW5jeSA6IG9wdGlvbnMgJiYgb3B0aW9ucy5jdXJyZW5jeSA/IG9wdGlvbnMuY3VycmVuY3kgOiAnVVNEJyxcbiAgICAgICAgICAgIHZhbHVlOiBhbW91bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGFwcGxpY2F0aW9uX2NvbnRleHQ6IHtcbiAgICAgICAgc2hpcHBpbmdfcHJlZmVyZW5jZTogc2hpcHBpbmdQcmVmZXJlbmNlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQXBwcm92ZShkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkge1xuICAgIHJldHVybiBhY3Rpb25zLm9yZGVyXG4gICAgICAuY2FwdHVyZSgpXG4gICAgICAudGhlbigoZGV0YWlscykgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Y2Nlc3MpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vblN1Y2Nlc3MoZGV0YWlscywgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXRjaEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2F0Y2hFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGFtb3VudCwgb25TdWNjZXNzLCBjcmVhdGVPcmRlciwgY3JlYXRlU3Vic2NyaXB0aW9uLCBvbkFwcHJvdmUsIHN0eWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaXNTZGtSZWFkeSB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmICghaXNTZGtSZWFkeSAmJiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgd2luZG93LnBheXBhbCA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ3JlbmRlcicpO1xuXG4gICAgY29uc3QgQnV0dG9uID0gd2luZG93LnBheXBhbC5CdXR0b25zLmRyaXZlcigncmVhY3QnLCB7XG4gICAgICBSZWFjdCxcbiAgICAgIFJlYWN0RE9NLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY3JlYXRlT3JkZXJGbiA9XG4gICAgICBhbW91bnQgJiYgIWNyZWF0ZU9yZGVyXG4gICAgICAgID8gKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiB0aGlzLmNyZWF0ZU9yZGVyKGRhdGEsIGFjdGlvbnMpXG4gICAgICAgIDogKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiBjcmVhdGVPcmRlcihkYXRhLCBhY3Rpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8QnV0dG9uXG4gICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICBjcmVhdGVPcmRlcj17Y3JlYXRlU3Vic2NyaXB0aW9uID8gdW5kZWZpbmVkIDogY3JlYXRlT3JkZXJGbn1cbiAgICAgICAgY3JlYXRlU3Vic2NyaXB0aW9uPXtjcmVhdGVTdWJzY3JpcHRpb259XG4gICAgICAgIG9uQXBwcm92ZT17XG4gICAgICAgICAgb25TdWNjZXNzXG4gICAgICAgICAgICA/IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gdGhpcy5vbkFwcHJvdmUoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgICAgIDogKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiBvbkFwcHJvdmUoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFkZFBheXBhbFNkaygpIHtcbiAgICBjb25zdCB7IGN1cnJlbmN5LCBvcHRpb25zLCBvbkJ1dHRvblJlYWR5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgbG9hZGVkU2NyaXB0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc29sZS5sb2coJ29wdGlvbnMuY2xpZW50SWQnLCBvcHRpb25zLmNsaWVudElkKTtcblxuICAgIGNvbnNvbGUubG9nKCdsb2FkZWRTY3JpcHQnLCBsb2FkZWRTY3JpcHQpO1xuICAgIGlmIChsb2FkZWRTY3JpcHQpIHtcbiAgICAgIGxvYWRlZFNjcmlwdC5yZW1vdmUoKTtcbiAgICB9XG4gICAgY29uc3QgcXVlcnlQYXJhbXM6IHN0cmluZ1tdID0gW107XG5cbiAgICAvLyByZXBsYWNpbmcgY2FtZWxDYXNlIHdpdGggZGFzaGVzXG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGtcbiAgICAgICAgLnNwbGl0KC8oPz1bQS1aXSkvKVxuICAgICAgICAuam9pbignLScpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgcXVlcnlQYXJhbXMucHVzaChgJHtuYW1lfT0ke29wdGlvbnNba119YCk7XG4gICAgfSk7XG5cbiAgICBxdWVyeVBhcmFtcy5wdXNoKGBjdXJyZW5jeT0ke2N1cnJlbmN5fWApO1xuICAgIGNvbnNvbGUubG9nKCdxdWVyeVBhcmFtcycsIHF1ZXJ5UGFyYW1zKTtcblxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgc2NyaXB0LnNyYyA9IGBodHRwczovL3d3dy5wYXlwYWwuY29tL3Nkay9qcz8ke3F1ZXJ5UGFyYW1zLmpvaW4oJyYnKX1gO1xuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc1Nka1JlYWR5OiB0cnVlIH0pO1xuXG4gICAgICBpZiAob25CdXR0b25SZWFkeSkge1xuICAgICAgICBvbkJ1dHRvblJlYWR5KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGF5cGFsIFNESyBjb3VsZCBub3QgYmUgbG9hZGVkLicpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgY29uc29sZS5sb2coJ3NjcmlwdCcsIHNjcmlwdCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGVkU2NyaXB0OiBzY3JpcHQgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGF5UGFsQnV0dG9uIH07XG4iXX0=