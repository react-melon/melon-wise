/**
 * @file melon demo MonthPicker
 * @author cxtom(cxtom2008@gmail.com)
 */

const React = require('react');

const MonthPicker = require('melon-wise/MonthPicker');

const View = React.createClass({

    getInitialState() {
        return {
            value: ''
        };
    },

    onChange({value}) {
        this.setState({value});
    },

    render() {
        return (
            <div className="example-monthpicker">
                <MonthPicker
                    label={'日期'}
                    variants={['bottom-1px-border']}
                    value={this.state.value}
                    onChange={this.onChange} />
            </div>
        );
    }

});

module.exports = View;
