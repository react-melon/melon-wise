/**
 * @file esui-react/TextBox
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('textbox');

const nativeInputMixin = require('./minxins/NativeInputMixin');

const TextBox = React.createClass({

    displayName: 'TextBox',

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
            unit,
            value,
            className,
            ...rest
        } = this.props;

        return (
            <div className={cx(this.props).build()}>
                {this.renderLabel()}
                <input
                    {...rest}
                    value={value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    ref={(input) => {
                        this.input = input;
                    }} />
                {unit ? <div className={cx().part('unit').build()}>{unit}</div> : null}
            </div>
        );

    }

});

module.exports = require('./createInputComponent').create(TextBox);
