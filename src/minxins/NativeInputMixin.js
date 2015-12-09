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
        const newValue = e.target.value;
        const {value} = this.props;

        if (value !== newValue) {

            const {onChange} = this.props;

            onChange({
                type: 'change',
                target: this,
                value: newValue
            });
        }
    }

};
