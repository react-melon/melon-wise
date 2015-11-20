define('melon/Navigator', [
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
    var Navigator = function (_Component) {
        babelHelpers.inherits(Navigator, _Component);
        function Navigator() {
            babelHelpers.classCallCheck(this, Navigator);
            _Component.apply(this, arguments);
        }
        Navigator.prototype.render = function render() {
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
        babelHelpers.createClass(Navigator, null, [{
                key: 'displayName',
                value: 'Navigator',
                enumerable: true
            }]);
        return Navigator;
    }(Component);
    var PropTypes = React.PropTypes;
    Navigator.propTypes = {
        hidden: PropTypes.bool,
        title: PropTypes.any,
        leftIcon: PropTypes.element,
        rightIcon: PropTypes.element
    };
    Navigator.defaultProps = { hidden: false };
    module.exports = Navigator;
});