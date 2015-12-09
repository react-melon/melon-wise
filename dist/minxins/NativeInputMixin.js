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
            var newValue = e.target.value;
            var value = this.props.value;
            if (value !== newValue) {
                var onChange = this.props.onChange;
                onChange({
                    type: 'change',
                    target: this,
                    value: newValue
                });
            }
        }
    };
});