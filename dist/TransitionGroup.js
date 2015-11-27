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
    var TransitionGroup = function TransitionGroup(props) {
        var translateFrom = props.translateFrom;
        var transitionTimeout = props.transitionTimeout;
        var transitionType = props.transitionType;
        var others = babelHelpers.objectWithoutProperties(props, [
            'translateFrom',
            'transitionTimeout',
            'transitionType'
        ]);
        var type = transitionType === 'translate' ? transitionType + '-' + translateFrom : transitionType;
        return React.createElement(ReactCSSTransitionGroup, babelHelpers._extends({}, others, {
            component: 'div',
            className: cx(props).build(),
            transitionName: 'transition-' + type,
            transitionEnterTimeout: transitionTimeout,
            transitionLeaveTimeout: transitionTimeout,
            transitionEnter: transitionType !== 'instant',
            transitionLeave: transitionType !== 'instant'
        }));
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