/**
 * @file InputMixin
 * @author cxtom(cxtom2010@gmail.com)
 */

module.exports = {

    onChange(e) {

        const value = e.target.value;

        const {onChange} = this.props;

        onChange({
            type: 'change',
            target: this,
            value
        });
    },

    onBlur(e) {

        const value = e.target.value;

        const {onBlur} = this.props;

        onBlur({
            type: 'blur',
            target: this,
            value
        });
    }

};
