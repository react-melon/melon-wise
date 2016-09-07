(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'melon-core/InputComponent', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('melon-core/InputComponent'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.InputComponent, global.babelHelpers);
        global.NativeInputComponent = mod.exports;
    }
})(this, function (exports, _InputComponent2, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var NativeInputComponent = function (_InputComponent) {
        babelHelpers.inherits(NativeInputComponent, _InputComponent);

        function NativeInputComponent() {
            babelHelpers.classCallCheck(this, NativeInputComponent);
            return babelHelpers.possibleConstructorReturn(this, _InputComponent.apply(this, arguments));
        }

        NativeInputComponent.prototype.onChange = function onChange(e) {

            var value = e.target.value;

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: value
            });
        };

        NativeInputComponent.prototype.onBlur = function onBlur(e) {

            var value = e.target.value;

            var onBlur = this.props.onBlur;

            onBlur && onBlur({
                type: 'blur',
                target: this,
                value: value
            });
        };

        return NativeInputComponent;
    }(_InputComponent3['default']);

    exports['default'] = NativeInputComponent;
});