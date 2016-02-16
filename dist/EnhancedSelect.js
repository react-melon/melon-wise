define('melon-wise/lib/EnhancedSelect', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    'melon-classname',
    './util/separatePopupHelper',
    './enhancedselect/SeparatePopup',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var ReactDOM = require('react-dom');
    var cx = require('melon-classname').create('EnhancedSelect');
    var popupHelper = require('./util/separatePopupHelper');
    var SeparatePopup = require('./enhancedselect/SeparatePopup');
    var EnhancedSelect = function (_React$Component) {
        babelHelpers.inherits(EnhancedSelect, _React$Component);
        function EnhancedSelect(props) {
            babelHelpers.classCallCheck(this, EnhancedSelect);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EnhancedSelect).call(this, props));
            var items = props.items;
            var value = props.value;
            _this.state = { selectedIndex: _this.getSelectedIndex(items, value) };
            _this.onClick = _this.onClick.bind(_this);
            _this.onChange = _this.onChange.bind(_this);
            return _this;
        }
        babelHelpers.createClass(EnhancedSelect, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.container = popupHelper.createPopup({ className: cx().part('popup').build() });
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
                    this.setState({ selectedIndex: index });
                    this.props.onChange({
                        type: 'change',
                        target: this,
                        value: value
                    });
                }
            },
            {
                key: 'onClick',
                value: function onClick() {
                    this.renderPopup(true);
                }
            },
            {
                key: 'getSelectedIndex',
                value: function getSelectedIndex(items, value) {
                    for (var i = items.length - 1; i >= 0; i--) {
                        if (items[i].value === value) {
                            return i;
                        }
                    }
                    return;
                }
            },
            {
                key: 'renderPopup',
                value: function renderPopup(isShow) {
                    var _this2 = this;
                    var items = this.props.items;
                    ReactDOM.render(React.createElement(SeparatePopup, {
                        show: isShow,
                        selectedIndex: this.state.selectedIndex,
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
                    var value = _props.value;
                    var items = _props.items;
                    var selectedIndex = this.state.selectedIndex;
                    return value ? React.createElement('div', { className: cx().part('result').build() }, items[selectedIndex].name) : null;
                }
            },
            {
                key: 'renderLabel',
                value: function renderLabel() {
                    var label = this.props.label;
                    return label ? React.createElement('label', { className: cx().part('label').build() }, label) : null;
                }
            },
            {
                key: 'renderHiddenInput',
                value: function renderHiddenInput() {
                    var _props2 = this.props;
                    var items = _props2.items;
                    var name = _props2.name;
                    var selectedIndex = this.state.selectedIndex;
                    return React.createElement('input', {
                        type: 'hidden',
                        name: name,
                        value: selectedIndex == null ? '' : items[selectedIndex].value
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    return React.createElement('div', {
                        className: cx(this.props).build(),
                        onClick: this.onClick
                    }, this.renderLabel(), this.renderResult(), this.renderHiddenInput());
                }
            }
        ]);
        return EnhancedSelect;
    }(React.Component);
    var PropTypes = React.PropTypes;
    EnhancedSelect.displayName = 'EnhancedSelect';
    EnhancedSelect.propTypes = {
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        label: PropTypes.string,
        onChange: PropTypes.func,
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string
        })).isRequired,
        itemBorder: PropTypes.bool
    };
    EnhancedSelect.defaultProps = { defaultValue: '' };
    module.exports = require('./createInputComponent').create(EnhancedSelect);
});