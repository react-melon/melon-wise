define('melon/Popup', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder',
    './popup/windowScrollHelper',
    './Mask',
    './TransitionGroup'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('Popup');
    var windowScrollHelper = require('./popup/windowScrollHelper');
    var Mask = require('./Mask');
    var TransitionGroup = require('./TransitionGroup');
    var PropTypes = React.PropTypes;
    var Popup = React.createClass({
        displayName: 'Popup',
        propTypes: {
            show: PropTypes.bool,
            onHide: PropTypes.func,
            onShow: PropTypes.func,
            maskClickClose: PropTypes.bool,
            mask: PropTypes.bool,
            onMaskClick: PropTypes.func
        },
        getDefaultProps: function () {
            return {
                maskClickClose: true,
                show: false,
                mask: true
            };
        },
        getInitialState: function () {
            this.originalHTMLBodySize = {};
            return { show: this.props.show };
        },
        componentWillReceiveProps: function (nextProps) {
            var show = nextProps.show;
            if (show === this.state.show) {
                return;
            }
            var onEvent = show ? this.onShow : this.onHide;
            this.setState({ show: show }, onEvent);
        },
        onShow: function () {
            this.bodyScrolling();
            var onShow = this.props.onShow;
            if (onShow) {
                onShow();
            }
        },
        onHide: function () {
            this.bodyScrolling();
            var onHide = this.props.onHide;
            if (onHide) {
                onHide();
            }
        },
        onMaskClick: function (e) {
            this.setState({ show: false }, this.onHide);
        },
        bodyScrolling: function () {
            var show = this.state.show;
            windowScrollHelper[show ? 'stop' : 'restore']();
        },
        renderPopupBody: function () {
            return React.createElement('div', {
                className: cx().part('body').build(),
                key: 'body'
            }, this.props.children);
        },
        render: function () {
            var props = this.props;
            var mask = props.mask;
            var maskClickClose = props.maskClickClose;
            var translateFrom = props.translateFrom;
            var transitionType = props.transitionType;
            var transitionTimeout = props.transitionTimeout;
            var others = babelHelpers.objectWithoutProperties(props, [
                'mask',
                'maskClickClose',
                'translateFrom',
                'transitionType',
                'transitionTimeout'
            ]);
            var show = this.state.show;
            return React.createElement('div', babelHelpers._extends({}, others, { className: cx(props).addStates({ show: show }).build() }), React.createElement(TransitionGroup, {
                component: 'div',
                transitionTimeout: transitionTimeout || 500,
                transitionType: transitionType || 'instant',
                translateFrom: translateFrom || 'bottom'
            }, show ? this.renderPopupBody() : null), mask ? React.createElement(Mask, {
                show: show,
                onClick: maskClickClose ? this.onMaskClick : null
            }) : null);
        }
    });
    module.exports = Popup;
});