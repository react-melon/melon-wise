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

    renderPlaceHolder() {

        const {placeholder, value} = this.props;

        return placeholder && value ? (
            <div className={cx().part('placeholder').build()}>
                {placeholder}
            </div>
        ) : null;
    },

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
                {this.renderPlaceHolder()}
                <input
                    {...rest}
                    value={value}
                    onChange={this.onChange}
                    ref={(input) => {
                        this.input = input;
                    }} />
                {unit ? <div className={cx().part('unit').build()}>{unit}</div> : null}
            </div>
        );

    }

});

module.exports = require('./createInputComponent').create(TextBox);
