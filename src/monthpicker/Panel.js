/**
 * @file monthpicker Panel
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';

import cxBuilder from '../util/cxBuilder';

const cx = cxBuilder.create('MonthpickerPanel');

let MonthPickerPanel = function MonthPickerPanel(props) {

    const {children, ...rest} = props;

    return (
        <div {...rest} className={cx(props).build()}>
            <div className={cx(props).part('bgwrapper').build()} />
            {children}
        </div>
    );

};

MonthPickerPanel.displayName = 'MonthPickerPanel';

export default MonthPickerPanel;
