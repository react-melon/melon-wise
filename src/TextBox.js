/**
 * @file esui-react/TextBox
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('textbox');

const TextBox = React.createClass({

    displayName: 'TextBox',

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
            unit,
            className,
            ...rest
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                <label>{label}</label>
                <input {...rest} onChange={this.onChange} type="text"></input>
                {unit ? <label className={cx().part('unit').build()}>{unit}</label> : null}
            </div>
        );

    }

});

module.exports = require('./createInputComponent').create(TextBox);
