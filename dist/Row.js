define('melon/Row', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder',
    './row/Span'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var cx = require('./util/cxBuilder').create('Row');
    function Row(props) {
        var columnNum = props.columnNum;
        var margin = -20 / (columnNum - 1) + '%';
        var style = {
            marginLeft: margin,
            marginRight: margin
        };
        return _react2.default.createElement('div', babelHelpers._extends({}, props, {
            className: cx(props).build(),
            style: style
        }), _react2.default.Children.map(props.children, function (child, index) {
            return _react2.default.cloneElement(child, {
                key: index,
                columnNum: columnNum
            });
        }));
    }
    Row.displayName = 'Row';
    Row.propTypes = { columnNum: _react.PropTypes.number };
    Row.defaultProps = { columnNum: 12 };
    Row.Span = require('./row/Span');
    exports.default = Row;
    module.exports = exports.default;
});