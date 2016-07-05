var babelHelpers = require('../babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/util/separatePopupHelper', [
            'exports',
            'react-dom'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react-dom'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.reactDom);
        global.separatePopupHelper = mod.exports;
    }
}(this, function (exports, _reactDom) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.createPopup = createPopup;
    exports.destoryPopup = destoryPopup;
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    function createPopup(domProps, wrapper) {
        if (!wrapper) {
            wrapper = document.body;
        }
        var container = document.createElement('div');
        domProps && Object.keys(domProps).map(function (key) {
            container[key] = domProps[key];
        });
        wrapper.appendChild(container);
        return container;
    }
    function destoryPopup(container) {
        if (container) {
            _reactDom2.default.unmountComponentAtNode(container);
            container.parentElement.removeChild(container);
            container = null;
        }
    }
}));