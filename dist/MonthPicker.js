define('melon/MonthPicker', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './util/cxBuilder',
    './util/date',
    './Popup',
    './ScrollView',
    './minxins/NativeInputMixin',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var cx = require('./util/cxBuilder').create('Monthpicker');
    var DateTime = require('./util/date');
    var Popup = require('./Popup');
    var ScrollView = require('./ScrollView');
    var nativeInputMixin = require('./minxins/NativeInputMixin');
    var MonthPicker = React.createClass({
        displayName: 'MonthPicker',
        mixins: [nativeInputMixin],
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
                ReactDOM.unmountComponentAtNode(container);
                container.parentElement.removeChild(container);
                this.popup = this.container = container = null;
            }
        },
        parseDate: function (date) {
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.parse(date, format);
        },
        stringifyValue: function (rawValue) {
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.format(rawValue, format, this.props.lang);
        },
        onClick: function (e) {
            this.renderPopup(true);
        },
        renderPopup: function (isOpen) {
            var popup = React.createElement(Popup, {
                show: isOpen,
                transitionTimeout: 300,
                transitionType: 'translate',
                direction: 'bottom'
            }, 'Hello');
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
                name: name,
                value: this.stringifyValue(date),
                onChange: this.onChange
            });
        },
        render: function () {
            var _props = this.props;
            var label = _props.label;
            var className = _props.className;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'label',
                'className'
            ]);
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
        value: DateTime.format(new Date(), 'yyyy/mm', MonthPicker.LANG),
        dateFormat: 'yyyy/MM',
        lang: MonthPicker.LANG
    };
    module.exports = require('./createInputComponent').create(MonthPicker);
});