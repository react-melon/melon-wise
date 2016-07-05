var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/Icon', [
            'exports',
            'react',
            'melon-core/classname/cxBuilder'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.cxBuilder);
        global.Icon = mod.exports;
    }
}(this, function (exports, _react, _cxBuilder) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = Icon;
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var cx = (0, _cxBuilder.create)('Icon');
    function Icon(props) {
        return _react2.default.createElement('i', babelHelpers.extends({}, props, { className: cx(props).build() }));
    }
    Icon.displayName = 'Icon';
}));