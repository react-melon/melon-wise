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
    'use strict';
    var React = require('react');
    var Popup = require('../Popup');
    var Tappable = require('../Tappable');
    var Selector = require('../Selector');
    var cx = require('melon-classname').create('Monthpicker');
    var dateUtil = require('../util/date');
    var PropTypes = React.PropTypes;
    var SeparatePopup = React.createClass({
        displayName: 'SeparatePopup',
        mixins: [require('../mixins/SeparateMixin')],
        getInitialState: function getInitialState() {
            this.timer = null;
            return {
                date: this.props.date,
                mode: 'year'
            };
        },
        componentWillUnmount: function componentWillUnmount() {
            var timer = this.timer;
            if (timer) {
                clearTimeout(timer);
            }
        },
        onHide: function onHide() {
            var _this = this;
            var onHide = this.props.onHide;
            onHide && onHide();
            this.timer = setTimeout(function () {
                _this.setState({ mode: 'year' });
            }, 300);
        },
        onCancel: function onCancel() {
            this.onHide();
        },
        onChange: function onChange(e) {
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
        render: function render() {
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
            return React.createElement(Popup, {
                show: show,
                transitionTimeout: 300,
                transitionType: 'translate',
                direction: 'bottom',
                onHide: this.onHide
            }, React.createElement('div', null, React.createElement('div', { className: cx().part('panel').build() }, React.createElement(Selector, {
                ref: 'selector',
                items: items,
                className: cx().part('selector').build(),
                selectedIndex: index,
                variants: [mode],
                onChange: this.onChange
            })), React.createElement(Tappable, {
                component: 'div',
                onTap: this.onCancel,
                className: cx().part('cancel').build()
            }, '\u53D6\u6D88')));
        }
    });
    SeparatePopup.displayName = 'MonthPickerSeparatePopup';
    SeparatePopup.propTypes = babelHelpers.extends({}, Popup.propTypes, {
        date: PropTypes.instanceOf(Date),
        begin: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date)
    });
    SeparatePopup.defaultProps = babelHelpers.extends({}, Popup.defaultProps);
    module.exports = SeparatePopup;
});