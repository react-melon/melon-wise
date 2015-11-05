define('melon/Row', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component',
    './row/Span'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _Component2 = require('./Component');
    var _Component3 = babelHelpers.interopRequireDefault(_Component2);
    var Row = function (_Component) {
        babelHelpers.inherits(Row, _Component);
        function Row() {
            babelHelpers.classCallCheck(this, Row);
            _Component.apply(this, arguments);
        }
        Row.prototype.getChildContext = function getChildContext() {
            return { columnNum: this.props.columnNum };
        };
        Row.prototype.render = function render() {
            var columnNum = this.props.columnNum;
            var margin = 20 / (columnNum - 1) + '%';
            var style = {
                marginLeft: margin,
                marginRight: margin
            };
            return _react2['default'].createElement('div', babelHelpers._extends({}, this.props, {
                className: this.getClassName(),
                style: style
            }), this.props.children);
        };
        babelHelpers.createClass(Row, null, [
            {
                key: 'displayName',
                value: 'Row',
                enumerable: true
            },
            {
                key: 'childContextTypes',
                value: { columnNum: _react.PropTypes.number.isRequired },
                enumerable: true
            }
        ]);
        return Row;
    }(_Component3['default']);
    Row.defaultProps = { columnNum: 12 };
    Row.propsTypes = { columnNum: _react.PropTypes.number };
    Row.Span = require('./row/Span');
    exports['default'] = Row;
    module.exports = exports['default'];
});