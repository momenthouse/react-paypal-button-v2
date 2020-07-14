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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUGF5UGFsQnV0dG9uIiwicHJvcHMiLCJzdGF0ZSIsImlzU2RrUmVhZHkiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJwYXlwYWwiLCJhZGRQYXlwYWxTZGsiLCJvbkJ1dHRvblJlYWR5IiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiY3VycmVuY3kiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImFjdGlvbnMiLCJvcHRpb25zIiwiYW1vdW50Iiwic2hpcHBpbmdQcmVmZXJlbmNlIiwib3JkZXIiLCJjcmVhdGUiLCJwdXJjaGFzZV91bml0cyIsImN1cnJlbmN5X2NvZGUiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiYXBwbGljYXRpb25fY29udGV4dCIsInNoaXBwaW5nX3ByZWZlcmVuY2UiLCJjYXB0dXJlIiwidGhlbiIsImRldGFpbHMiLCJvblN1Y2Nlc3MiLCJlcnIiLCJjYXRjaEVycm9yIiwiY3JlYXRlT3JkZXIiLCJjcmVhdGVTdWJzY3JpcHRpb24iLCJvbkFwcHJvdmUiLCJzdHlsZSIsIkJ1dHRvbiIsIkJ1dHRvbnMiLCJkcml2ZXIiLCJSZWFjdCIsIlJlYWN0RE9NIiwiY3JlYXRlT3JkZXJGbiIsImxvYWRlZFNjcmlwdCIsInJlbW92ZSIsInF1ZXJ5UGFyYW1zIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrIiwibmFtZSIsInNwbGl0Iiwiam9pbiIsInRvTG93ZXJDYXNlIiwicHVzaCIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJzcmMiLCJhc3luYyIsIm9ubG9hZCIsInNldFN0YXRlIiwib25lcnJvciIsIkVycm9yIiwiYm9keSIsImFwcGVuZENoaWxkIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwibnVtYmVyIiwic3RyaW5nIiwiZnVuYyIsIm9uRXJyb3IiLCJvYmplY3QiLCJzaGFwZSIsImNsaWVudElkIiwibWVyY2hhbnRJZCIsImludGVudCIsImNvbW1pdCIsImJvb2wiLCJ2YXVsdCIsImNvbXBvbmVudCIsImRpc2FibGVGdW5kaW5nIiwiZGlzYWJsZUNhcmQiLCJpbnRlZ3JhdGlvbkRhdGUiLCJsb2NhbGUiLCJidXllckNvdW50cnkiLCJkZWJ1ZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQ01BLFk7Ozs7O0FBdUNKLHdCQUFZQyxLQUFaLEVBQXNDO0FBQUE7O0FBQUE7O0FBQ3BDLDhCQUFNQSxLQUFOO0FBRUEsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLFVBQVUsRUFBRTtBQURELEtBQWI7QUFIb0M7QUFNckM7Ozs7d0NBRW1CO0FBQ2xCLFVBQUksT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQ0EsTUFBTSxLQUFLQyxTQUE1QyxJQUF5REQsTUFBTSxDQUFDRSxNQUFQLEtBQWtCRCxTQUEvRSxFQUEwRjtBQUN4RixhQUFLRSxZQUFMO0FBQ0QsT0FGRCxNQUVPLElBQ0wsT0FBT0gsTUFBUCxLQUFrQixXQUFsQixJQUNBQSxNQUFNLEtBQUtDLFNBRFgsSUFFQUQsTUFBTSxDQUFDRSxNQUFQLEtBQWtCRCxTQUZsQixJQUdBLEtBQUtKLEtBQUwsQ0FBV08sYUFKTixFQUtMO0FBQ0EsYUFBS1AsS0FBTCxDQUFXTyxhQUFYO0FBQ0Q7QUFDRjs7OzBDQUVxQkMsUyxFQUFXQyxTLEVBQVc7QUFDMUMsVUFBSUQsU0FBUyxDQUFDRSxRQUFWLElBQXNCRCxTQUFTLENBQUNDLFFBQWhDLElBQTRDRixTQUFTLENBQUNFLFFBQVYsSUFBc0JELFNBQVMsQ0FBQ0MsUUFBaEYsRUFBMEY7QUFDeEZDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaLEVBQWtDSixTQUFTLENBQUNFLFFBQTVDO0FBQ0FDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaLEVBQWtDSCxTQUFTLENBQUNDLFFBQTVDO0FBQ0EsYUFBS0osWUFBTDtBQUNBLGVBQU8sSUFB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M0IsQ0FBcEI7QUFiZ0IsR0FBaEIsQ0FYUTtBQTBCakIvRCxFQUFBQSxhQUFhLEVBQUU0RCxzQkFBVUk7QUExQlIsQzs7Z0JBRGZ4RSxZLGtCQThCa0I7QUFDcEJvQyxFQUFBQSxLQUFLLEVBQUUsRUFEYTtBQUVwQnBCLEVBQUFBLE9BQU8sRUFBRTtBQUNQNEQsSUFBQUEsUUFBUSxFQUFFLElBREg7QUFFUGpFLElBQUFBLFFBQVEsRUFBRTtBQUZILEdBRlc7QUFNcEJPLEVBQUFBLGtCQUFrQixFQUFFO0FBTkEsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgcGF5cGFsOiBhbnk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXlQYWxCdXR0b25Qcm9wcyB7XG4gIGFtb3VudD86IG51bWJlciB8IHN0cmluZztcbiAgY3VycmVuY3k/OiBudW1iZXIgfCBzdHJpbmc7XG4gIHNoaXBwaW5nUHJlZmVyZW5jZT86ICdOT19TSElQUElORycgfCAnR0VUX0ZST01fRklMRScgfCAnU0VUX1BST1ZJREVEX0FERFJFU1MnO1xuICBvblN1Y2Nlc3M/OiBGdW5jdGlvbjtcbiAgY2F0Y2hFcnJvcj86IEZ1bmN0aW9uO1xuICBvbkVycm9yPzogRnVuY3Rpb247XG4gIGNyZWF0ZU9yZGVyPzogRnVuY3Rpb247XG4gIGNyZWF0ZVN1YnNjcmlwdGlvbj86IEZ1bmN0aW9uO1xuICBvbkFwcHJvdmU/OiBGdW5jdGlvbjtcbiAgc3R5bGU/OiBvYmplY3Q7XG4gIG9wdGlvbnM/OiBQYXlwYWxPcHRpb25zO1xuICBvbkJ1dHRvblJlYWR5PzogRnVuY3Rpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5UGFsQnV0dG9uU3RhdGUge1xuICBpc1Nka1JlYWR5OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBheXBhbE9wdGlvbnMge1xuICBjbGllbnRJZD86IHN0cmluZztcbiAgbWVyY2hhbnRJZD86IHN0cmluZztcbiAgY3VycmVuY3k/OiBudW1iZXIgfCBzdHJpbmc7XG4gIGludGVudD86IHN0cmluZztcbiAgY29tbWl0PzogYm9vbGVhbiB8IHN0cmluZztcbiAgdmF1bHQ/OiBib29sZWFuIHwgc3RyaW5nO1xuICBjb21wb25lbnQ/OiBzdHJpbmc7XG4gIGRpc2FibGVGdW5kaW5nPzogc3RyaW5nO1xuICBkaXNhYmxlQ2FyZD86IHN0cmluZztcbiAgaW50ZWdyYXRpb25EYXRlPzogc3RyaW5nO1xuICBsb2NhbGU/OiBzdHJpbmc7XG4gIGJ1eWVyQ291bnRyeT86IHN0cmluZztcbiAgZGVidWc/OiBib29sZWFuIHwgc3RyaW5nO1xufVxuXG5jbGFzcyBQYXlQYWxCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UGF5UGFsQnV0dG9uUHJvcHMsIFBheVBhbEJ1dHRvblN0YXRlPiB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYW1vdW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgY3VycmVuY3k6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICBzaGlwcGluZ1ByZWZlcmVuY2U6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25TdWNjZXNzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjYXRjaEVycm9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVycm9yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjcmVhdGVPcmRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY3JlYXRlU3Vic2NyaXB0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkFwcHJvdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBjbGllbnRJZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIG1lcmNoYW50SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBjdXJyZW5jeTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgICAgaW50ZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgY29tbWl0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgICAgdmF1bHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgICBjb21wb25lbnQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBkaXNhYmxlRnVuZGluZzogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGRpc2FibGVDYXJkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgaW50ZWdyYXRpb25EYXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgYnV5ZXJDb3VudHJ5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgZGVidWc6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgfSksXG4gICAgb25CdXR0b25SZWFkeTogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBzdHlsZToge30sXG4gICAgb3B0aW9uczoge1xuICAgICAgY2xpZW50SWQ6ICdzYicsXG4gICAgICBjdXJyZW5jeTogJ1VTRCcsXG4gICAgfSxcbiAgICBzaGlwcGluZ1ByZWZlcmVuY2U6ICdHRVRfRlJPTV9GSUxFJyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUGF5UGFsQnV0dG9uUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNTZGtSZWFkeTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgIT09IHVuZGVmaW5lZCAmJiB3aW5kb3cucGF5cGFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuYWRkUGF5cGFsU2RrKCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB3aW5kb3cgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgd2luZG93LnBheXBhbCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICB0aGlzLnByb3BzLm9uQnV0dG9uUmVhZHlcbiAgICApIHtcbiAgICAgIHRoaXMucHJvcHMub25CdXR0b25SZWFkeSgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIGlmIChuZXh0UHJvcHMuY3VycmVuY3kgJiYgbmV4dFN0YXRlLmN1cnJlbmN5ICYmIG5leHRQcm9wcy5jdXJyZW5jeSAhPSBuZXh0U3RhdGUuY3VycmVuY3kpIHtcbiAgICAgIGNvbnNvbGUubG9nKCduZXh0UHJvcHMuY3VycmVuY3knLCBuZXh0UHJvcHMuY3VycmVuY3kpO1xuICAgICAgY29uc29sZS5sb2coJ25leHRTdGF0ZS5jdXJyZW5jeScsIG5leHRTdGF0ZS5jdXJyZW5jeSk7XG4gICAgICB0aGlzLmFkZFBheXBhbFNkaygpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNyZWF0ZU9yZGVyKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSB7XG4gICAgY29uc3QgeyBjdXJyZW5jeSwgb3B0aW9ucywgYW1vdW50LCBzaGlwcGluZ1ByZWZlcmVuY2UgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gYWN0aW9ucy5vcmRlci5jcmVhdGUoe1xuICAgICAgcHVyY2hhc2VfdW5pdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFtb3VudDoge1xuICAgICAgICAgICAgY3VycmVuY3lfY29kZTogY3VycmVuY3kgPyBjdXJyZW5jeSA6IG9wdGlvbnMgJiYgb3B0aW9ucy5jdXJyZW5jeSA/IG9wdGlvbnMuY3VycmVuY3kgOiAnVVNEJyxcbiAgICAgICAgICAgIHZhbHVlOiBhbW91bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGFwcGxpY2F0aW9uX2NvbnRleHQ6IHtcbiAgICAgICAgc2hpcHBpbmdfcHJlZmVyZW5jZTogc2hpcHBpbmdQcmVmZXJlbmNlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQXBwcm92ZShkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkge1xuICAgIHJldHVybiBhY3Rpb25zLm9yZGVyXG4gICAgICAuY2FwdHVyZSgpXG4gICAgICAudGhlbigoZGV0YWlscykgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Y2Nlc3MpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vblN1Y2Nlc3MoZGV0YWlscywgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXRjaEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2F0Y2hFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGFtb3VudCwgb25TdWNjZXNzLCBjcmVhdGVPcmRlciwgY3JlYXRlU3Vic2NyaXB0aW9uLCBvbkFwcHJvdmUsIHN0eWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaXNTZGtSZWFkeSB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmICghaXNTZGtSZWFkeSAmJiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgd2luZG93LnBheXBhbCA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgQnV0dG9uID0gd2luZG93LnBheXBhbC5CdXR0b25zLmRyaXZlcigncmVhY3QnLCB7XG4gICAgICBSZWFjdCxcbiAgICAgIFJlYWN0RE9NLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY3JlYXRlT3JkZXJGbiA9XG4gICAgICBhbW91bnQgJiYgIWNyZWF0ZU9yZGVyXG4gICAgICAgID8gKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiB0aGlzLmNyZWF0ZU9yZGVyKGRhdGEsIGFjdGlvbnMpXG4gICAgICAgIDogKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiBjcmVhdGVPcmRlcihkYXRhLCBhY3Rpb25zKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8QnV0dG9uXG4gICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICBjcmVhdGVPcmRlcj17Y3JlYXRlU3Vic2NyaXB0aW9uID8gdW5kZWZpbmVkIDogY3JlYXRlT3JkZXJGbn1cbiAgICAgICAgY3JlYXRlU3Vic2NyaXB0aW9uPXtjcmVhdGVTdWJzY3JpcHRpb259XG4gICAgICAgIG9uQXBwcm92ZT17XG4gICAgICAgICAgb25TdWNjZXNzXG4gICAgICAgICAgICA/IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gdGhpcy5vbkFwcHJvdmUoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgICAgIDogKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSA9PiBvbkFwcHJvdmUoZGF0YSwgYWN0aW9ucylcbiAgICAgICAgfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFkZFBheXBhbFNkaygpIHtcbiAgICBjb25zdCB7IGN1cnJlbmN5LCBvcHRpb25zLCBvbkJ1dHRvblJlYWR5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgbG9hZGVkU2NyaXB0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc29sZS5sb2coJ2xvYWRlZFNjcmlwdCcsIGxvYWRlZFNjcmlwdCk7XG4gICAgaWYgKGxvYWRlZFNjcmlwdCkge1xuICAgICAgbG9hZGVkU2NyaXB0LnJlbW92ZSgpO1xuICAgIH1cbiAgICBjb25zdCBxdWVyeVBhcmFtczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vIHJlcGxhY2luZyBjYW1lbENhc2Ugd2l0aCBkYXNoZXNcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga1xuICAgICAgICAuc3BsaXQoLyg/PVtBLVpdKS8pXG4gICAgICAgIC5qb2luKCctJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICBxdWVyeVBhcmFtcy5wdXNoKGAke25hbWV9PSR7b3B0aW9uc1trXX1gKTtcbiAgICB9KTtcblxuICAgIHF1ZXJ5UGFyYW1zLnB1c2goYGN1cnJlbmN5PSR7Y3VycmVuY3l9YCk7XG5cbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSBgaHR0cHM6Ly93d3cucGF5cGFsLmNvbS9zZGsvanM/JHtxdWVyeVBhcmFtcy5qb2luKCcmJyl9YDtcbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNTZGtSZWFkeTogdHJ1ZSB9KTtcblxuICAgICAgaWYgKG9uQnV0dG9uUmVhZHkpIHtcbiAgICAgICAgb25CdXR0b25SZWFkeSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BheXBhbCBTREsgY291bGQgbm90IGJlIGxvYWRlZC4nKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRlZFNjcmlwdDogc2NyaXB0IH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IFBheVBhbEJ1dHRvbiB9O1xuIl19