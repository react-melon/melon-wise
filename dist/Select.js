(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'melon-core/InputComponent', './common/NativeInputComponent', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('melon-core/InputComponent'), require('./common/NativeInputComponent'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.InputComponent, global.NativeInputComponent, global.babelHelpers);
        global.Select = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _InputComponent, _NativeInputComponent2, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent2 = babelHelpers.interopRequireDefault(_InputComponent);

    var _NativeInputComponent3 = babelHelpers.interopRequireDefault(_NativeInputComponent2);

    /**
     * @file Select
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Select');

    var Select = function (_NativeInputComponent) {
        babelHelpers.inherits(Select, _NativeInputComponent);

        function Select() {
            babelHelpers.classCallCheck(this, Select);
            return babelHelpers.possibleConstructorReturn(this, _NativeInputComponent.apply(this, arguments));
        }

        Select.prototype.renderLabel = function renderLabel() {
            var label = this.props.label;

            return label ? _react2['default'].createElement(
                'label',
                null,
                label
            ) : null;
        };

        Select.prototype.renderResult = function renderResult() {
            var _props = this.props;
            var value = _props.value;
            var children = _props.children;


            var result = '';

            _react.Children.forEach(children, function (child) {
                if (child.props.value === value) {
                    result = child.props.label;
                }
            });

            return value ? _react2['default'].createElement(
                'div',
                { className: cx().part('result').build() },
                result
            ) : null;
        };

        Select.prototype.render = function render() {
            var _this2 = this;

            var _props2 = this.props;
            var children = _props2.children;
            var value = _props2.value;
            var rest = babelHelpers.objectWithoutProperties(_props2, ['children', 'value']);


            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                this.renderLabel(),
                this.renderResult(),
                _react2['default'].createElement(
                    'select',
                    babelHelpers['extends']({}, rest, {
                        value: value,
                        onChange: this.onChange,
                        ref: function ref(input) {
                            _this2.input = input;
                        } }),
                    value ? null : _react2['default'].createElement('option', { label: '未选择', value: '' }),
                    children
                )
            );
        };

        return Select;
    }(_NativeInputComponent3['default']);

    exports['default'] = Select;


    Select.displayName = 'Select';

    Select.propTypes = babelHelpers['extends']({}, _InputComponent2['default'].propTypes, {
        onChange: _react.PropTypes.func,
        defaultValue: _react.PropTypes.string
    });

    Select.defaultProps = babelHelpers['extends']({}, _InputComponent2['default'].defaultProps, {
        defaultValue: ''
    });

    Select.createOptions = function (dataSource) {

        return dataSource.map(function (option, index) {

            return _react2['default'].createElement('option', {
                key: index,
                disabled: option.disabled,
                value: option.value,
                label: option.name });
        });
    };
});