define('melon-wise/row/Span', [
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
    var cx = require('../util/cxBuilder').create('RowSpan');
    function RowSpan(props) {
        var occupy = props.occupy;
        var style = props.style;
        var columnNum = props.columnNum;
        var noGap = props.noGap;
        var other = babelHelpers.objectWithoutProperties(props, [
            'occupy',
            'style',
            'columnNum',
            'noGap'
        ]);
        style = babelHelpers._extends({
            width: occupy / columnNum * 100 + '%',
            WebkitBoxFlex: occupy,
            WebkitFlex: [
                occupy,
                occupy,
                'auto'
            ].join(' ')
        }, style);
        if (!noGap) {
            var padding = 20 / (columnNum - 1) + '%';
            style = babelHelpers._extends({}, style, {
                paddingLeft: padding,
                paddingRight: padding
            });
        }
        return _react2.default.createElement('div', babelHelpers._extends({}, other, {
            className: cx(props).build(),
            style: style
        }));
    }
    RowSpan.propsTypes = { occupy: _react2.default.PropTypes.number.isRequired };
    RowSpan.defaultProps = { occupy: 4 };
    exports.default = RowSpan;
    module.exports = exports.default;
});