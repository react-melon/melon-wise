var babelHelpers = require('../babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/csstransitiongroup/TransitionChildMapping', [
            'exports',
            'react'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react);
        global.TransitionChildMapping = mod.exports;
    }
}(this, function (exports, _react) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.getChildMapping = getChildMapping;
    exports.mergeChildMappings = mergeChildMappings;
    function getChildMapping(children) {
        if (!children) {
            return null;
        }
        var mappedChildren = {};
        _react.Children.forEach(children, function (child, index) {
            var childKey = child.key || index.toString(36);
            mappedChildren[childKey] = child;
        });
        return mappedChildren;
    }
    function mergeChildMappings(prevChildMapping, nextChildMapping) {
        if (!prevChildMapping) {
            return nextChildMapping;
        }
        if (!nextChildMapping) {
            return prevChildMapping;
        }
        var mergedChildren = babelHelpers.extends({}, prevChildMapping);
        Object.keys(nextChildMapping).forEach(function (key) {
            if (prevChildMapping[key] !== nextChildMapping[key]) {
                mergedChildren[key] = nextChildMapping[key];
            }
        });
        return mergedChildren;
    }
}));