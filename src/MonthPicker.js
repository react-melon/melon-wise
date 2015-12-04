/**
 * @file esui-react/MonthPicker
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('Monthpicker');

const MonthPicker = React.createClass({

    displayName: 'MonthPicker',


    renderPlaceHolder() {

        const {placeholder, value} = this.props;

        return placeholder && value ? null : (
            <div className={cx().part('placeholder').build()}>
                {placeholder}
            </div>
        );
    },

    renderLabel() {
        const {label} = this.props;

        return label ? null : (
            <label>
                {label}
            </label>
        );
    },

    render() {

        let {
            label,
            options,
            unit,
            className,
            ...rest
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                {this.renderLabel()}
                {this.renderPlaceHolder()}
            </div>
        );

    }

});

module.exports = require('./createInputComponent').create(MonthPicker);
