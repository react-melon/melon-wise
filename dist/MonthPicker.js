define('melon-wise/lib/MonthPicker', [
    'require',
    'exports',
    'module',
    'react',
    'react-dom',
    'melon-classname',
    './util/date',
    './monthpicker/SeparatePopup',
    './util/separatePopupHelper',
    './createInputComponent'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var ReactDOM = require('react-dom');
    var cx = require('melon-classname').create('Monthpicker');
    var DateTime = require('./util/date');
    var SeparatePopup = require('./monthpicker/SeparatePopup');
    var popupHelper = require('./util/separatePopupHelper');
    var PropTypes = React.PropTypes;
    var MonthPicker = React.createClass({
        displayName: 'MonthPicker',
        getInitialState: function getInitialState() {
            return { date: this.parseDate(this.props.value) };
        },
        componentDidMount: function componentDidMount() {
            this.container = popupHelper.createPopup({ className: cx().part('popup').build() });
            this.renderPopup(false);
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            var value = nextProps.value;
            if (value !== this.props.value) {
                this.setState({ date: this.parseDate(value) });
            }
        },
        componentWillUnmount: function componentWillUnmount() {
            popupHelper.destoryPopup(this.container);
            this.container = null;
        },
        parseDate: function parseDate(date) {
            if (!date) {
                return new Date();
            }
            if (DateTime.isDateObject(date)) {
                return date;
            }
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.parse(date, format);
        },
        stringifyValue: function stringifyValue(date) {
            if (!DateTime.isDateObject(date)) {
                return date;
            }
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.format(date, format, this.props.lang);
        },
        onClick: function onClick(e) {
            this.renderPopup(true);
        },
        onDateChange: function onDateChange(_ref) {
            var value = _ref.value;
            this.setState({ date: value });
            var onChange = this.props.onChange;
            onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(value)
            });
        },
        renderPopup: function renderPopup(isOpen) {
            var _this = this;
            var _props = this.props;
            var begin = _props.begin;
            var end = _props.end;
            var endDate = end ? this.parseDate(end) : new Date();
            var beginDate = begin ? this.parseDate(begin) : DateTime.addYears(endDate, -80);
            ReactDOM.render(React.createElement(SeparatePopup, {
                show: isOpen,
                transitionTimeout: 300,
                transitionType: 'translate',
                direction: 'bottom',
                begin: beginDate,
                end: endDate,
                date: this.state.date,
                onHide: function onHide() {
                    _this.renderPopup(false);
                },
                onChange: this.onDateChange
            }), this.container);
        },
        renderResult: function renderResult() {
            var value = this.props.value;
            return value ? React.createElement('div', { className: cx().part('result').build() }, value) : null;
        },
        renderLabel: function renderLabel() {
            var label = this.props.label;
            return label ? React.createElement('label', null, label) : null;
        },
        renderHiddenInput: function renderHiddenInput() {
            var name = this.props.name;
            var date = this.state.date;
            return React.createElement('input', {
                type: 'hidden',
                name: name,
                value: this.stringifyValue(date)
            });
        },
        render: function render() {
            return React.createElement('div', {
                className: cx(this.props).build(),
                onClick: this.onClick
            }, this.renderLabel(), this.renderResult(), this.renderHiddenInput());
        }
    });
    MonthPicker.LANG = {
        week: '\u5468',
        days: '\u65E5,\u4E00,\u4E8C,\u4E09,\u56DB,\u4E94,\u516D'
    };
    MonthPicker.propTypes = {
        value: PropTypes.string,
        dateFormat: PropTypes.string,
        lang: PropTypes.shape({
            week: PropTypes.string,
            days: PropTypes.string
        }),
        end: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string
        ]),
        begin: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string
        ])
    };
    MonthPicker.defaultProps = {
        defaultValue: DateTime.format(new Date(), 'yyyy-mm', MonthPicker.LANG),
        dateFormat: 'yyyy-MM',
        lang: MonthPicker.LANG
    };
    module.exports = require('./createInputComponent').create(MonthPicker);
});