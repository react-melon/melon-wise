/**
 * @file NativeInputComponent
 * @author cxtom(cxtom2008@gmail.com)
 */

import InputComponent from 'melon-core/InputComponent';

export default class NativeInputComponent extends InputComponent {

    onChange(e) {

        const value = e.target.value;

        super.onChange({
            type: 'change',
            target: this,
            value
        });
    }

    onBlur(e) {

        const value = e.target.value;

        const onBlur = this.props.onBlur;

        onBlur && onBlur({
            type: 'blur',
            target: this,
            value
        });
    }

}
