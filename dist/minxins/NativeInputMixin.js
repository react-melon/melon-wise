define('melon/minxins/NativeInputMixin', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = {
        onChange: function (e) {
            var value = e.target.value;
            var onChange = this.props.onChange;
            onChange({
                type: 'change',
                target: this,
                value: value
            });
        },
        onBlur: function (e) {
            var value = e.target.value;
            var onBlur = this.props.onBlur;
            onBlur({
                type: 'blur',
                target: this,
                value: value
            });
        }
    };
});