/**
 * @file esui-react/LazyImage
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
const cx = require('./util/cxBuilder').create('Lazyimage');

const {PropTypes} = React;

class LazyImage extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            load: props.load || false
        };

        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);

        this.isControlled = (props.load === true || props.load === false);
    }

    componentDidMount() {
        if (this.state.load || this.isControlled) {
            return;
        }

        setTimeout(() => {
            this.loadImage();
        }, 0);
    }

    componentWillReceiveProps(props) {
        if (!this.state.load
            && props.load
            && this.isControlled
            || props.src !== this.props.src) {
            this.loadImage();
        }
    }

    loadImage() {

        const {
            src
        } = this.props;

        const me = this;

        let image = new Image();

        image.onload = function (e) {
            me.setState({load: true});
        };

        image.src = src;
    }

    onLoad(e) {
        const {onLoad} = this.props;
        onLoad && onLoad(e);
    }

    onError(e) {
        const {onError} = this.props;
        onError && onError(e);
    }

    render() {

        const {
            src,
            initialSrc,
            ...other
        } = this.props;

        const {load} = this.state;

        return (
            <img
                {...other}
                className={cx(this.props).build()}
                onLoad={load ? this.onLoad : null}
                onError={load ? this.onError : null}
                src={load ? src : initialSrc} />
        );

    }

}

LazyImage.displayName = 'LazyImage';

LazyImage.propTypes = {
    src: PropTypes.string,
    initialSrc: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func
};

LazyImage.defaultProps = {
    initialSrc: 'http://m.baidu.com/static/search/image_default.png'
};

module.exports = LazyImage;
