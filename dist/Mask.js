(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Mask = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = Mask;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file Mask
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Mask');

    function Mask(props) {

        var show = props.show;

        return _react2['default'].createElement('div', babelHelpers['extends']({}, props, { className: cx(props).addStates({ show: show }).build() }));
    }

    Mask.propTypes = {
        show: _react.PropTypes.bool
    };

    Mask.defaultProps = {
        show: false
    };
});