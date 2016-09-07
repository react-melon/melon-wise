(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', '../util/dom', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('../util/dom'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.dom, global.babelHelpers);
        global.LockBody = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _dom, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _dom2 = babelHelpers.interopRequireDefault(_dom);

    var LockBody = function (_Component) {
        babelHelpers.inherits(LockBody, _Component);

        function LockBody(props) {
            babelHelpers.classCallCheck(this, LockBody);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.state = {};
            _this.onTouchMove = _this.onTouchMove.bind(_this);
            return _this;
        }

        LockBody.prototype.componentDidMount = function componentDidMount() {
            _dom2['default'].on(document.body, 'touchmove', this.onTouchMove);
        };

        LockBody.prototype.componentWillUnmount = function componentWillUnmount() {
            _dom2['default'].off(document.body, 'touchmove', this.onTouchMove);
        };

        LockBody.prototype.onTouchMove = function onTouchMove(e) {
            var target = e.target;
            var main = _reactDom2['default'].findDOMNode(this);

            if (this.props.show && !_dom2['default'].contains(main, target)) {
                e.preventDefault();
            }
        };

        return LockBody;
    }(_react.Component);

    exports['default'] = LockBody;
});