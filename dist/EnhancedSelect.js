var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/EnhancedSelect', [
            'exports',
            'react',
            'react-dom',
            'melon-core/classname/cxBuilder',
            'melon-core/InputComponent',
            './util/separatePopupHelper',
            './enhancedselect/SeparatePopup'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('react-dom'), require('melon-core/classname/cxBuilder'), require('melon-core/InputComponent'), require('./util/separatePopupHelper'), require('./enhancedselect/SeparatePopup'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.reactDom, global.cxBuilder, global.InputComponent, global.separatePopupHelper, global.SeparatePopup);
        global.EnhancedSelect = mod.exports;
    }
}(this, function (exports, _react, _reactDom, _cxBuilder, _InputComponent2, _separatePopupHelper, _SeparatePopup) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);
    var popupHelper = babelHelpers.interopRequireWildcard(_separatePopupHelper);
    var _SeparatePopup2 = babelHelpers.interopRequireDefault(_SeparatePopup);
    var cx = (0, _cxBuilder.create)('EnhancedSelect');
    var EnhancedSelect = function (_InputComponent) {
        babelHelpers.inherits(EnhancedSelect, _InputComponent);
        function EnhancedSelect(props, context) {
            babelHelpers.classCallCheck(this, EnhancedSelect);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EnhancedSelect).call(this, props, context));
            _this.onChange = _this.onChange.bind(_this);
            return _this;
        }
        babelHelpers.createClass(EnhancedSelect, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.container = popupHelper.createPopup({ className: cx.getPartClassName('popup') });
                    this.renderPopup(false);
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    popupHelper.destoryPopup(this.container);
                    this.container = null;
                }
            },
            {
                key: 'onChange',
                value: function onChange(_ref) {
                    var index = _ref.index;
                    var value = _ref.value;
                    babelHelpers.get(Object.getPrototypeOf(EnhancedSelect.prototype), 'onChange', this).call(this, {
                        type: 'change',
                        target: this,
                        value: value
                    });
                }
            },
            {
                key: 'getSelectedIndex',
                value: function getSelectedIndex(value) {
                    var items = this.props.items;
                    for (var i = 0, len = items.length; i < len; i++) {
                        if (items[i].value === value) {
                            return i;
                        }
                    }
                }
            },
            {
                key: 'renderPopup',
                value: function renderPopup(isShow) {
                    var _this2 = this;
                    var items = this.props.items;
                    _reactDom2.default.render(_react2.default.createElement(_SeparatePopup2.default, {
                        show: isShow,
                        selectedIndex: this.getSelectedIndex(this.state.value),
                        items: items,
                        onChange: this.onChange,
                        onHide: function onHide() {
                            _this2.renderPopup(false);
                        }
                    }), this.container);
                }
            },
            {
                key: 'renderResult',
                value: function renderResult() {
                    var _props = this.props;
                    var placeholder = _props.placeholder;
                    var items = _props.items;
                    var value = this.state.value;
                    var selectedItem = items[this.getSelectedIndex(value)];
                    return selectedItem && value ? _react2.default.createElement('div', { className: cx.getPartClassName('result') }, selectedItem.name) : _react2.default.createElement('div', { className: cx.getPartClassName('label-placeholder') }, placeholder);
                }
            },
            {
                key: 'renderLabel',
                value: function renderLabel() {
                    var label = this.props.label;
                    return label ? _react2.default.createElement('label', { className: cx().part('label').build() }, label) : null;
                }
            },
            {
                key: 'renderHiddenInput',
                value: function renderHiddenInput() {
                    return _react2.default.createElement('input', {
                        type: 'hidden',
                        name: name,
                        value: this.state.value
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this3 = this;
                    return _react2.default.createElement('div', {
                        className: cx(this.props).build(),
                        onClick: function onClick() {
                            return _this3.renderPopup(true);
                        }
                    }, this.renderLabel(), this.renderResult(), this.renderHiddenInput());
                }
            }
        ]);
        return EnhancedSelect;
    }(_InputComponent3.default);
    exports.default = EnhancedSelect;
    EnhancedSelect.displayName = 'EnhancedSelect';
    EnhancedSelect.propTypes = babelHelpers.extends({}, _InputComponent3.default.propTypes, {
        label: _react.PropTypes.string,
        items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            name: _react.PropTypes.string,
            value: _react.PropTypes.string
        })).isRequired
    });
    EnhancedSelect.defaultProps = babelHelpers.extends({}, _InputComponent3.default.defaultProps, { defaultValue: '' });
}));