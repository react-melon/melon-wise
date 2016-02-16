define('melon-wise/lib/TransitionGroup', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname',
    'react-addons-css-transition-group'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Transitiongroup');
    var PropTypes = React.PropTypes;
    var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
    var TransitionGroup = function TransitionGroup(props) {
        var translateFrom = props.translateFrom;
        var transitionTimeout = props.transitionTimeout;
        var transitionType = props.transitionType;
        var children = props.children;
        var others = babelHelpers.objectWithoutProperties(props, [
            'translateFrom',
            'transitionTimeout',
            'transitionType',
            'children'
        ]);
        var type = transitionType === 'translate' ? transitionType + '-' + translateFrom : transitionType;
        var isAnimate = transitionType !== 'instant';
        return React.createElement(ReactCSSTransitionGroup, babelHelpers.extends({}, others, {
            component: 'div',
            className: cx(props).build(),
            transitionName: 'transition-' + type,
            transitionEnterTimeout: transitionTimeout,
            transitionLeaveTimeout: transitionTimeout,
            transitionEnter: isAnimate,
            transitionLeave: isAnimate
        }), children);
    };
    TransitionGroup.propTypes = {
        transitionTimeout: PropTypes.number,
        transitionType: PropTypes.oneOf([
            'instant',
            'opacity',
            'translate',
            'scale'
        ]),
        translateFrom: PropTypes.oneOf([
            'top',
            'bottom',
            'left',
            'right'
        ])
    };
    TransitionGroup.defaultProps = {
        transitionTimeout: 500,
        transitionType: 'instant',
        translateFrom: 'bottom'
    };
    module.exports = TransitionGroup;
});