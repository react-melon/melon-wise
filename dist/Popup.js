define('melon/Popup', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder',
    './popup/windowScrollHelper',
    './Mask'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('Popup');
    var windowScrollHelper = require('./popup/windowScrollHelper');
    var Mask = require('./Mask');
    var PropTypes = React.PropTypes;
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
    var Popup = React.createClass({
        displayName: 'Popup',
        propTypes: {
            show: PropTypes.bool,
            onHide: PropTypes.func,
            onShow: PropTypes.func,
            maskClickClose: PropTypes.bool,
            mask: PropTypes.bool
        },
        getDefaultProps: function getDefaultProps() {
            return {
                maskClickClose: true,
                show: false,
                mask: true
            };
        },
        getInitialState: function getInitialState() {
            this.originalHTMLBodySize = {};
            return { show: this.props.show };
        },
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.show !== this.props.show || nextState.show !== this.state.show;
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            var show = nextProps.show;
            if (show === this.state.show) {
                return;
            }
            var onEvent = show ? this.onShow : this.onHide;
            this.setState({ show: show }, onEvent);
        },
        onShow: function onShow() {
            this.bodyScrolling();
            var onShow = this.props.onShow;
            if (onShow) {
                onShow();
            }
        },
        onHide: function onHide() {
            this.bodyScrolling();
            var onHide = this.props.onHide;
            if (onHide) {
                onHide();
            }
        },
        onMaskClick: function onMaskClick(e) {
            this.setState({ show: false }, this.onHide);
        },
        bodyScrolling: function bodyScrolling() {
            var show = this.state.show;
            windowScrollHelper[show ? 'stop' : 'restore']();
        },
        render: function render() {
            var props = this.props;
            var mask = props.mask;
            var maskClickClose = props.maskClickClose;
            var others = babelHelpers.objectWithoutProperties(props, [
                'mask',
                'maskClickClose'
            ]);
            var show = this.state.show;
            return React.createElement('div', babelHelpers._extends({}, others, { className: cx(props).addStates({ show: show }).build() }), React.createElement(ReactCSSTransitionGroup, {
                component: 'div',
                transitionName: 'popup-transition-opacity',
                transitionEnterTimeout: 500,
                transitionLeaveTimeout: 500,
                transitionEnter: true,
                transitionLeave: true
            }, this.renderPopupBody()), mask ? React.createElement(Mask, {
                show: show,
                onClick: maskClickClose ? this.onMaskClick : null
            }) : null);
        }
    });
    module.exports = Popup;
});