/**
 * @file Select
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes, Children} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import InputComponent from 'melon-core/InputComponent';
import NativeInputComponent from './common/NativeInputComponent';

const cx = create('Select');

export default class Select extends NativeInputComponent {

    renderLabel() {
        const label = this.props.label;

        return label ? (
            <label>{label}</label>
        ) : null;
    }

    renderResult() {

        const {value, children} = this.props;

        let result = '';

        Children.forEach(children, function (child) {
            if (child.props.value === value) {
                result = child.props.label;
            }
        });

        return value ? (
            <div className={cx().part('result').build()}>
                {result}
            </div>
        ) : null;
    }

    render() {

        let {
            children,
            value,
            ...rest
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                {this.renderLabel()}
                {this.renderResult()}
                <select
                    {...rest}
                    value={value}
                    onChange={this.onChange}
                    ref={input => {
                        this.input = input;
                    }}>
                    {value ? null : <option label="未选择" value="" />}
                    {children}
                </select>
            </div>
        );

    }

}

Select.displayName = 'Select';

Select.propTypes = {
    ...InputComponent.propTypes,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};

Select.defaultProps = {
    ...InputComponent.defaultProps,
    defaultValue: ''
};

Select.createOptions = function (dataSource) {

    return dataSource.map(function (option, index) {

        return (
            <option
                key={index}
                disabled={option.disabled}
                value={option.value}
                label={option.name} />
        );

    });

};
