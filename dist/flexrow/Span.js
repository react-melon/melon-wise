(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Span = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = FlexRowSpan;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file flexrow/span
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('FlexRowSpan');

    function FlexRowSpan(props) {
        var occupy = props.occupy;
        var style = props.style;
        var columnNum = props.columnNum;
        var noGap = props.noGap;
        var other = babelHelpers.objectWithoutProperties(props, ['occupy', 'style', 'columnNum', 'noGap']);


        style = babelHelpers['extends']({
            width: occupy / columnNum * 100 + '%',
            WebkitBoxFlex: occupy,
            WebkitFlex: [occupy, occupy, 'auto'].join(' ')
        }, style);

        if (!noGap) {
            var padding = 20 / (columnNum - 1) + '%';
            style = babelHelpers['extends']({}, style, {
                paddingLeft: padding,
                paddingRight: padding
            });
        }

        return _react2['default'].createElement('div', babelHelpers['extends']({}, other, { className: cx(props).build(), style: style }));
    }

    FlexRowSpan.displayName = 'FlexRowSpan';

    FlexRowSpan.propsTypes = {
        occupy: _react.PropTypes.number.isRequired
    };

    FlexRowSpan.defaultProps = {
        occupy: 4
    };
});