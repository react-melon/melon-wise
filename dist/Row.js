define('melon-wise/lib/Row', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname',
    './row/Span'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var cx = require('melon-classname').create('Row');
    function Row(props) {
        var columnNum = props.columnNum;
        var noGap = props.noGap;
        var margin = -20 / (columnNum - 1) + '%';
        var style = noGap ? null : {
            marginLeft: margin,
            marginRight: margin
        };
        return _react2.default.createElement('div', babelHelpers._extends({}, props, {
            className: cx(props).build(),
            style: style
        }), _react2.default.Children.map(props.children, function (child, index) {
            return _react2.default.cloneElement(child, {
                key: index,
                columnNum: columnNum,
                noGap: noGap
            });
        }));
    }
    Row.displayName = 'Row';
    Row.propTypes = {
        columnNum: _react.PropTypes.number,
        noGap: _react.PropTypes.bool
    };
    Row.defaultProps = {
        columnNum: 12,
        noGap: false
    };
    Row.Span = require('./row/Span');
    exports.default = Row;
    module.exports = exports.default;
});