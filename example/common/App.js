/**
 * @file melon example main
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const NavigationBar = require('melon-wise/NavigationBar');
const View = require('melon-wise/View');

const App = React.createClass({

    render() {
        const {Component} = this.props;
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
