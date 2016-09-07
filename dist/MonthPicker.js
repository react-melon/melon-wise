(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'melon-core/classname/cxBuilder', 'melon-core/InputComponent', 'melon-core/util/syncPropsToState', './util/date', './monthpicker/SeparatePopup', './util/separatePopupHelper', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('melon-core/classname/cxBuilder'), require('melon-core/InputComponent'), require('melon-core/util/syncPropsToState'), require('./util/date'), require('./monthpicker/SeparatePopup'), require('./util/separatePopupHelper'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.cxBuilder, global.InputComponent, global.syncPropsToState, global.date, global.SeparatePopup, global.separatePopupHelper, global.babelHelpers);
        global.MonthPicker = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _cxBuilder, _InputComponent2, _syncPropsToState, _date, _SeparatePopup, _separatePopupHelper, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var DateTime = babelHelpers.interopRequireWildcard(_date);

    var _SeparatePopup2 = babelHelpers.interopRequireDefault(_SeparatePopup);

    var popupHelper = babelHelpers.interopRequireWildcard(_separatePopupHelper);
    /**
     * @file melon-wise/MonthPicker
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('MonthPicker');

    var MonthPicker = function (_InputComponent) {
        babelHelpers.inherits(MonthPicker, _InputComponent);

        function MonthPicker(props, context) {
            babelHelpers.classCallCheck(this, MonthPicker);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            var value = _this.state.value;

            _this.state = babelHelpers['extends']({}, _this.state, {
                date: value ? _this.parseDate(value) : undefined
            });

            _this.onClick = _this.onClick.bind(_this);
            _this.onDateChange = _this.onDateChange.bind(_this);
            return _this;
        }

        MonthPicker.prototype.componentDidMount = function componentDidMount() {
            _InputComponent.prototype.componentDidMount.call(this);
            this.container = popupHelper.createPopup({
                className: cx().part('popup').build()
            });
            this.renderPopup(false);
        };

        MonthPicker.prototype.componentWillUnmount = function componentWillUnmount() {
            _InputComponent.prototype.componentWillUnmount.call(this);
            popupHelper.destoryPopup(this.container);
            this.container = null;
        };

        MonthPicker.prototype.getSyncUpdates = function getSyncUpdates(nextProps) {
            var disabled = nextProps.disabled;
            var readOnly = nextProps.readOnly;
            var customValidity = nextProps.customValidity;
            var defaultValue = nextProps.defaultValue;


            var value = nextProps.value ? nextProps.value : defaultValue;

            // 如果有值，那么就试着解析一下；否则设置为 undefined
            var date = value ? this.parseDate(value) : undefined;

            var vilidity = (0, _syncPropsToState.getNextValidity)(this, { value: value, disabled: disabled, customValidity: customValidity });

            return {
                date: date,
                vilidity: vilidity,
                value: disabled || readOnly || !value ? value : this.stringifyValue(date)
            };
        };

        MonthPicker.prototype.parseDate = function parseDate(date) {

            if (DateTime.isDateObject(date)) {
                return date;
            }

            var format = this.props.dateFormat.toLowerCase();

            return DateTime.parse(date, format);
        };

        MonthPicker.prototype.stringifyValue = function stringifyValue(date) {

            if (!DateTime.isDateObject(date)) {
                return date;
            }

            var format = this.props.dateFormat.toLowerCase();

            return DateTime.format(date, format, this.props.lang);
        };

        MonthPicker.prototype.onClick = function onClick(e) {
            this.renderPopup(true);
        };

        MonthPicker.prototype.onDateChange = function onDateChange(_ref) {
            var value = _ref.value;


            this.setState({ date: value });

            var onChange = this.props.onChange;

            onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(value)
            });
        };

        MonthPicker.prototype.renderPopup = function renderPopup(isOpen) {
            var _this2 = this;

            var _props = this.props;
            var begin = _props.begin;
            var end = _props.end;


            var endDate = end ? this.parseDate(end) : new Date();
            var beginDate = begin ? this.parseDate(begin) : DateTime.addYears(endDate, -80);

            _reactDom2['default'].render(_react2['default'].createElement(_SeparatePopup2['default'], {
                show: isOpen,
                transitionTimeout: 300,
                transitionType: 'translate',
                direction: 'bottom',
                begin: beginDate,
                end: endDate,
                date: this.state.date || new Date(),
                onHide: function onHide() {
                    _this2.renderPopup(false);
                },
                onChange: this.onDateChange }), this.container);
        };

        MonthPicker.prototype.renderResult = function renderResult() {

            var value = this.props.value;

            return value ? _react2['default'].createElement(
                'div',
                { className: cx().part('result').build() },
                value
            ) : null;
        };

        MonthPicker.prototype.renderLabel = function renderLabel() {

            var label = this.props.label;

            return label ? _react2['default'].createElement(
                'label',
                null,
                label
            ) : null;
        };

        MonthPicker.prototype.renderHiddenInput = function renderHiddenInput() {

            var name = this.props.name;
            var date = this.state.date;

            return _react2['default'].createElement('input', {
                type: 'hidden',
                name: name,
                value: this.stringifyValue(date) });
        };

        MonthPicker.prototype.render = function render() {

            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build(), onClick: this.onClick },
                this.renderLabel(),
                this.renderResult(),
                this.renderHiddenInput()
            );
        };

        return MonthPicker;
    }(_InputComponent3['default']);

    exports['default'] = MonthPicker;


    MonthPicker.displayName = 'MonthPicker';

    MonthPicker.propTypes = babelHelpers['extends']({}, MonthPicker.propTypes, {
        dateFormat: _react.PropTypes.string,
        end: _react.PropTypes.oneOfType([_react.PropTypes.instanceOf(Date), _react.PropTypes.string]),
        begin: _react.PropTypes.oneOfType([_react.PropTypes.instanceOf(Date), _react.PropTypes.string])
    });

    MonthPicker.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        defaultValue: '',
        dateFormat: 'yyyy-MM'
    });
});