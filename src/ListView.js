/**
 * @file ListView
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {PropTypes, Component} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

import DataSource from './listview/DataSource';
import StaticRender from './listview/StaticRenderer';

const cx = create('ListView');

export default class ListView extends Component {

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
