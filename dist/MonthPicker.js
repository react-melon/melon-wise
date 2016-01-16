define('melon-wise/lib/MonthPicker', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './util/cxBuilder',
    './util/date',
    './monthpicker/SeperatePopup',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactDom = require('react-dom');
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    var cx = require('./util/cxBuilder').create('Monthpicker');
    var DateTime = require('./util/date');
    var SeperatePopup = require('./monthpicker/SeperatePopup');
    var MonthPicker = _react2.default.createClass({
        displayName: 'MonthPicker',
        getInitialState: function () {
            return { date: this.parseDate(this.props.value) };
        },
        componentDidMount: function () {
            var container = this.container = document.createElement('div');
            container.className = cx().part('popup').build();
            document.body.appendChild(container);
            this.renderPopup(false);
        },
        componentWillReceiveProps: function (nextProps) {
            var value = nextProps.value;
            if (value !== this.props.value) {
                this.setState({ date: this.parseDate(value) });
            }
        },
        componentWillUnmount: function () {
            var container = this.container;
            if (container) {
                _reactDom2.default.unmountComponentAtNode(container);
                container.parentElement.removeChild(container);
                this.popup = this.container = container = null;
            }
        },
        parseDate: function (date) {
            if (!date) {
                return new Date();
            }
            if (DateTime.isDateObject(date)) {
                return date;
            }
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.parse(date, format);
        },
        stringifyValue: function (date) {
            if (!DateTime.isDateObject(date)) {
                return date;
            }
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.format(date, format, this.props.lang);
        },
        onClick: function (e) {
            this.renderPopup(true);
        },
        onDateChange: function (_ref) {
            var value = _ref.value;
            this.setState({ date: value });
            var onChange = this.props.onChange;
            onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(value)
            });
        },
        renderPopup: function (isOpen) {
            var _this = this;
            var _props = this.props;
            var begin = _props.begin;
            var end = _props.end;
            var endDate = end ? this.parseDate(end) : new Date();
            var beginDate = begin ? this.parseDate(begin) : DateTime.addYears(endDate, -80);
            _reactDom2.default.render(_react2.default.createElement(SeperatePopup, {
                show: isOpen,
                transitionTimeout: 300,
                transitionType: 'translate',
                direction: 'bottom',
                begin: beginDate,
                end: endDate,
                date: this.state.date,
                onHide: function () {
                    _this.renderPopup(false);
                },
                onChange: this.onDateChange
            }), this.container);
        },
        renderResult: function () {
            var value = this.props.value;
            return value ? _react2.default.createElement('div', { className: cx().part('result').build() }, value) : null;
        },
        renderLabel: function () {
            var label = this.props.label;
            return label ? _react2.default.createElement('label', null, label) : null;
        },
        renderHiddenInput: function () {
            var name = this.props.name;
            var date = this.state.date;
            return _react2.default.createElement('input', {
                type: 'hidden',
                style: { display: 'none' },
                onChange: this.onChange,
                name: name,
                value: this.stringifyValue(date)
            });
        },
        render: function () {
            return _react2.default.createElement('div', {
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
        value: _react.PropTypes.string,
        dateFormat: _react.PropTypes.string,
        lang: _react.PropTypes.shape({
            week: _react.PropTypes.string,
            days: _react.PropTypes.string
        }),
        end: _react.PropTypes.oneOfType([
            _react.PropTypes.instanceOf(Date),
            _react.PropTypes.string
        ]),
        begin: _react.PropTypes.oneOfType([
            _react.PropTypes.instanceOf(Date),
            _react.PropTypes.string
        ])
    };
    MonthPicker.defaultProps = {
        defaultValue: DateTime.format(new Date(), 'yyyy-mm', MonthPicker.LANG),
        dateFormat: 'yyyy-MM',
        lang: MonthPicker.LANG
    };
    module.exports = require('./createInputComponent').create(MonthPicker);
});