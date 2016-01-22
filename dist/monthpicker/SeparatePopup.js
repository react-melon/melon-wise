define('melon-wise/lib/monthpicker/SeparatePopup', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Popup',
    '../Tappable',
    '../Selector',
    'melon-classname',
    '../util/date',
    '../mixins/SeparateMixin'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _Popup = require('../Popup');
    var _Popup2 = babelHelpers.interopRequireDefault(_Popup);
    var _Tappable = require('../Tappable');
    var _Tappable2 = babelHelpers.interopRequireDefault(_Tappable);
    var _Selector = require('../Selector');
    var _Selector2 = babelHelpers.interopRequireDefault(_Selector);
    var cx = require('melon-classname').create('Monthpicker');
    var dateUtil = require('../util/date');
    var SeparatePopup = _react2.default.createClass({
        displayName: 'SeparatePopup',
        mixins: [require('../mixins/SeparateMixin')],
        getInitialState: function () {
            this.timer = null;
            return {
                date: this.props.date,
                mode: 'year'
            };
        },
        componentWillUnmount: function () {
            var timer = this.timer;
            if (timer) {
                clearTimeout(timer);
            }
        },
        onHide: function () {
            var _this = this;
            var onHide = this.props.onHide;
            onHide && onHide();
            this.timer = setTimeout(function () {
                _this.setState({ mode: 'year' });
            }, 300);
        },
        onCancel: function () {
            this.onHide();
        },
        onChange: function (e) {
            var _this2 = this;
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
                    var onChange = _this2.props.onChange;
                    _this2.onHide();
                    onChange && onChange({
                        value: _this2.state.date,
                        target: _this2
                    });
                }
            });
        },
        render: function () {
            var _props = this.props;
            var show = _props.show;
            var begin = _props.begin;
            var end = _props.end;
            var _state2 = this.state;
            var mode = _state2.mode;
            var date = _state2.date;
            var items = [];
            var index = undefined;
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
                var len = 12;
                index = date.getMonth();
                if (dateUtil.isEqualYear(date, end)) {
                    len = end.getMonth() + 1;
                } else if (dateUtil.isEqualYear(date, begin)) {
                    beginMonth = begin.getMonth();
                    len = len - beginMonth;
                    index = index - beginMonth;
                }
                for (var i = beginMonth; i < len; i++) {
                    items.push({
                        name: dateUtil.datePad(i + 1),
                        value: i
                    });
                }
            }
            return _react2.default.createElement(_Popup2.default, {
                show: show,
                transitionTimeout: 300,
                transitionType: 'translate',
                direction: 'bottom',
                onHide: this.onHide
            }, _react2.default.createElement('div', null, _react2.default.createElement('div', { className: cx().part('panel').build() }, _react2.default.createElement(_Selector2.default, {
                ref: 'selector',
                items: items,
                className: cx().part('selector').build(),
                selectedIndex: index,
                variants: [mode],
                onChange: this.onChange
            })), _react2.default.createElement(_Tappable2.default, {
                component: 'div',
                onTap: this.onCancel,
                className: cx().part('cancel').build()
            }, '\u53D6\u6D88')));
        }
    });
    SeparatePopup.displayName = 'MonthPickerSeparatePopup';
    SeparatePopup.propTypes = babelHelpers._extends({}, _Popup2.default.propTypes, {
        date: _react.PropTypes.instanceOf(Date),
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date)
    });
    SeparatePopup.defaultProps = babelHelpers._extends({}, _Popup2.default.defaultProps);
    module.exports = SeparatePopup;
});