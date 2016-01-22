/**
 * @file SeparatePopup Mixin
 * @author cxtom(cxtom2010@gmail.com)
 */

const ReactDOM = require('react-dom');
const domUtil = require('../util/dom');

module.exports = {

    componentDidMount() {
        domUtil.on(document.body, 'touchmove', this.onTouchMove);
    },

    componentWillUnmount() {
        domUtil.off(document.body, 'touchmove', this.onTouchMove);
    },

    onTouchMove(e) {
        const {target} = e;
        const main = ReactDOM.findDOMNode(this);

        if (!domUtil.contains(main, target) && this.props.show) {
            e.preventDefault();
        }
    }
};
