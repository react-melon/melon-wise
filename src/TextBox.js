/**
 * @file TextBox
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import InputComponent from 'melon-core/InputComponent';
import NativeInputComponent from './common/NativeInputComponent';
import Validity from 'melon-core/Validity';

const cx = create('TextBox');

export default class TextBox extends NativeInputComponent {

    renderLabel() {
        const label = this.props.label;

        return label ? (
            <label>{label}</label>
        ) : null;
    }

    onFocus(e) {
        const onFocus = this.props.onFocus;
        this.input.scrollIntoView();
        onFocus && onFocus(e);
    }

    render() {

        const unit = this.props.unit;

        return (
            <div {...this.props} className={cx(this.props).addStates(this.getStyleStates()).build()}>
                {this.renderLabel()}
                <input
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    autoComplete="off"
                    ref={input => {
                        this.input = input;
                    }} />
                {unit ? <div className={cx.getPartClassName('unit')}>{unit}</div> : null}
                <Validity validity={this.state.validity} />
            </div>
        );

    }
}

TextBox.displayName = 'TextBox';

TextBox.propTypes = {
    ...InputComponent.propTypes,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    validateEvents: PropTypes.array
};

TextBox.defaultProps = {
    ...InputComponent.defaultProps,
    defaultValue: '',
    validateEvents: ['change', 'blur']
};
