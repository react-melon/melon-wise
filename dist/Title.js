define('melon/Title', [
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
    var Title = function (_Component) {
        babelHelpers.inherits(Title, _Component);
        function Title() {
            babelHelpers.classCallCheck(this, Title);
            _Component.apply(this, arguments);
        }
        Title.prototype.render = function render() {
            var _props = this.props;
            var level = _props.level;
            var rest = babelHelpers.objectWithoutProperties(_props, ['level']);
            var tag = 'h' + level;
            return React.createElement(tag, babelHelpers._extends({}, rest, { className: this.getClassName() }));
        };
        babelHelpers.createClass(Title, null, [{
                key: 'displayName',
                value: 'Title',
                enumerable: true
            }]);
        return Title;
    }(Component);
    Title.propsTypes = { level: React.PropTypes.number.isRequired };
    module.exports = Title;
});