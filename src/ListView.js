/**
 * @file ListView
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const cx = require('melon-classname').create('listview');

const DataSource = require('./listview/DataSource');
const StaticRender = require('./listview/StaticRenderer');

const {PropTypes} = React;

class ListView extends React.Component {

    render() {

        const props = this.props;

        const {
            component,
            dataSource,
            renderRow,
            ...rest
        } = props;

        const total = dataSource.dataBlob.length;
        const bodyComponent = dataSource.dataBlob.map(function (row, index) {

            return (
                <StaticRender
                    key={index}
                    shouldUpdate={dataSource.rowShouldUpdate(index)}
                    render={renderRow.bind(
                        null,
                        dataSource.getRowData(index),
                        index,
                        total
                    )}/>
            );
        });

        return React.createElement(
            component,
            {
                ...rest,
                className: cx(props).build()
            },
            bodyComponent
        );

    }

}

ListView.displayName = 'ListView';

ListView.propTypes = {
    renderRow: PropTypes.func.isRequired,
    component: PropTypes.string,
    dataSource: PropTypes.instanceOf(DataSource).isRequired
};

ListView.defaultProps = {
    component: 'div'
};

ListView.DataSource = DataSource;

module.exports = ListView;
