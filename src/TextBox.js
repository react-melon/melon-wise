/**
 * @file esui-react/TextBox
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var InputComponent = require('./InputComponent');

class TextBox extends InputComponent {

    static displayName = 'TextBox';

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        // super.onChange(e);

        let value = e.target.value;

        let {onChange} = this.props;

        onChange && onChange({
            ...e,
            value
        });
    }

    render() {

        let {
            label,
            options,
            unit,
            className,
            ...rest
        } = this.props;

        return (
            <div className={this.getClassName()}>
                <label>{label}</label>
                <input {...rest} onChange={this.onChange} type="text"></input>
                {unit ? <label className={this.getPartClassName('unit')}>{unit}</label> : null}
            </div>
        );

    }

}

module.exports = TextBox;
