var babelHelpers = require('../babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/monthpicker/SeparatePopup', [
            'exports',
            'react',
            '../Popup',
            '../Tappable',
            'melon-core/classname/cxBuilder',
            '../common/LockBody',
            '../Selector',
            '../util/date'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('../Popup'), require('../Tappable'), require('melon-core/classname/cxBuilder'), require('../common/LockBody'), require('../Selector'), require('../util/date'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.Popup, global.Tappable, global.cxBuilder, global.LockBody, global.Selector, global.date);
        global.SeparatePopup = mod.exports;
    }
}(this, function (exports, _react, _Popup, _Tappable, _cxBuilder, _LockBody2, _Selector, _date) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _Popup2 = babelHelpers.interopRequireDefault(_Popup);
    var _Tappable2 = babelHelpers.interopRequireDefault(_Tappable);
    var _LockBody3 = babelHelpers.interopRequireDefault(_LockBody2);
    var _Selector2 = babelHelpers.interopRequireDefault(_Selector);
    var dateUtil = babelHelpers.interopRequireWildcard(_date);
    var cx = (0, _cxBuilder.create)('MonthPicker');
    var SeparatePopup = function (_LockBody) {
        babelHelpers.inherits(SeparatePopup, _LockBody);
        function SeparatePopup(props) {
            babelHelpers.classCallCheck(this, SeparatePopup);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SeparatePopup).call(this, props));
            _this.timer = null;
            _this.state = {
                date: props.date,
                mode: 'year'
            };
            _this.onHide = _this.onHide.bind(_this);
            _this.onChange = _this.onChange.bind(_this);
            _this.onCancel = _this.onCancel.bind(_this);
            return _this;
        }
        babelHelpers.createClass(SeparatePopup, [
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    babelHelpers.get(Object.getPrototypeOf(SeparatePopup.prototype), 'componentWillUnmount', this).call(this);
                    var timer = this.timer;
                    if (timer) {
                        clearTimeout(timer);
                    }
                }
            },
            {
                key: 'onHide',
                value: function onHide() {
                    var _this2 = this;
                    var onHide = this.props.onHide;
                    onHide && onHide();
                    this.timer = setTimeout(function () {
                        _this2.setState({ mode: 'year' });
                    }, 300);
                }
            },
            {
                key: 'onCancel',
                value: function onCancel() {
                    this.onHide();
                }
            },
            {
                key: 'onChange',
                value: function onChange(e) {
                    var _this3 = this;
                    var _state = this.state;
                    var mode = _state.mode;
                    var date = _state.date;
                    var newDate = dateUtil.cloneAsDate(date);
                    newDate[mode === 'year' ? 'setFullYear' : 'setMonth'](e.value);
                    var nextState = { date: newDate };
                    if (mode === 'year') {
                        nextState.mode = 'month';
                    }
                    this.setState(nextState, function () {
                        if (mode === 'month') {
                            var onChange = _this3.props.onChange;
                            _this3.onHide();
                            onChange && onChange({
                                value: _this3.state.date,
                                target: _this3
                            });
                        }
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var show = _props.show;
                    var begin = _props.begin;
                    var end = _props.end;
                    var rest = babelHelpers.objectWithoutProperties(_props, [
                        'show',
                        'begin',
                        'end'
                    ]);
                    var _state2 = this.state;
                    var mode = _state2.mode;
                    var date = _state2.date;
                    var items = [];
                    var index = void 0;
                    if (mode === 'year') {
                        var endYear = end.getFullYear();
                        for (var i = 0, len = dateUtil.yearDiff(end, begin); i < len; i++) {
                            items.push({
                                name: endYear - i,
                                value: endYear - i
                            });
                        }
                        index = dateUtil.yearDiff(end, date);
                    } else {
                        var beginMonth = 0;
                        var _len = 12;
                        index = date.getMonth();
                        if (dateUtil.isEqualYear(date, end)) {
                            _len = end.getMonth() + 1;
                        } else if (dateUtil.isEqualYear(date, begin)) {
                            beginMonth = begin.getMonth();
                            _len = _len - beginMonth;
                            index = index - beginMonth;
                        }
                        for (var _i = beginMonth; _i < _len; _i++) {
                            items.push({
                                name: dateUtil.datePad(_i + 1),
                                value: _i
                            });
                        }
                    }
                    return _react2.default.createElement(_Popup2.default, babelHelpers.extends({}, rest, {
                        show: show,
                        transitionType: 'translate',
                        direction: 'bottom',
                        onHide: this.onHide
                    }), _react2.default.createElement('div', { className: cx.getPartClassName('panel') }, _react2.default.createElement(_Selector2.default, {
                        ref: 'selector',
                        items: items,
                        className: cx.getPartClassName('selector'),
                        selectedIndex: index,
                        variants: [mode],
                        onChange: this.onChange
                    })), _react2.default.createElement(_Tappable2.default, {
                        component: 'div',
                        onTap: this.onCancel,
                        className: cx.getPartClassName('cancel')
                    }, '\u53D6\u6D88'));
                }
            }
        ]);
        return SeparatePopup;
    }(_LockBody3.default);
    exports.default = SeparatePopup;
    SeparatePopup.displayName = 'MonthPickerSeparatePopup';
    SeparatePopup.propTypes = babelHelpers.extends({}, _Popup2.default.propTypes, {
        date: _react.PropTypes.instanceOf(Date),
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date)
    });
    SeparatePopup.defaultProps = babelHelpers.extends({}, _Popup2.default.defaultProps);
}));