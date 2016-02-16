define('melon-wise/lib/mixins/SeparateMixin', [
    'require',
    'exports',
    'module',
    'react-dom',
    '../util/dom'
], function (require, exports, module) {
    'use strict';
    var ReactDOM = require('react-dom');
    var domUtil = require('../util/dom');
    module.exports = {
        componentDidMount: function componentDidMount() {
            domUtil.on(document.body, 'touchmove', this.onTouchMove);
        },
        componentWillUnmount: function componentWillUnmount() {
            domUtil.off(document.body, 'touchmove', this.onTouchMove);
        },
        onTouchMove: function onTouchMove(e) {
            var target = e.target;
            var main = ReactDOM.findDOMNode(this);
            if (!domUtil.contains(main, target) && this.props.show) {
                e.preventDefault();
            }
        }
    };
});