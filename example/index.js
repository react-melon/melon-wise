/**
 * @file melon demo EnhancedSelect
 * @author cxtom (cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import EnhancedSelect from './EnhancedSelect';
import MonthPicker from './MonthPicker';

import Title from '../src/Title';

import './main.styl';

class App extends React.Component {

    render() {

        return (
            <main>
                <Title>melon-wise</Title>
                <div className="row">
                    <Title level={2}>MonthPciker</Title>
                    <MonthPicker />
                </div>
                <div className="row">
                    <Title level={2}>EnhancedSelect</Title>
                    <EnhancedSelect />
                </div>
            </main>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
