var babelHelpers = require('../babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/common/NativeInputComponent', [
            'exports',
            'melon-core/InputComponent'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('melon-core/InputComponent'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.InputComponent);
        global.NativeInputComponent = mod.exports;
    }
}(this, function (exports, _InputComponent2) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);
    var NativeInputComponent = function (_InputComponent) {
        babelHelpers.inherits(NativeInputComponent, _InputComponent);
        function NativeInputComponent() {
            babelHelpers.classCallCheck(this, NativeInputComponent);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(NativeInputComponent).apply(this, arguments));
        }
        babelHelpers.createClass(NativeInputComponent, [
            {
                key: 'onChange',
                value: function onChange(e) {
                    var value = e.target.value;
                    babelHelpers.get(Object.getPrototypeOf(NativeInputComponent.prototype), 'onChange', this).call(this, {
                        type: 'change',
                        target: this,
                        value: value
                    });
                }
            },
            {
                key: 'onBlur',
                value: function onBlur(e) {
                    var value = e.target.value;
                    var onBlur = this.props.onBlur;
                    onBlur && onBlur({
                        type: 'blur',
                        target: this,
                        value: value
                    });
                }
            }
        ]);
        return NativeInputComponent;
    }(_InputComponent3.default);
    exports.default = NativeInputComponent;
}));