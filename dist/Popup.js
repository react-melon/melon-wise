(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'react-addons-css-transition-group', './popup/windowScrollHelper', './Mask', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('react-addons-css-transition-group'), require('./popup/windowScrollHelper'), require('./Mask'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.reactAddonsCssTransitionGroup, global.windowScrollHelper, global.Mask, global.babelHelpers);
        global.Popup = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _reactAddonsCssTransitionGroup, _windowScrollHelper, _Mask, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactAddonsCssTransitionGroup2 = babelHelpers.interopRequireDefault(_reactAddonsCssTransitionGroup);

    var windowScrollHelper = babelHelpers.interopRequireWildcard(_windowScrollHelper);

    var _Mask2 = babelHelpers.interopRequireDefault(_Mask);

    /**
     * @file Popup
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Popup');

    var Popup = function (_Component) {
        babelHelpers.inherits(Popup, _Component);

        function Popup(props) {
            babelHelpers.classCallCheck(this, Popup);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.state = {
                show: _this.props.show,
                key: Date.now()
            };

            _this.onMaskClick = _this.onMaskClick.bind(_this);
            return _this;
        }

        Popup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var show = nextProps.show;

            if (show === this.state.show) {
                return;
            }

            var onEvent = show ? this.onShow : this.onHide;
            this.setState({ show: show }, onEvent);
        };

        Popup.prototype.onShow = function onShow() {
            this.bodyScrolling();
            var onShow = this.props.onShow;
            if (onShow) {
                onShow();
            }
        };

        Popup.prototype.onHide = function onHide() {
            this.bodyScrolling();
            var onHide = this.props.onHide;
            if (onHide) {
                onHide();
            }
        };

        Popup.prototype.onMaskClick = function onMaskClick(e) {
            this.setState({ show: false }, this.onHide);
        };

        Popup.prototype.bodyScrolling = function bodyScrolling() {
            var show = this.state.show;
            windowScrollHelper[show ? 'stop' : 'restore']();
        };

        Popup.prototype.render = function render() {

            var props = this.props;
            var mask = props.mask;
            var maskClickClose = props.maskClickClose;
            var translateFrom = props.translateFrom;
            var transitionType = props.transitionType;
            var transitionTimeout = props.transitionTimeout;
            var children = props.children;
            var others = babelHelpers.objectWithoutProperties(props, ['mask', 'maskClickClose', 'translateFrom', 'transitionType', 'transitionTimeout', 'children']);


            var show = this.state.show;

            var type = transitionType === 'translate' ? transitionType + '-' + translateFrom : transitionType;

            var transitionName = 'transition-' + type;

            return _react2['default'].createElement(
                'div',
                { className: cx(props).addStates({ show: show }).build() },
                _react2['default'].createElement(
                    _reactAddonsCssTransitionGroup2['default'],
                    babelHelpers['extends']({
                        component: 'div'
                    }, others, {
                        transitionName: transitionName,
                        transitionEnterTimeout: transitionTimeout || 4000,
                        transitionLeaveTimeout: transitionTimeout || 4000 }),
                    show ? _react2['default'].createElement(
                        'div',
                        { className: cx.getPartClassName('body') },
                        children
                    ) : null
                ),
                mask ? _react2['default'].createElement(_Mask2['default'], {
                    show: show,
                    onClick: maskClickClose ? this.onMaskClick : null }) : null
            );
        };

        return Popup;
    }(_react.Component);

    exports['default'] = Popup;


    Popup.displayName = 'Popup';

    Popup.propTypes = babelHelpers['extends']({}, _reactAddonsCssTransitionGroup2['default'].propTypes, {
        show: _react.PropTypes.bool,
        onHide: _react.PropTypes.func,
        onShow: _react.PropTypes.func,
        maskClickClose: _react.PropTypes.bool,
        mask: _react.PropTypes.bool,
        onMaskClick: _react.PropTypes.func,
        translateFrom: _react.PropTypes.string
    });

    Popup.defaultProps = babelHelpers['extends']({}, _reactAddonsCssTransitionGroup2['default'].defaultProps, {
        maskClickClose: true,
        show: false,
        mask: true,
        translateFrom: 'bottom'
    });
});