/**
 * @file esui-react Tabs Panel
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('../util/cxBuilder').create('TabPanel');

function TabPanel(props) {

    let {
        active,
        ...others
    } = props;

    return (
        <div {...props} className={cx(props).addStates({active}).build()} />
    );

}

module.exports = TabPanel;
