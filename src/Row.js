/**
 * @file main
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';

const cx = require('./util/cxBuilder').create('Row');

function Row(props) {

    let {columnNum} = props;
    let margin = -20 / (columnNum - 1) + '%';
    let style = {
        marginLeft: margin,
        marginRight: margin
    };

    return (
        <div {...props} className={cx(props).build()} style={style}>
            {React.Children.map(props.children, function (child, index) {
                return React.cloneElement(child, {
                    key: index,
                    columnNum: columnNum
                });
            })}
        </div>
    );

}

Row.displayName = 'Row';

Row.propTypes = {
    columnNum: PropTypes.number
};

Row.defaultProps = {
    columnNum: 12
};

Row.Span = require('./row/Span');

export default Row;
