define('melon/monthpicker/Panel', [
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
    var cx = _utilCxBuilder2.default.create('MonthpickerPanel');
    var MonthPickerPanel = function MonthPickerPanel(props) {
        var children = props.children;
        var rest = babelHelpers.objectWithoutProperties(props, ['children']);
        return _react2.default.createElement('div', babelHelpers._extends({}, rest, { className: cx(props).build() }), _react2.default.createElement('div', { className: cx(props).part('bgwrapper').build() }), children);
    };
    MonthPickerPanel.displayName = 'MonthPickerPanel';
    exports.default = MonthPickerPanel;
    module.exports = exports.default;
});