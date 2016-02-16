define('melon-wise/lib/tab/Item', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'melon-classname',
    '../Tappable'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('TabItem');
    var Tappable = require('../Tappable');
    function TabItem(props) {
        var selected = props.selected;
        var label = props.label;
        var others = babelHelpers.objectWithoutProperties(props, [
            'selected',
            'label'
        ]);
        return React.createElement(Tappable, babelHelpers.extends({}, others, { className: cx(props).addStates({ selected: selected }).build() }), label);
    }
    module.exports = TabItem;
});