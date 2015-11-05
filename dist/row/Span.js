define('melon/row/Span', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _Component2 = require('../Component');
    var _Component3 = babelHelpers.interopRequireDefault(_Component2);
    var RowSpan = function (_Component) {
        babelHelpers.inherits(RowSpan, _Component);
        babelHelpers.createClass(RowSpan, null, [
            {
                key: 'displayName',
                value: 'RowSpan',
                enumerable: true
            },
            {
                key: 'contextTypes',
                value: { columnNum: _react.PropTypes.number.isRequired },
                enumerable: true
            }
        ]);
        function RowSpan(props) {
            babelHelpers.classCallCheck(this, RowSpan);
            _Component.call(this, props);
            this.type = 'row-span';
        }
        RowSpan.prototype.render = function render() {
            var occupy = this.props.occupy;
            var columnNum = this.context.columnNum;
            var padding = 20 / (columnNum - 1) + '%';
            var style = {
                paddingLeft: padding,
                paddingRight: padding,
                width: occupy / columnNum * 100 + '%',
                WebkitBoxFlex: occupy,
                WebkitFlex: [
                    occupy,
                    occupy,
                    'auto'
                ].join(' ')
            };
            return _react2['default'].createElement('div', babelHelpers._extends({}, this.props, {
                className: this.getClassName(),
                style: style
            }), this.props.children);
        };
        return RowSpan;
    }(_Component3['default']);
    RowSpan.defaultProps = { occupy: 4 };
    RowSpan.propsTypes = { occupy: _react.PropTypes.number };
    exports['default'] = RowSpan;
    module.exports = exports['default'];
});