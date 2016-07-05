(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/listview/StaticRenderer', [
            'module',
            'react'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(module, require('react'));
    } else {
        var mod = { exports: {} };
        factory(mod, global.react);
        global.StaticRenderer = mod.exports;
    }
}(this, function (module, React) {
    'use strict';
    var StaticRenderer = React.createClass({
        displayName: 'StaticRenderer',
        propTypes: {
            shouldUpdate: React.PropTypes.bool.isRequired,
            render: React.PropTypes.func.isRequired
        },
        shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
            return nextProps.shouldUpdate;
        },
        render: function render() {
            return this.props.render();
        }
    });
    module.exports = StaticRenderer;
}));