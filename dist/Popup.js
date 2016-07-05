var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/Popup', [
            'exports',
            'react',
            'melon-core/classname/cxBuilder',
            './CSSTransitionGroup',
            './popup/windowScrollHelper',
            './Mask'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./CSSTransitionGroup'), require('./popup/windowScrollHelper'), require('./Mask'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.cxBuilder, global.CSSTransitionGroup, global.windowScrollHelper, global.Mask);
        global.Popup = mod.exports;
    }
}(this, function (exports, _react, _cxBuilder, _CSSTransitionGroup, _windowScrollHelper, _Mask) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _CSSTransitionGroup2 = babelHelpers.interopRequireDefault(_CSSTransitionGroup);
    var windowScrollHelper = babelHelpers.interopRequireWildcard(_windowScrollHelper);
    var _Mask2 = babelHelpers.interopRequireDefault(_Mask);
    var cx = (0, _cxBuilder.create)('Popup');
    var Popup = function (_Component) {
        babelHelpers.inherits(Popup, _Component);
        function Popup(props) {
            babelHelpers.classCallCheck(this, Popup);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Popup).call(this, props));
            _this.state = {
                show: _this.props.show,
                key: Date.now()
            };
            _this.onMaskClick = _this.onMaskClick.bind(_this);
            return _this;
        }
        babelHelpers.createClass(Popup, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var show = nextProps.show;
                    if (show === this.state.show) {
                        return;
                    }
                    var onEvent = show ? this.onShow : this.onHide;
                    this.setState({ show: show }, onEvent);
                }
            },
            {
                key: 'onShow',
                value: function onShow() {
                    this.bodyScrolling();
                    var onShow = this.props.onShow;
                    if (onShow) {
                        onShow();
                    }
                }
            },
            {
                key: 'onHide',
                value: function onHide() {
                    this.bodyScrolling();
                    var onHide = this.props.onHide;
                    if (onHide) {
                        onHide();
                    }
                }
            },
            {
                key: 'onMaskClick',
                value: function onMaskClick(e) {
                    this.setState({ show: false }, this.onHide);
                }
            },
            {
                key: 'bodyScrolling',
                value: function bodyScrolling() {
                    var show = this.state.show;
                    windowScrollHelper[show ? 'stop' : 'restore']();
                }
            },
            {
                key: 'render',
                value: function render() {
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
                    return _react2.default.createElement('div', babelHelpers.extends({}, others, { className: cx(props).addStates({ show: show }).build() }), _react2.default.createElement(_CSSTransitionGroup2.default, {
                        component: 'div',
                        transitionTimeout: transitionTimeout || 400,
                        transitionType: transitionType || 'instant',
                        translateFrom: translateFrom || 'bottom'
                    }, show ? _react2.default.createElement('div', { className: cx.getPartClassName('body') }, children) : null), mask ? _react2.default.createElement(_Mask2.default, {
                        show: show,
                        onClick: maskClickClose ? this.onMaskClick : null
                    }) : null);
                }
            }
        ]);
        return Popup;
    }(_react.Component);
    exports.default = Popup;
    Popup.displayName = 'Popup';
    Popup.propTypes = babelHelpers.extends({}, _CSSTransitionGroup2.default.propTypes, {
        show: _react.PropTypes.bool,
        onHide: _react.PropTypes.func,
        onShow: _react.PropTypes.func,
        maskClickClose: _react.PropTypes.bool,
        mask: _react.PropTypes.bool,
        onMaskClick: _react.PropTypes.func
    });
    Popup.defaultProps = babelHelpers.extends({}, _CSSTransitionGroup2.default.defaultProps, {
        maskClickClose: true,
        show: false,
        mask: true
    });
}));