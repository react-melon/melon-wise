/**
 * @file LockBody
 * @author cxtom(cxtom2008@gmail.com)
 */

import {Component} from 'react';
import ReactDOM from 'react-dom';
import domUtil from '../util/dom';

export default class LockBody extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onTouchMove = this.onTouchMove.bind(this);
    }

    componentDidMount() {
        domUtil.on(document.body, 'touchmove', this.onTouchMove);
    }

    componentWillUnmount() {
        domUtil.off(document.body, 'touchmove', this.onTouchMove);
    }

    onTouchMove(e) {
        const target = e.target;
        const main = ReactDOM.findDOMNode(this);

        if (this.props.show && !domUtil.contains(main, target)) {
            e.preventDefault();
        }
    }
}
