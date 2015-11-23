define('melon/NavigationBar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component',
    './Title'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Title = require('./Title');
    var NavigationBar = function (_Component) {
        babelHelpers.inherits(NavigationBar, _Component);
        function NavigationBar() {
            babelHelpers.classCallCheck(this, NavigationBar);
            _Component.apply(this, arguments);
        }
        NavigationBar.prototype.render = function render() {
            var _props = this.props;
            var title = _props.title;
            var leftButton = _props.leftButton;
            var rightButton = _props.rightButton;
            var other = babelHelpers.objectWithoutProperties(_props, [
                'title',
                'leftButton',
                'rightButton'
            ]);
            leftButton = leftButton ? React.cloneElement(leftButton, { className: this.getPartClassName('left') }) : null;
            rightButton = rightButton ? React.cloneElement(rightButton, { className: this.getPartClassName('right') }) : null;
            return React.createElement('nav', { className: this.getClassName() }, leftButton, rightButton, React.createElement(Title, { level: 1 }, title));
        };
        babelHelpers.createClass(NavigationBar, null, [{
                key: 'displayName',
                value: 'NavigationBar',
                enumerable: true
            }]);
        return NavigationBar;
    }(Component);
    var PropTypes = React.PropTypes;
    NavigationBar.propTypes = {
        hidden: PropTypes.bool,
        title: PropTypes.any,
        leftIcon: PropTypes.element,
        rightIcon: PropTypes.element
    };
    NavigationBar.defaultProps = { hidden: false };
    module.exports = NavigationBar;
});