var babelHelpers = require('../babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/enhancedselect/SeparatePopup', [
            'exports',
            'react',
            'melon-core/classname/cxBuilder',
            '../Popup',
            '../Selector',
            '../common/LockBody'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('../Popup'), require('../Selector'), require('../common/LockBody'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.cxBuilder, global.Popup, global.Selector, global.LockBody);
        global.SeparatePopup = mod.exports;
    }
}(this, function (exports, _react, _cxBuilder, _Popup, _Selector, _LockBody2) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _Popup2 = babelHelpers.interopRequireDefault(_Popup);
    var _Selector2 = babelHelpers.interopRequireDefault(_Selector);
    var _LockBody3 = babelHelpers.interopRequireDefault(_LockBody2);
    var cx = (0, _cxBuilder.create)('EnhancedSelectPopup');
    var SeparatePopup = function (_LockBody) {
        babelHelpers.inherits(SeparatePopup, _LockBody);
        function SeparatePopup(props) {
            babelHelpers.classCallCheck(this, SeparatePopup);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SeparatePopup).call(this, props));
            _this.onChange = _this.onChange.bind(_this);
            _this.onHide = _this.onHide.bind(_this);
            return _this;
        }
        babelHelpers.createClass(SeparatePopup, [
            {
                key: 'onChange',
                value: function onChange(_ref) {
                    var value = _ref.value;
                    var index = _ref.index;
                    this.props.onChange({
                        value: value,
                        index: index,
                        target: this
                    });
                    this.onHide();
                }
            },
            {
                key: 'onHide',
                value: function onHide() {
                    this.props.onHide();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var items = _props.items;
                    var selectedIndex = _props.selectedIndex;
                    var rest = babelHelpers.objectWithoutProperties(_props, [
                        'items',
                        'selectedIndex'
                    ]);
                    return _react2.default.createElement(_Popup2.default, babelHelpers.extends({}, rest, {
                        transitionType: 'translate',
                        direction: 'bottom'
                    }), _react2.default.createElement('div', { className: cx.getPartClassName('panel') }, _react2.default.createElement(_Selector2.default, {
                        items: items,
                        className: cx.getPartClassName('selector'),
                        selectedIndex: selectedIndex,
                        onChange: this.onChange
                    })), _react2.default.createElement('div', {
                        onClick: this.onHide,
                        className: cx.getPartClassName('cancel')
                    }, '\u53D6\u6D88'));
                }
            }
        ]);
        return SeparatePopup;
    }(_LockBody3.default);
    exports.default = SeparatePopup;
    SeparatePopup.displayName = 'EnhancedSelectSeparatePopup', SeparatePopup.propTypes = {
        items: _react.PropTypes.array,
        show: _react.PropTypes.bool,
        onChange: _react.PropTypes.func.isRequired,
        onHide: _react.PropTypes.func.isRequired
    };
}));