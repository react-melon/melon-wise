/**
 * @file melon example main
 * @author leon(ludafa@outlook.com)
 */

import React from 'react';
import NavigationBar from 'melon-wise/NavigationBar';
import View from 'melon-wise/View';

const App = React.createClass({

    render() {
        const Component = this.props.Component;
        return (
            <View renderHeader={this.renderHeader}>
                {this.renderContent(Component)}
            </View>
        );
    },

    renderHeader() {
        return <NavigationBar title={this.props.name} />;
    },

    renderContent(Component) {
        return Component
            ? React.createElement(Component)
            : '加载中~';
    }
});

module.exports = App;
