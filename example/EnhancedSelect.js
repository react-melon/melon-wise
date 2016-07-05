/**
 * @file melon demo EnhancedSelect
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import EnhancedSelect from 'melon-wise/EnhancedSelect';

const items = [{
    value: '01',
    name: '上班族'
}, {
    value: '02',
    name: '企业主'
}, {
    value: '03',
    name: '农民'
}, {
    value: '04',
    name: '学生'
}, {
    value: '05',
    name: '个体户'
}, {
    value: '06',
    name: '无固定职业'
}, {
    value: '07',
    name: '公务员'
}];

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
            <div className="example-enhanced-select">
                <EnhancedSelect
                    variants={['bottom-1px-border']}
                    items={items}
                    value={this.state.value}
                    onChange={this.onChange} />
            </div>
        );
    }

});

module.exports = View;
