define('melon/View', [
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
    var View = function (_Component) {
        babelHelpers.inherits(View, _Component);
        function View() {
            babelHelpers.classCallCheck(this, View);
            _Component.apply(this, arguments);
        }
        View.prototype.render = function render() {
            var _props = this.props;
            var children = _props.children;
            var rest = babelHelpers.objectWithoutProperties(_props, ['children']);
            return React.createElement('div', babelHelpers._extends({}, rest, { className: this.getClassName() }), children);
        };
        babelHelpers.createClass(View, null, [{
                key: 'displayName',
                value: 'View',
                enumerable: true
            }]);
        return View;
    }(Component);
    module.exports = View;
});