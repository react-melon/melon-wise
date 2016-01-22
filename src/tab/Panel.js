/**
 * @file esui-react Tabs Panel
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('melon-classname').create('TabPanel');

function TabPanel(props) {

    const {
        active,
        ...others
    } = props;

    return (
        <div {...props} className={cx(props).addStates({active}).build()} />
    );

}

module.exports = TabPanel;
