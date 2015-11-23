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
        babelHelpers.createClass(RowSpan, null, [{
                key: 'displayName',
                value: 'RowSpan',
                enumerable: true
            }]);
        function RowSpan(props) {
            babelHelpers.classCallCheck(this, RowSpan);
            _Component.call(this, props);
            this.type = 'row-span';
        }
        RowSpan.prototype.render = function render() {
            var _props = this.props;
            var occupy = _props.occupy;
            var style = _props.style;
            var columnNum = _props.columnNum;
            var other = babelHelpers.objectWithoutProperties(_props, [
                'occupy',
                'style',
                'columnNum'
            ]);
            var padding = 20 / (columnNum - 1) + '%';
            style = babelHelpers._extends({
                paddingLeft: padding,
                paddingRight: padding,
                width: occupy / columnNum * 100 + '%',
                WebkitBoxFlex: occupy,
                WebkitFlex: [
                    occupy,
                    occupy,
                    'auto'
                ].join(' ')
            }, style);
            return _react2['default'].createElement('div', babelHelpers._extends({}, other, {
                className: this.getClassName(),
                style: style
            }), this.props.children);
        };
        return RowSpan;
    }(_Component3['default']);
    RowSpan.defaultProps = { occupy: 4 };
    RowSpan.propsTypes = {
        occupy: _react.PropTypes.number,
        columnNum: _react.PropTypes.number.isRequired
    };
    exports['default'] = RowSpan;
    module.exports = exports['default'];
});