define('melon/monthpicker/Selector', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _utilCxBuilder = require('../util/cxBuilder');
    var _utilCxBuilder2 = babelHelpers.interopRequireDefault(_utilCxBuilder);
    var cx = _utilCxBuilder2.default.create('MonthpickerSelector');
    var MonthPickerSelector = _react2.default.createClass({
        displayName: 'MonthPickerSelector',
        propTypes: {
            items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
                name: _react.PropTypes.oneOfType([
                    _react.PropTypes.string,
                    _react.PropTypes.number
                ]),
                value: _react.PropTypes.oneOfType([
                    _react.PropTypes.string,
                    _react.PropTypes.number
                ])
            })),
            onChange: _react.PropTypes.func
        },
        onItemClick: function (value, index, e) {
            var onChange = this.props.onChange;
            onChange && onChange({
                value: value,
                target: this
            });
        },
        renderItems: function () {
            var _this = this;
            var _props = this.props;
            var items = _props.items;
            var selectedIndex = _props.selectedIndex;
            return items.map(function (item, index) {
                return _react2.default.createElement('li', {
                    'data-value': item.value,
                    key: index,
                    onClick: _this.onItemClick.bind(_this, item.value, index),
                    className: cx().part('item').addStates({ selected: selectedIndex === index }).build()
                }, item.name);
            });
        },
        render: function () {
            var props = this.props;
            return _react2.default.createElement('ul', { className: cx(props).build() }, this.renderItems());
        }
    });
    exports.default = MonthPickerSelector;
    module.exports = exports.default;
});