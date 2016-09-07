(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'react-tappable/lib/Tappable', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('react-tappable/lib/Tappable'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Tappable, global.babelHelpers);
        global.Item = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Tappable, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = TabItem;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Tappable2 = babelHelpers.interopRequireDefault(_Tappable);

    /**
     * @file Tabs Tab
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TabItem');

    function TabItem(props) {
        var selected = props.selected;
        var label = props.label;
        var others = babelHelpers.objectWithoutProperties(props, ['selected', 'label']);


        return _react2['default'].createElement(
            _Tappable2['default'],
            babelHelpers['extends']({}, others, { className: cx(props).addStates({ selected: selected }).build() }),
            label
        );
    }
});