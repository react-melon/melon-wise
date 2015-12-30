/**
 * @file esui-react/TextBox
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('textbox');

const nativeInputMixin = require('./mixins/NativeInputMixin');

const TextBox = React.createClass({

    displayName: 'TextBox',

    mixins: [nativeInputMixin],

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    },

    renderLabel() {
        const {label} = this.props;

        return label ? (
            <label>
                {label}
            </label>
        ) : null;
    },

    onFocus(e) {
        const {target} = e;
        const {onFocus} = this.props;

        this.timer = setTimeout(() => {
            target.scrollIntoView();
        }, 100);

        onFocus && onFocus();
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
                    onFocus={this.onFocus}
                    ref={(input) => {
                        this.input = input;
                    }} />
                {unit ? <div className={cx().part('unit').build()}>{unit}</div> : null}
            </div>
        );

    }

});

const {PropTypes} = React;

TextBox.propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};

TextBox.defaultProps = {
    defaultValue: ''
};

module.exports = require('./createInputComponent').create(TextBox);
