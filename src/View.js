/**
 * @file esui-react/View
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('View');

const View = React.createClass({

    displayName: 'View',

    render() {

        const {props} = this;

        return (
            <div
                {...props}
                ref="main"
                className={cx(props).build()} />
        );
    }

});


module.exports = View;
