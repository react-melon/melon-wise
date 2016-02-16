define('melon-wise/lib/Button', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname',
    './Tappable'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Button');
    var Tapable = require('./Tappable');
    function Button(props) {
        var label = props.label;
        var children = props.children;
        var other = babelHelpers.objectWithoutProperties(props, [
            'label',
            'children'
        ]);
        var content = label || children;
        return React.createElement(Tapable, babelHelpers.extends({}, other, {
            component: 'button',
            classBase: 'variant',
            className: cx(props).build()
        }), content);
    }
    module.exports = Button;
});