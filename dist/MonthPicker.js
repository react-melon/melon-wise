define('melon/MonthPicker', [
    'require',
    'exports',
    'module',
    'react',
    'react-dom',
    './util/cxBuilder',
    './util/date',
    './monthpicker/SeperatePopup',
    './createInputComponent'
], function (require, exports, module) {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var cx = require('./util/cxBuilder').create('Monthpicker');
    var DateTime = require('./util/date');
    var SeperatePopup = require('./monthpicker/SeperatePopup');
    var MonthPicker = React.createClass({
        displayName: 'MonthPicker',
        getInitialState: function () {
            var value = this.props.value;
            return { date: this.parseDate(value) };
        },
        componentDidMount: function () {
            var container = this.container = document.createElement('div');
            container.className = cx().part('popup').build();
            document.body.appendChild(container);
            this.renderPopup(false);
        },
        componentWillUnmount: function () {
            var container = this.container;
            if (container) {
                ReactDOM.unmountComponentAtNode(container);
                container.parentElement.removeChild(container);
                this.popup = this.container = container = null;
            }
        },
        parseDate: function (date) {
            if (!date) {
                return null;
            }
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.parse(date, format);
        },
        stringifyValue: function (rawValue) {
            if (rawValue == null) {
                return '';
            }
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.format(rawValue, format, this.props.lang);
        },
        onClick: function (e) {
            this.renderPopup(true);
        },
        onDateChange: function (_ref) {
            var _this = this;
            var value = _ref.value;
            this.setState({ date: value }, function () {
                var onChange = _this.props.onChange;
                onChange({
                    type: 'change',
                    target: _this,
                    value: _this.stringifyValue(value)
                });
            });
        },
        renderPopup: function (isOpen) {
            var _this2 = this;
            var popup = React.createElement(SeperatePopup, {
                show: isOpen,
                transitionTimeout: 300,
                transitionType: 'translate',
                direction: 'bottom',
                date: this.props.value ? this.state.date : new Date(),
                onHide: function () {
                    _this2.renderPopup(false);
                },
                onChange: this.onDateChange
            });
            ReactDOM.render(popup, this.container);
        },
        renderResult: function () {
            var value = this.props.value;
            return value ? React.createElement('div', { className: cx().part('result').build() }, value) : null;
        },
        renderLabel: function () {
            var label = this.props.label;
            return label ? React.createElement('label', null, label) : null;
        },
        renderHiddenInput: function () {
            var name = this.props.name;
            var date = this.state.date;
            return React.createElement('input', {
                type: 'hidden',
                style: { display: 'none' },
                onChange: this.onChange,
                name: name,
                value: this.stringifyValue(date)
            });
        },
        render: function () {
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
    MonthPicker.defaultProps = {
        defaultValue: DateTime.format(new Date(), 'yyyy-mm', MonthPicker.LANG),
        dateFormat: 'yyyy-MM',
        lang: MonthPicker.LANG
    };
    module.exports = require('./createInputComponent').create(MonthPicker);
});