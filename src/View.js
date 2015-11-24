/**
 * @file esui-react/View
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('View');

function View(props) {

    return (
        <div {...props} className={cx(props).build()} />
    );

}


module.exports = View;
