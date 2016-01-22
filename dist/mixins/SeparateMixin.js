define('melon-wise/lib/mixins/SeparateMixin', [
    'require',
    'exports',
    'module',
    'react-dom',
    '../util/dom'
], function (require, exports, module) {
    var ReactDOM = require('react-dom');
    var domUtil = require('../util/dom');
    module.exports = {
        componentDidMount: function () {
            domUtil.on(document.body, 'touchmove', this.onTouchMove);
        },
        componentWillUnmount: function () {
            domUtil.off(document.body, 'touchmove', this.onTouchMove);
        },
        onTouchMove: function (e) {
            var target = e.target;
            var main = ReactDOM.findDOMNode(this);
            if (!domUtil.contains(main, target) && this.props.show) {
                e.preventDefault();
            }
        }
    };
});