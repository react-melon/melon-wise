define('melon-wise/lib/csstransitiongroup/TransitionChildMapping', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.getChildMapping = getChildMapping;
    exports.mergeChildMappings = mergeChildMappings;
    var React = require('react');
    function getChildMapping(children) {
        var mappedChildren = {};
        React.Children.forEach(children, function (child, index) {
            var _child$props$childKey = child.props.childKey;
            var childKey = _child$props$childKey === undefined ? Date.now() : _child$props$childKey;
            mappedChildren[childKey] = child;
        });
        return mappedChildren;
    }
    function mergeChildMappings(prevChildMapping, nextChildMapping) {
        var mergedChildren = babelHelpers.extends({}, prevChildMapping) || {};
        Object.keys(nextChildMapping).forEach(function (key) {
            if (!prevChildMapping[key] && prevChildMapping[key] !== nextChildMapping[key]) {
                mergedChildren[key] = nextChildMapping[key];
            }
        });
        return mergedChildren;
    }
});