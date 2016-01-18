define('melon-wise/lib/listview/StaticRenderer', [
    'require',
    'exports',
    'module',
    'React'
], function (require, exports, module) {
    'use strict';
    var React = require('React');
    var StaticRenderer = React.createClass({
        displayName: 'StaticRenderer',
        propTypes: {
            shouldUpdate: React.PropTypes.bool.isRequired,
            render: React.PropTypes.func.isRequired
        },
        shouldComponentUpdate: function (nextProps) {
            return nextProps.shouldUpdate;
        },
        render: function () {
            return this.props.render();
        }
    });
    module.exports = StaticRenderer;
});