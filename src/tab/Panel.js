/**
 * @file TabPanel
 * @author cxtom<cxtom2008@gmail.com>
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('TabPanel');

export default function TabPanel(props) {

    const className = cx(props)
        .addStates({
            active: props.active
        })
        .build();

    return (
        <div {...props} className={className} />
    );

}
