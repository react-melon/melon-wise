/**
 * @file esui-react/Select
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('Select');

const nativeInputMixin = require('./minxins/NativeInputMixin');

let Select = React.createClass({

    displayName: 'Select',

    mixins: [nativeInputMixin],

    renderLabel() {
        const {label} = this.props;

        return label ? (
            <label>
                {label}
            </label>
        ) : null;
    },

    render() {

        let {
            label,
            options,
            className,
            children,
            value,
            ...rest
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                {this.renderLabel()}
                <select
                    {...rest}
                    value={value}
                    onChange={this.onChange}
                    ref={(input) => {
                        this.input = input;
                    }}>
                    {value ? null : <option label="未选择" value="" />}
                    {children}
                </select>
            </div>
        );

    }

});

const {PropTypes} = React;

Select.propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};

Select.defaultProps = {
    defaultValue: ''
};

Select = require('./createInputComponent').create(Select);

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

module.exports = Select;
