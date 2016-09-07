/**
 * @file melon demo MonthPicker
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import MonthPicker from '../src/MonthPicker';

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
