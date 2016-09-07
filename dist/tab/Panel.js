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
        global.Panel = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = TabPanel;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file TabPanel
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TabPanel');

    function TabPanel(props) {

        var className = cx(props).addStates({
            active: props.active
        }).build();

        return _react2['default'].createElement('div', babelHelpers['extends']({}, props, { className: className }));
    }
});