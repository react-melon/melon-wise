define('melon/NavigationBar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder',
    './Title',
    './Tappable'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('NavigationBar');
    var Title = require('./Title');
    var Tappable = require('./Tappable');
    function NavigationBar(props) {
        var title = props.title;
        var leftIcon = props.leftIcon;
        var rightIcon = props.rightIcon;
        var onLeftTap = props.onLeftTap;
        var onRightTap = props.onRightTap;
        var other = babelHelpers.objectWithoutProperties(props, [
            'title',
            'leftIcon',
            'rightIcon',
            'onLeftTap',
            'onRightTap'
        ]);
        var leftButton = leftIcon ? React.createElement(Tappable, {
            className: cx().part('left').build(),
            onTap: onLeftTap
        }, leftIcon) : null;
        var rightButton = rightIcon ? React.createElement(Tappable, {
            className: cx().part('right').build(),
            onTap: onRightTap
        }, leftIcon) : null;
        return React.createElement('nav', { className: this.getClassName() }, leftButton, rightButton, React.createElement(Title, { level: 1 }, title));
    }
    NavigationBar.displayName = 'NavigationBar';
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