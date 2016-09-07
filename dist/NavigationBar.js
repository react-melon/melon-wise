(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'react-tappable/lib/Tappable', './Title', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('react-tappable/lib/Tappable'), require('./Title'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Tappable, global.Title, global.babelHelpers);
        global.NavigationBar = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Tappable, _Title, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Tappable2 = babelHelpers.interopRequireDefault(_Tappable);

    var _Title2 = babelHelpers.interopRequireDefault(_Title);

    /**
     * @file NavigationBar
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('NavigationBar');

    var NavigationBar = function (_Component) {
        babelHelpers.inherits(NavigationBar, _Component);

        function NavigationBar() {
            babelHelpers.classCallCheck(this, NavigationBar);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        NavigationBar.prototype.render = function render() {

            var props = this.props;

            var title = props.title;
            var leftIcon = props.leftIcon;
            var rightIcon = props.rightIcon;
            var onLeftTap = props.onLeftTap;
            var onRightTap = props.onRightTap;


            var leftButton = leftIcon ? _react2['default'].createElement(
                _Tappable2['default'],
                { className: cx().part('left').build(), onTap: onLeftTap },
                leftIcon
            ) : null;

            var rightButton = rightIcon ? _react2['default'].createElement(
                _Tappable2['default'],
                { className: cx().part('right').build(), onTap: onRightTap },
                leftIcon
            ) : null;

            return _react2['default'].createElement(
                'nav',
                { className: cx(props).build() },
                leftButton,
                rightButton,
                _react2['default'].createElement(
                    _Title2['default'],
                    { level: 2 },
                    title
                )
            );
        };

        return NavigationBar;
    }(_react.Component);

    exports['default'] = NavigationBar;


    NavigationBar.displayName = 'NavigationBar';

    NavigationBar.propTypes = {
        hidden: _react.PropTypes.bool,
        title: _react.PropTypes.any,
        leftIcon: _react.PropTypes.element,
        rightIcon: _react.PropTypes.element
    };

    NavigationBar.defaultProps = {
        hidden: false
    };
});