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
        this.addPaypalSdk();
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
    value: function addPaypalSdk() {
      var _this4 = this;

      var _this$props3 = this.props,
          options = _this$props3.options,
          onButtonReady = _this$props3.onButtonReady;
      var loadedScript = this.state.loadedScript;
      console.log('options.clientId', options.clientId);
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.getScriptSrc();
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
    value: function getScriptSrc() {
      var _this$props4 = this.props,
          currency = _this$props4.currency,
          options = _this$props4.options;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUGF5UGFsQnV0dG9uIiwicHJvcHMiLCJzdGF0ZSIsImlzU2RrUmVhZHkiLCJsb2FkZWRTY3JpcHQiLCJ3aW5kb3ciLCJ1bmRlZmluZWQiLCJwYXlwYWwiLCJhZGRQYXlwYWxTZGsiLCJvbkJ1dHRvblJlYWR5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0U2NyaXB0U3JjIiwibmV4dFByb3BzIiwiY3VycmVuY3kiLCJkYXRhIiwiYWN0aW9ucyIsIm9wdGlvbnMiLCJhbW91bnQiLCJzaGlwcGluZ1ByZWZlcmVuY2UiLCJvcmRlciIsImNyZWF0ZSIsInB1cmNoYXNlX3VuaXRzIiwiY3VycmVuY3lfY29kZSIsInZhbHVlIiwidG9TdHJpbmciLCJhcHBsaWNhdGlvbl9jb250ZXh0Iiwic2hpcHBpbmdfcHJlZmVyZW5jZSIsImNhcHR1cmUiLCJ0aGVuIiwiZGV0YWlscyIsIm9uU3VjY2VzcyIsImVyciIsImNhdGNoRXJyb3IiLCJjcmVhdGVPcmRlciIsImNyZWF0ZVN1YnNjcmlwdGlvbiIsIm9uQXBwcm92ZSIsInN0eWxlIiwiQnV0dG9uIiwiQnV0dG9ucyIsImRyaXZlciIsIlJlYWN0IiwiUmVhY3RET00iLCJjcmVhdGVPcmRlckZuIiwiY29uc29sZSIsImxvZyIsImNsaWVudElkIiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJzcmMiLCJhc3luYyIsIm9ubG9hZCIsInNldFN0YXRlIiwib25lcnJvciIsIkVycm9yIiwiYm9keSIsImFwcGVuZENoaWxkIiwicXVlcnlQYXJhbXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImsiLCJuYW1lIiwic3BsaXQiLCJqb2luIiwidG9Mb3dlckNhc2UiLCJwdXNoIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwibnVtYmVyIiwic3RyaW5nIiwiZnVuYyIsIm9uRXJyb3IiLCJvYmplY3QiLCJzaGFwZSIsIm1lcmNoYW50SWQiLCJpbnRlbnQiLCJjb21taXQiLCJib29sIiwidmF1bHQiLCJjb21wb25lbnQiLCJkaXNhYmxlRnVuZGluZyIsImRpc2FibGVDYXJkIiwiaW50ZWdyYXRpb25EYXRlIiwibG9jYWxlIiwiYnV5ZXJDb3VudHJ5IiwiZGVidWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNENNQSxZOzs7OztBQXVDSix3QkFBWUMsS0FBWixFQUFzQztBQUFBOztBQUFBOztBQUNwQyw4QkFBTUEsS0FBTjtBQUVBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxVQUFVLEVBQUUsS0FERDtBQUVYQyxNQUFBQSxZQUFZLEVBQUU7QUFGSCxLQUFiO0FBSG9DO0FBT3JDOzs7O3dDQUVtQjtBQUNsQixVQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNBLE1BQU0sS0FBS0MsU0FBNUMsSUFBeURELE1BQU0sQ0FBQ0UsTUFBUCxLQUFrQkQsU0FBL0UsRUFBMEY7QUFDeEYsYUFBS0UsWUFBTDtBQUNELE9BRkQsTUFFTyxJQUNMLE9BQU9ILE1BQVAsS0FBa0IsV0FBbEIsSUFDQUEsTUFBTSxLQUFLQyxTQURYLElBRUFELE1BQU0sQ0FBQ0UsTUFBUCxLQUFrQkQsU0FGbEIsSUFHQSxLQUFLTCxLQUFMLENBQVdRLGFBSk4sRUFLTDtBQUNBLFlBQUksQ0FBQ0MsUUFBUSxDQUFDQyxhQUFULHVCQUFzQyxLQUFLQyxZQUFMLEVBQXRDLFFBQUwsRUFBcUU7QUFDbkUsZUFBS0osWUFBTDtBQUNELFNBRkQsTUFFTztBQUNMLGVBQUtQLEtBQUwsQ0FBV1EsYUFBWDtBQUNEO0FBQ0Y7QUFDRjs7OzBDQUVxQkksUyxFQUFXO0FBQUEsVUFDdkJULFlBRHVCLEdBQ04sS0FBS0YsS0FEQyxDQUN2QkUsWUFEdUI7O0FBRS9CLFVBQUlTLFNBQVMsQ0FBQ0MsUUFBVixJQUFzQixLQUFLYixLQUFMLENBQVdhLFFBQWpDLElBQTZDRCxTQUFTLENBQUNDLFFBQVYsSUFBc0IsS0FBS2IsS0FBTCxDQUFXYSxRQUFsRixFQUE0RjtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBS04sWUFBTDtBQUNEOztBQUNELGFBQU8sSUFBUDtBQUNEOzs7Z0NBRVdPLEksRUFBV0MsTyxFQUFjO0FBQUEsd0JBQ3VCLEtBQUtmLEtBRDVCO0FBQUEsVUFDM0JhLFFBRDJCLGVBQzNCQSxRQUQyQjtBQUFBLFVBQ2pCRyxPQURpQixlQUNqQkEsT0FEaUI7QUFBQSxVQUNSQyxNQURRLGVBQ1JBLE1BRFE7QUFBQSxVQUNBQyxrQkFEQSxlQUNBQSxrQkFEQTtBQUduQyxhQUFPSCxPQUFPLENBQUNJLEtBQVIsQ0FBY0MsTUFBZCxDQUFxQjtBQUMxQkMsUUFBQUEsY0FBYyxFQUFFLENBQ2Q7QUFDRUosVUFBQUEsTUFBTSxFQUFFO0FBQ05LLFlBQUFBLGFBQWEsRUFBRVQsUUFBUSxHQUFHQSxRQUFILEdBQWNHLE9BQU8sSUFBSUEsT0FBTyxDQUFDSCxRQUFuQixHQUE4QkcsT0FBTyxDQUFDSCxRQUF0QyxHQUFpRCxLQURoRjtBQUVOVSxZQUFBQSxLQUFLLEVBQUVOLE1BQU0sQ0FBQ08sUUFBUDtBQUZEO0FBRFYsU0FEYyxDQURVO0FBUzFCQyxRQUFBQSxtQkFBbUIsRUFBRTtBQUNuQkMsVUFBQUEsbUJBQW1CLEVBQUVSO0FBREY7QUFUSyxPQUFyQixDQUFQO0FBYUQ7Ozs4QkFFU0osSSxFQUFXQyxPLEVBQWM7QUFBQTs7QUFDakMsYUFBT0EsT0FBTyxDQUFDSSxLQUFSLENBQ0pRLE9BREksR0FFSkMsSUFGSSxDQUVDLFVBQUNDLE9BQUQsRUFBYTtBQUNqQixZQUFJLE1BQUksQ0FBQzdCLEtBQUwsQ0FBVzhCLFNBQWYsRUFBMEI7QUFDeEIsaUJBQU8sTUFBSSxDQUFDOUIsS0FBTCxDQUFXOEIsU0FBWCxDQUFxQkQsT0FBckIsRUFBOEJmLElBQTlCLENBQVA7QUFDRDtBQUNGLE9BTkksV0FPRSxVQUFDaUIsR0FBRCxFQUFTO0FBQ2QsWUFBSSxNQUFJLENBQUMvQixLQUFMLENBQVdnQyxVQUFmLEVBQTJCO0FBQ3pCLGlCQUFPLE1BQUksQ0FBQ2hDLEtBQUwsQ0FBV2dDLFVBQVgsQ0FBc0JELEdBQXRCLENBQVA7QUFDRDtBQUNGLE9BWEksQ0FBUDtBQVlEOzs7NkJBRVE7QUFBQTs7QUFBQSx5QkFDMEUsS0FBSy9CLEtBRC9FO0FBQUEsVUFDQ2lCLE1BREQsZ0JBQ0NBLE1BREQ7QUFBQSxVQUNTYSxTQURULGdCQUNTQSxTQURUO0FBQUEsVUFDb0JHLFdBRHBCLGdCQUNvQkEsV0FEcEI7QUFBQSxVQUNpQ0Msa0JBRGpDLGdCQUNpQ0Esa0JBRGpDO0FBQUEsVUFDcURDLFNBRHJELGdCQUNxREEsU0FEckQ7QUFBQSxVQUNnRUMsS0FEaEUsZ0JBQ2dFQSxLQURoRTtBQUFBLFVBRUNsQyxVQUZELEdBRWdCLEtBQUtELEtBRnJCLENBRUNDLFVBRkQ7O0FBSVAsVUFBSSxPQUFPRSxNQUFQLEtBQWtCLFdBQWxCLElBQWlDQSxNQUFNLENBQUNFLE1BQVAsS0FBa0JELFNBQXZELEVBQWtFO0FBQ2hFLGVBQU8sSUFBUDtBQUNEOztBQUVELFVBQU1nQyxNQUFNLEdBQUdqQyxNQUFNLENBQUNFLE1BQVAsQ0FBY2dDLE9BQWQsQ0FBc0JDLE1BQXRCLENBQTZCLE9BQTdCLEVBQXNDO0FBQ25EQyxRQUFBQSxLQUFLLEVBQUxBLGlCQURtRDtBQUVuREMsUUFBQUEsUUFBUSxFQUFSQTtBQUZtRCxPQUF0QyxDQUFmO0FBS0EsVUFBTUMsYUFBYSxHQUNqQnpCLE1BQU0sSUFBSSxDQUFDZ0IsV0FBWCxHQUNJLFVBQUNuQixJQUFELEVBQVlDLE9BQVo7QUFBQSxlQUE2QixNQUFJLENBQUNrQixXQUFMLENBQWlCbkIsSUFBakIsRUFBdUJDLE9BQXZCLENBQTdCO0FBQUEsT0FESixHQUVJLFVBQUNELElBQUQsRUFBWUMsT0FBWjtBQUFBLGVBQTZCa0IsV0FBVyxDQUFDbkIsSUFBRCxFQUFPQyxPQUFQLENBQXhDO0FBQUEsT0FITjtBQUtBLDBCQUNFLGdDQUFDLE1BQUQsZUFDTSxLQUFLZixLQURYO0FBRUUsUUFBQSxXQUFXLEVBQUVrQyxrQkFBa0IsR0FBRzdCLFNBQUgsR0FBZXFDLGFBRmhEO0FBR0UsUUFBQSxrQkFBa0IsRUFBRVIsa0JBSHRCO0FBSUUsUUFBQSxTQUFTLEVBQ1BKLFNBQVMsR0FDTCxVQUFDaEIsSUFBRCxFQUFZQyxPQUFaO0FBQUEsaUJBQTZCLE1BQUksQ0FBQ29CLFNBQUwsQ0FBZXJCLElBQWYsRUFBcUJDLE9BQXJCLENBQTdCO0FBQUEsU0FESyxHQUVMLFVBQUNELElBQUQsRUFBWUMsT0FBWjtBQUFBLGlCQUE2Qm9CLFNBQVMsQ0FBQ3JCLElBQUQsRUFBT0MsT0FBUCxDQUF0QztBQUFBLFNBUFI7QUFTRSxRQUFBLEtBQUssRUFBRXFCO0FBVFQsU0FERjtBQWFEOzs7bUNBRXNCO0FBQUE7O0FBQUEseUJBQ2MsS0FBS3BDLEtBRG5CO0FBQUEsVUFDYmdCLE9BRGEsZ0JBQ2JBLE9BRGE7QUFBQSxVQUNKUixhQURJLGdCQUNKQSxhQURJO0FBQUEsVUFFYkwsWUFGYSxHQUVJLEtBQUtGLEtBRlQsQ0FFYkUsWUFGYTtBQUlyQndDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaLEVBQWdDNUIsT0FBTyxDQUFDNkIsUUFBeEM7QUFFQSxVQUFNQyxNQUFNLEdBQUdyQyxRQUFRLENBQUNzQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQUQsTUFBQUEsTUFBTSxDQUFDRSxJQUFQLEdBQWMsaUJBQWQ7QUFDQUYsTUFBQUEsTUFBTSxDQUFDRyxHQUFQLEdBQWEsS0FBS3RDLFlBQUwsRUFBYjtBQUNBbUMsTUFBQUEsTUFBTSxDQUFDSSxLQUFQLEdBQWUsSUFBZjs7QUFDQUosTUFBQUEsTUFBTSxDQUFDSyxNQUFQLEdBQWdCLFlBQU07QUFDcEIsUUFBQSxNQUFJLENBQUNDLFFBQUwsQ0FBYztBQUFFbEQsVUFBQUEsVUFBVSxFQUFFO0FBQWQsU0FBZDs7QUFFQSxZQUFJTSxhQUFKLEVBQW1CO0FBQ2pCQSxVQUFBQSxhQUFhO0FBQ2Q7QUFDRixPQU5EOztBQU9Bc0MsTUFBQUEsTUFBTSxDQUFDTyxPQUFQLEdBQWlCLFlBQU07QUFDckIsY0FBTSxJQUFJQyxLQUFKLENBQVUsaUNBQVYsQ0FBTjtBQUNELE9BRkQ7O0FBSUE3QyxNQUFBQSxRQUFRLENBQUM4QyxJQUFULENBQWNDLFdBQWQsQ0FBMEJWLE1BQTFCO0FBRUEsV0FBS00sUUFBTCxDQUFjO0FBQUVqRCxRQUFBQSxZQUFZLEVBQUUyQztBQUFoQixPQUFkO0FBQ0Q7OzttQ0FFc0I7QUFBQSx5QkFDUyxLQUFLOUMsS0FEZDtBQUFBLFVBQ2JhLFFBRGEsZ0JBQ2JBLFFBRGE7QUFBQSxVQUNIRyxPQURHLGdCQUNIQSxPQURHO0FBR3JCLFVBQU15QyxXQUFxQixHQUFHLEVBQTlCLENBSHFCLENBS3JCOztBQUNBQyxNQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWTNDLE9BQVosRUFBcUI0QyxPQUFyQixDQUE2QixVQUFDQyxDQUFELEVBQU87QUFDbEMsWUFBTUMsSUFBSSxHQUFHRCxDQUFDLENBQ1hFLEtBRFUsQ0FDSixXQURJLEVBRVZDLElBRlUsQ0FFTCxHQUZLLEVBR1ZDLFdBSFUsRUFBYjtBQUlBUixRQUFBQSxXQUFXLENBQUNTLElBQVosV0FBb0JKLElBQXBCLGNBQTRCOUMsT0FBTyxDQUFDNkMsQ0FBRCxDQUFuQztBQUNELE9BTkQ7QUFRQUosTUFBQUEsV0FBVyxDQUFDUyxJQUFaLG9CQUE2QnJELFFBQTdCO0FBRUEscURBQXdDNEMsV0FBVyxDQUFDTyxJQUFaLENBQWlCLEdBQWpCLENBQXhDO0FBQ0Q7Ozs7RUEzTHdCeEIsa0JBQU0yQixTOzs7O2dCQUEzQnBFLFksZUFDZTtBQUNqQmtCLEVBQUFBLE1BQU0sRUFBRW1ELHNCQUFVQyxTQUFWLENBQW9CLENBQUNELHNCQUFVRSxNQUFYLEVBQW1CRixzQkFBVUcsTUFBN0IsQ0FBcEIsQ0FEUztBQUVqQjFELEVBQUFBLFFBQVEsRUFBRXVELHNCQUFVQyxTQUFWLENBQW9CLENBQUNELHNCQUFVRSxNQUFYLEVBQW1CRixzQkFBVUcsTUFBN0IsQ0FBcEIsQ0FGTztBQUdqQnJELEVBQUFBLGtCQUFrQixFQUFFa0Qsc0JBQVVHLE1BSGI7QUFJakJ6QyxFQUFBQSxTQUFTLEVBQUVzQyxzQkFBVUksSUFKSjtBQUtqQnhDLEVBQUFBLFVBQVUsRUFBRW9DLHNCQUFVSSxJQUxMO0FBTWpCQyxFQUFBQSxPQUFPLEVBQUVMLHNCQUFVSSxJQU5GO0FBT2pCdkMsRUFBQUEsV0FBVyxFQUFFbUMsc0JBQVVJLElBUE47QUFRakJ0QyxFQUFBQSxrQkFBa0IsRUFBRWtDLHNCQUFVSSxJQVJiO0FBU2pCckMsRUFBQUEsU0FBUyxFQUFFaUMsc0JBQVVJLElBVEo7QUFVakJwQyxFQUFBQSxLQUFLLEVBQUVnQyxzQkFBVU0sTUFWQTtBQVdqQjFELEVBQUFBLE9BQU8sRUFBRW9ELHNCQUFVTyxLQUFWLENBQWdCO0FBQ3ZCOUIsSUFBQUEsUUFBUSxFQUFFdUIsc0JBQVVHLE1BREc7QUFFdkJLLElBQUFBLFVBQVUsRUFBRVIsc0JBQVVHLE1BRkM7QUFHdkIxRCxJQUFBQSxRQUFRLEVBQUV1RCxzQkFBVUMsU0FBVixDQUFvQixDQUFDRCxzQkFBVUUsTUFBWCxFQUFtQkYsc0JBQVVHLE1BQTdCLENBQXBCLENBSGE7QUFJdkJNLElBQUFBLE1BQU0sRUFBRVQsc0JBQVVHLE1BSks7QUFLdkJPLElBQUFBLE1BQU0sRUFBRVYsc0JBQVVDLFNBQVYsQ0FBb0IsQ0FBQ0Qsc0JBQVVXLElBQVgsRUFBaUJYLHNCQUFVRyxNQUEzQixDQUFwQixDQUxlO0FBTXZCUyxJQUFBQSxLQUFLLEVBQUVaLHNCQUFVQyxTQUFWLENBQW9CLENBQUNELHNCQUFVVyxJQUFYLEVBQWlCWCxzQkFBVUcsTUFBM0IsQ0FBcEIsQ0FOZ0I7QUFPdkJVLElBQUFBLFNBQVMsRUFBRWIsc0JBQVVHLE1BUEU7QUFRdkJXLElBQUFBLGNBQWMsRUFBRWQsc0JBQVVHLE1BUkg7QUFTdkJZLElBQUFBLFdBQVcsRUFBRWYsc0JBQVVHLE1BVEE7QUFVdkJhLElBQUFBLGVBQWUsRUFBRWhCLHNCQUFVRyxNQVZKO0FBV3ZCYyxJQUFBQSxNQUFNLEVBQUVqQixzQkFBVUcsTUFYSztBQVl2QmUsSUFBQUEsWUFBWSxFQUFFbEIsc0JBQVVHLE1BWkQ7QUFhdkJnQixJQUFBQSxLQUFLLEVBQUVuQixzQkFBVUMsU0FBVixDQUFvQixDQUFDRCxzQkFBVVcsSUFBWCxFQUFpQlgsc0JBQVVHLE1BQTNCLENBQXBCO0FBYmdCLEdBQWhCLENBWFE7QUEwQmpCL0QsRUFBQUEsYUFBYSxFQUFFNEQsc0JBQVVJO0FBMUJSLEM7O2dCQURmekUsWSxrQkE4QmtCO0FBQ3BCcUMsRUFBQUEsS0FBSyxFQUFFLEVBRGE7QUFFcEJwQixFQUFBQSxPQUFPLEVBQUU7QUFDUDZCLElBQUFBLFFBQVEsRUFBRSxJQURIO0FBRVBoQyxJQUFBQSxRQUFRLEVBQUU7QUFGSCxHQUZXO0FBTXBCSyxFQUFBQSxrQkFBa0IsRUFBRTtBQU5BLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIHBheXBhbDogYW55O1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5UGFsQnV0dG9uUHJvcHMge1xuICBhbW91bnQ/OiBudW1iZXIgfCBzdHJpbmc7XG4gIGN1cnJlbmN5PzogbnVtYmVyIHwgc3RyaW5nO1xuICBzaGlwcGluZ1ByZWZlcmVuY2U/OiAnTk9fU0hJUFBJTkcnIHwgJ0dFVF9GUk9NX0ZJTEUnIHwgJ1NFVF9QUk9WSURFRF9BRERSRVNTJztcbiAgb25TdWNjZXNzPzogRnVuY3Rpb247XG4gIGNhdGNoRXJyb3I/OiBGdW5jdGlvbjtcbiAgb25FcnJvcj86IEZ1bmN0aW9uO1xuICBjcmVhdGVPcmRlcj86IEZ1bmN0aW9uO1xuICBjcmVhdGVTdWJzY3JpcHRpb24/OiBGdW5jdGlvbjtcbiAgb25BcHByb3ZlPzogRnVuY3Rpb247XG4gIHN0eWxlPzogb2JqZWN0O1xuICBvcHRpb25zPzogUGF5cGFsT3B0aW9ucztcbiAgb25CdXR0b25SZWFkeT86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBheVBhbEJ1dHRvblN0YXRlIHtcbiAgaXNTZGtSZWFkeTogYm9vbGVhbjtcbiAgbG9hZGVkU2NyaXB0OiBIVE1MU2NyaXB0RWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXlwYWxPcHRpb25zIHtcbiAgY2xpZW50SWQ/OiBzdHJpbmc7XG4gIG1lcmNoYW50SWQ/OiBzdHJpbmc7XG4gIGN1cnJlbmN5PzogbnVtYmVyIHwgc3RyaW5nO1xuICBpbnRlbnQ/OiBzdHJpbmc7XG4gIGNvbW1pdD86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIHZhdWx0PzogYm9vbGVhbiB8IHN0cmluZztcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xuICBkaXNhYmxlRnVuZGluZz86IHN0cmluZztcbiAgZGlzYWJsZUNhcmQ/OiBzdHJpbmc7XG4gIGludGVncmF0aW9uRGF0ZT86IHN0cmluZztcbiAgbG9jYWxlPzogc3RyaW5nO1xuICBidXllckNvdW50cnk/OiBzdHJpbmc7XG4gIGRlYnVnPzogYm9vbGVhbiB8IHN0cmluZztcbn1cblxuY2xhc3MgUGF5UGFsQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFBheVBhbEJ1dHRvblByb3BzLCBQYXlQYWxCdXR0b25TdGF0ZT4ge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGFtb3VudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIGN1cnJlbmN5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSksXG4gICAgc2hpcHBpbmdQcmVmZXJlbmNlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG9uU3VjY2VzczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2F0Y2hFcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY3JlYXRlT3JkZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNyZWF0ZVN1YnNjcmlwdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25BcHByb3ZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgY2xpZW50SWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBtZXJjaGFudElkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgY3VycmVuY3k6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICAgIGludGVudDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGNvbW1pdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICAgIHZhdWx0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgZGlzYWJsZUZ1bmRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBkaXNhYmxlQ2FyZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGludGVncmF0aW9uRGF0ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGJ1eWVyQ291bnRyeTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGRlYnVnOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIH0pLFxuICAgIG9uQnV0dG9uUmVhZHk6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc3R5bGU6IHt9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGNsaWVudElkOiAnc2InLFxuICAgICAgY3VycmVuY3k6ICcnLFxuICAgIH0sXG4gICAgc2hpcHBpbmdQcmVmZXJlbmNlOiAnR0VUX0ZST01fRklMRScsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFBheVBhbEJ1dHRvblByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzU2RrUmVhZHk6IGZhbHNlLFxuICAgICAgbG9hZGVkU2NyaXB0OiBudWxsLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICE9PSB1bmRlZmluZWQgJiYgd2luZG93LnBheXBhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmFkZFBheXBhbFNkaygpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgd2luZG93ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHdpbmRvdy5wYXlwYWwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdGhpcy5wcm9wcy5vbkJ1dHRvblJlYWR5XG4gICAgKSB7XG4gICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNjcmlwdFtzcmM9JyR7dGhpcy5nZXRTY3JpcHRTcmMoKX0nXWApKSB7XG4gICAgICAgIHRoaXMuYWRkUGF5cGFsU2RrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BzLm9uQnV0dG9uUmVhZHkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgY29uc3QgeyBsb2FkZWRTY3JpcHQgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKG5leHRQcm9wcy5jdXJyZW5jeSAmJiB0aGlzLnByb3BzLmN1cnJlbmN5ICYmIG5leHRQcm9wcy5jdXJyZW5jeSAhPSB0aGlzLnByb3BzLmN1cnJlbmN5KSB7XG4gICAgICAvLyAgIGlmIChsb2FkZWRTY3JpcHQpIHtcbiAgICAgIC8vICAgICBsb2FkZWRTY3JpcHQucmVtb3ZlKCk7XG4gICAgICAvLyAgICAgZGVsZXRlIHdpbmRvd1snem9pZCddO1xuICAgICAgLy8gICAgIGRlbGV0ZSB3aW5kb3dbJ3BheXBhbCddO1xuICAgICAgLy8gICB9XG4gICAgICB0aGlzLmFkZFBheXBhbFNkaygpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNyZWF0ZU9yZGVyKGRhdGE6IGFueSwgYWN0aW9uczogYW55KSB7XG4gICAgY29uc3QgeyBjdXJyZW5jeSwgb3B0aW9ucywgYW1vdW50LCBzaGlwcGluZ1ByZWZlcmVuY2UgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gYWN0aW9ucy5vcmRlci5jcmVhdGUoe1xuICAgICAgcHVyY2hhc2VfdW5pdHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGFtb3VudDoge1xuICAgICAgICAgICAgY3VycmVuY3lfY29kZTogY3VycmVuY3kgPyBjdXJyZW5jeSA6IG9wdGlvbnMgJiYgb3B0aW9ucy5jdXJyZW5jeSA/IG9wdGlvbnMuY3VycmVuY3kgOiAnVVNEJyxcbiAgICAgICAgICAgIHZhbHVlOiBhbW91bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGFwcGxpY2F0aW9uX2NvbnRleHQ6IHtcbiAgICAgICAgc2hpcHBpbmdfcHJlZmVyZW5jZTogc2hpcHBpbmdQcmVmZXJlbmNlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uQXBwcm92ZShkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkge1xuICAgIHJldHVybiBhY3Rpb25zLm9yZGVyXG4gICAgICAuY2FwdHVyZSgpXG4gICAgICAudGhlbigoZGV0YWlscykgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblN1Y2Nlc3MpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vblN1Y2Nlc3MoZGV0YWlscywgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jYXRjaEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2F0Y2hFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGFtb3VudCwgb25TdWNjZXNzLCBjcmVhdGVPcmRlciwgY3JlYXRlU3Vic2NyaXB0aW9uLCBvbkFwcHJvdmUsIHN0eWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaXNTZGtSZWFkeSB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB3aW5kb3cucGF5cGFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IEJ1dHRvbiA9IHdpbmRvdy5wYXlwYWwuQnV0dG9ucy5kcml2ZXIoJ3JlYWN0Jywge1xuICAgICAgUmVhY3QsXG4gICAgICBSZWFjdERPTSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGNyZWF0ZU9yZGVyRm4gPVxuICAgICAgYW1vdW50ICYmICFjcmVhdGVPcmRlclxuICAgICAgICA/IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gdGhpcy5jcmVhdGVPcmRlcihkYXRhLCBhY3Rpb25zKVxuICAgICAgICA6IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gY3JlYXRlT3JkZXIoZGF0YSwgYWN0aW9ucyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEJ1dHRvblxuICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgY3JlYXRlT3JkZXI9e2NyZWF0ZVN1YnNjcmlwdGlvbiA/IHVuZGVmaW5lZCA6IGNyZWF0ZU9yZGVyRm59XG4gICAgICAgIGNyZWF0ZVN1YnNjcmlwdGlvbj17Y3JlYXRlU3Vic2NyaXB0aW9ufVxuICAgICAgICBvbkFwcHJvdmU9e1xuICAgICAgICAgIG9uU3VjY2Vzc1xuICAgICAgICAgICAgPyAoZGF0YTogYW55LCBhY3Rpb25zOiBhbnkpID0+IHRoaXMub25BcHByb3ZlKGRhdGEsIGFjdGlvbnMpXG4gICAgICAgICAgICA6IChkYXRhOiBhbnksIGFjdGlvbnM6IGFueSkgPT4gb25BcHByb3ZlKGRhdGEsIGFjdGlvbnMpXG4gICAgICAgIH1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRQYXlwYWxTZGsoKSB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBvbkJ1dHRvblJlYWR5IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgbG9hZGVkU2NyaXB0IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc29sZS5sb2coJ29wdGlvbnMuY2xpZW50SWQnLCBvcHRpb25zLmNsaWVudElkKTtcblxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuZ2V0U2NyaXB0U3JjKCk7XG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzU2RrUmVhZHk6IHRydWUgfSk7XG5cbiAgICAgIGlmIChvbkJ1dHRvblJlYWR5KSB7XG4gICAgICAgIG9uQnV0dG9uUmVhZHkoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXlwYWwgU0RLIGNvdWxkIG5vdCBiZSBsb2FkZWQuJyk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkZWRTY3JpcHQ6IHNjcmlwdCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2NyaXB0U3JjKCkge1xuICAgIGNvbnN0IHsgY3VycmVuY3ksIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBxdWVyeVBhcmFtczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vIHJlcGxhY2luZyBjYW1lbENhc2Ugd2l0aCBkYXNoZXNcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0ga1xuICAgICAgICAuc3BsaXQoLyg/PVtBLVpdKS8pXG4gICAgICAgIC5qb2luKCctJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICBxdWVyeVBhcmFtcy5wdXNoKGAke25hbWV9PSR7b3B0aW9uc1trXX1gKTtcbiAgICB9KTtcblxuICAgIHF1ZXJ5UGFyYW1zLnB1c2goYGN1cnJlbmN5PSR7Y3VycmVuY3l9YCk7XG5cbiAgICByZXR1cm4gYGh0dHBzOi8vd3d3LnBheXBhbC5jb20vc2RrL2pzPyR7cXVlcnlQYXJhbXMuam9pbignJicpfWA7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGF5UGFsQnV0dG9uIH07XG4iXX0=