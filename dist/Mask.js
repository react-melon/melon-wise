var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/Mask', [
            'exports',
            'react',
            'melon-core/classname/cxBuilder'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.cxBuilder);
        global.Mask = mod.exports;
    }
}(this, function (exports, _react, _cxBuilder) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = Mask;
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var cx = (0, _cxBuilder.create)('Mask');
    function Mask(props) {
        var show = props.show;
        return _react2.default.createElement('div', babelHelpers.extends({}, props, { className: cx(props).addStates({ show: show }).build() }));
    }
    Mask.propTypes = { show: _react.PropTypes.bool };
    Mask.defaultProps = { show: false };
}));