/**
 * @file esui-react/Select
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('select');

const Select = React.createClass({

    displayName: 'Select',

    onChange(e) {

        let value = e.target.value;

        let {onChange} = this.props;

        onChange && onChange({
            ...e,
            value
        });
    },

    render() {

        let {
            label,
            options,
            renderOptions,
            className,
            ...rest
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                <label>{label}</label>
                <select {...rest} onChange={this.onChange}>
                    {renderOptions()}
                </select>
            </div>
        );

    }

});

module.exports = Select;
