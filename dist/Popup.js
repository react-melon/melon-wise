define('melon-wise/lib/Popup', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname',
    './popup/windowScrollHelper',
    './Mask',
    './CSSTransitionGroup'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Popup');
    var windowScrollHelper = require('./popup/windowScrollHelper');
    var Mask = require('./Mask');
    var CSSTransitionGroup = require('./CSSTransitionGroup');
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
            var translateFrom = props.translateFrom;
            var transitionType = props.transitionType;
            var transitionTimeout = props.transitionTimeout;
            var children = props.children;
            var others = babelHelpers.objectWithoutProperties(props, [
                'mask',
                'maskClickClose',
                'translateFrom',
                'transitionType',
                'transitionTimeout',
                'children'
            ]);
            var show = this.state.show;
            return React.createElement('div', babelHelpers.extends({}, others, { className: cx(props).addStates({ show: show }).build() }), React.createElement(CSSTransitionGroup, {
                component: 'div',
                transitionTimeout: transitionTimeout || 400,
                transitionType: transitionType || 'instant',
                translateFrom: translateFrom || 'bottom'
            }, show ? React.cloneElement(children, {
                className: cx().part('body').build(),
                childKey: 'melon-popup'
            }) : null), mask ? React.createElement(Mask, {
                show: show,
                onClick: maskClickClose ? this.onMaskClick : null
            }) : null);
        }
    });
    module.exports = Popup;
});