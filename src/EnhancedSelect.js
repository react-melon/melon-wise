/**
 * @file EnhancedSelect
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const popupHelper = require('./util/separatePopupHelper');
const cx = require('melon-classname').create('EnhancedSelect');

class EnhancedSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.container = popupHelper.createPopup({
            className: cx().part('popup').build()
        });
        this.renderPopup(false);
    }

    componentWillUnmount() {
        popupHelper.destoryPopup(this.container);
        this.container = null;
    }

    renderPopup(isShow) {

    }

    render() {

    }
}

EnhancedSelect.displayName = 'EnhancedSelect';

module.exports = EnhancedSelect;
