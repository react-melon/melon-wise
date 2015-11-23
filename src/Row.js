/**
 * @file main
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import Component from './Component';

class Row extends Component {

    static displayName = 'Row';

    render() {

        let {columnNum} = this.props;
        let margin = -20 / (columnNum - 1) + '%';
        let style = {
            marginLeft: margin,
            marginRight: margin
        };

        return (
            <div {...this.props} className={this.getClassName()} style={style}>
                {React.Children.map(this.props.children, function (child, index) {
                    return React.cloneElement(child, {
                        key: index,
                        columnNum: columnNum
                    });
                })}
            </div>
        );
    }

}

Row.defaultProps = {
    columnNum: 12
};

Row.propsTypes = {
    columnNum: PropTypes.number
};

Row.Span = require('./row/Span');

export default Row;
