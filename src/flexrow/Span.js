/**
 * @file flexrow/span
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('FlexRowSpan');

export default function FlexRowSpan(props) {

    let {
        occupy,
        style,
        columnNum,
        noGap,
        ...other
    } = props;

    style = {
        width: (occupy / columnNum) * 100 + '%',
        WebkitBoxFlex: occupy,
        WebkitFlex: [occupy, occupy, 'auto'].join(' '),
        ...style
    };

    if (!noGap) {
        let padding = 20 / (columnNum - 1) + '%';
        style = {
            ...style,
            paddingLeft: padding,
            paddingRight: padding
        };
    }

    return (
        <div {...other} className={cx(props).build()} style={style} />
    );
}

FlexRowSpan.displayName = 'FlexRowSpan';

FlexRowSpan.propsTypes = {
    occupy: PropTypes.number.isRequired
};

FlexRowSpan.defaultProps = {
    occupy: 4
};
