/**
 * @file esui-react/Select
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('Select');

let Select = React.createClass({

    displayName: 'Select',

    onChange(e) {

        let value = e.target.value;

        let {onChange} = this.props;

        onChange({
            type: 'change',
            target: this,
            value
        });
    },

    render() {

        let {
            label,
            options,
            className,
            children,
            ...rest
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                <label>{label}</label>
                <select {...rest} onChange={this.onChange}>
                    {children}
                </select>
            </div>
        );

    }

});

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
