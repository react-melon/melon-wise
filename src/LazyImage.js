/**
 * @file esui-react/LazyImage
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
const cx = require('./util/cxBuilder').create('Lazyimage');

const {PropTypes} = React;

class LazyImage extends React.Component {

    static displayName = 'LazyImage';

    static propTypes = {
        src: PropTypes.string,
        defaultImageSrc: PropTypes.string,
        onLoad: PropTypes.func,
        onError: PropTypes.func,
        controled: PropTypes.bool
    };

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
        if (!this.state.load && props.load && this.isControlled
            || props.src !== this.props.src) {
            this.loadImage();
        }
    }

    loadImage() {

        let {
            src
        } = this.props;

        let me = this;
        let image = new Image();

        image.onload = function (e) {
            me.setState({load: true});
        };

        image.src = src;
    }

    onLoad(e) {
        let {onLoad} = this.props;
        onLoad && onLoad(e);
    }

    onError(e) {
        let {onError} = this.props;
        onError && onError(e);
    }

    render() {

        let {
            src,
            defaultImageSrc,
            ...other
        } = this.props;

        let {load} = this.state;

        let image = load ? src : defaultImageSrc;

        return (
            <img
                {...other}
                onLoad={load ? this.onLoad : null}
                onError={load ? this.onError : null}
                src={image}
                className={cx(this.props).build()} />
        );

    }

}

LazyImage.defaultImageSrc = 'http://m.baidu.com/static/search/image_default.png';

LazyImage.defaultProps = {
    defaultImageSrc: LazyImage.defaultImageSrc
};

module.exports = LazyImage;
