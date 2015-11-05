define('melon/Link', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Link = function (_Component) {
        babelHelpers.inherits(Link, _Component);
        function Link() {
            babelHelpers.classCallCheck(this, Link);
            _Component.apply(this, arguments);
        }
        Link.prototype.render = function render() {
            var props = this.props;
            return React.createElement('a', babelHelpers._extends({}, props, { className: this.getClassName() }), props.children);
        };
        babelHelpers.createClass(Link, null, [{
                key: 'displayName',
                value: 'Link',
                enumerable: true
            }]);
        return Link;
    }(Component);
    module.exports = Link;
});