(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './row/Span', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./row/Span'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Span, global.babelHelpers);
        global.Row = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Span, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Span2 = babelHelpers.interopRequireDefault(_Span);

    /**
     * @file melon-wise/FlexRow
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('FlexRow');

    var FlexRow = function (_Component) {
        babelHelpers.inherits(FlexRow, _Component);

        function FlexRow() {
            babelHelpers.classCallCheck(this, FlexRow);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        FlexRow.prototype.render = function render() {

            var props = this.props;

            var columnNum = props.columnNum;
            var noGap = props.noGap;
            var rest = babelHelpers.objectWithoutProperties(props, ['columnNum', 'noGap']);

            var margin = -20 / (columnNum - 1) + '%';
            var style = noGap ? null : {
                marginLeft: margin,
                marginRight: margin
            };

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, rest, { className: cx(props).build(), style: style }),
                _react.Children.map(props.children, function (child, index) {
                    return (0, _react.cloneElement)(child, {
                        key: index,
                        columnNum: columnNum,
                        noGap: noGap
                    });
                })
            );
        };

        return FlexRow;
    }(_react.Component);

    exports['default'] = FlexRow;


    FlexRow.displayName = 'FlexRow';

    FlexRow.propTypes = {
        columnNum: _react.PropTypes.number,
        noGap: _react.PropTypes.bool
    };

    FlexRow.defaultProps = {
        columnNum: 12,
        noGap: false
    };

    FlexRow.Span = _Span2['default'];
});