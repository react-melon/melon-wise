/**
 * @file InputMixin
 * @author cxtom(cxtom2010@gmail.com)
 */

module.exports = {

    onChange(e) {

        let value = e.target.value;

        let {onChange} = this.props;

        onChange({
            type: 'change',
            target: this,
            value
        });
    }

};
