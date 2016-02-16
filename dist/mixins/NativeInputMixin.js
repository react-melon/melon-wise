define('melon-wise/lib/mixins/NativeInputMixin', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    'use strict';
    module.exports = {
        onChange: function onChange(e) {
            var value = e.target.value;
            var onChange = this.props.onChange;
            onChange({
                type: 'change',
                target: this,
                value: value
            });
        },
        onBlur: function onBlur(e) {
            var value = e.target.value;
            var onBlur = this.props.onBlur;
            onBlur && onBlur({
                type: 'blur',
                target: this,
                value: value
            });
        }
    };
});