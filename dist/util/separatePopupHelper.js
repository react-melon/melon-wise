(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react-dom', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react-dom'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.reactDom, global.babelHelpers);
        global.separatePopupHelper = mod.exports;
    }
})(this, function (exports, _reactDom, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.createPopup = createPopup;
    exports.destoryPopup = destoryPopup;

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    /**
     * @file separate popup helper
     * @author cxtom (cxtom2008@gmail.com)
     */

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
            _reactDom2['default'].unmountComponentAtNode(container);
            container.parentElement.removeChild(container);
            container = null;
        }
    }
});