define('melon-wise/lib/listview/StaticRenderer', [
    'require',
    'exports',
    'module',
    'react'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
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
});