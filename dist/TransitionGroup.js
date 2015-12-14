define('melon/TransitionGroup', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('Transitiongroup');
    var PropTypes = React.PropTypes;
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
    var DEFAULT_TRANSITION_DURATION = 300;
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
        if (transitionTimeout !== DEFAULT_TRANSITION_DURATION) {
            children = React.Children.map(children, function (child) {
                return React.cloneElement(child, {
                    style: babelHelpers._extends({}, child.props.style, {
                        transitionDuration: transitionTimeout + 'ms',
                        WebkitTransitionDuration: transitionTimeout + 'ms'
                    })
                });
            });
        }
        var isAnimate = transitionType !== 'instant';
        return React.createElement(ReactCSSTransitionGroup, babelHelpers._extends({}, others, {
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