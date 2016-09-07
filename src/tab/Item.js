/**
 * @file Tabs Tab
 * @author cxtom<cxtom2008@gmail.com>
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

import Tappable from 'react-tappable/lib/Tappable';

const cx = create('TabItem');

export default function TabItem(props) {

    const {selected, label, ...others} = props;

    return (
        <Tappable {...others} className={cx(props).addStates({selected}).build()}>
            {label}
        </Tappable>
    );

}
