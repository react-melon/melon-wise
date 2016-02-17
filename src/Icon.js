/**
 * @file melon-wise/Icon
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('melon-classname').create('Icon');

function Icon(props) {

    return (
        <i {...props} className={cx(props).build()} />
    );

}

module.exports = Icon;
