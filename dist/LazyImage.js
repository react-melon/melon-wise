define('melon-wise/lib/LazyImage', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Lazyimage');
    var PropTypes = React.PropTypes;
    var LazyImage = function (_React$Component) {
        babelHelpers.inherits(LazyImage, _React$Component);
        function LazyImage(props) {
            babelHelpers.classCallCheck(this, LazyImage);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LazyImage).call(this, props));
            _this.state = { load: props.load || false };
            _this.onLoad = _this.onLoad.bind(_this);
            _this.onError = _this.onError.bind(_this);
            _this.isControlled = props.load === true || props.load === false;
            return _this;
        }
        babelHelpers.createClass(LazyImage, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var _this2 = this;
                    if (this.state.load || this.isControlled) {
                        return;
                    }
                    setTimeout(function () {
                        _this2.loadImage();
                    }, 0);
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(props) {
                    if (!this.state.load && props.load && this.isControlled || props.src !== this.props.src) {
                        this.loadImage();
                    }
                }
            },
            {
                key: 'loadImage',
                value: function loadImage() {
                    var src = this.props.src;
                    var me = this;
                    var image = new Image();
                    image.onload = function (e) {
                        me.setState({ load: true });
                    };
                    image.src = src;
                }
            },
            {
                key: 'onLoad',
                value: function onLoad(e) {
                    var onLoad = this.props.onLoad;
                    onLoad && onLoad(e);
                }
            },
            {
                key: 'onError',
                value: function onError(e) {
                    var onError = this.props.onError;
                    onError && onError(e);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var src = _props.src;
                    var initialSrc = _props.initialSrc;
                    var other = babelHelpers.objectWithoutProperties(_props, [
                        'src',
                        'initialSrc'
                    ]);
                    var load = this.state.load;
                    return React.createElement('img', babelHelpers.extends({}, other, {
                        className: cx(this.props).build(),
                        onLoad: load ? this.onLoad : null,
                        onError: load ? this.onError : null,
                        src: load ? src : initialSrc
                    }));
                }
            }
        ]);
        return LazyImage;
    }(React.Component);
    LazyImage.displayName = 'LazyImage';
    LazyImage.propTypes = {
        src: PropTypes.string,
        initialSrc: PropTypes.string,
        onLoad: PropTypes.func,
        onError: PropTypes.func
    };
    LazyImage.defaultProps = { initialSrc: 'http://m.baidu.com/static/search/image_default.png' };
    module.exports = LazyImage;
});