var babelHelpers = require('./babelHelpers');
var _react = require('react');
var _react2 = babelHelpers.interopRequireDefault(_react);
var cx = require('./util/cxBuilder').create('Lazyimage');
var PropTypes = _react2.default.PropTypes;
var LazyImage = function (_React$Component) {
    babelHelpers.inherits(LazyImage, _React$Component);
    function LazyImage(props) {
        babelHelpers.classCallCheck(this, LazyImage);
        _React$Component.call(this, props);
        this.state = { load: props.load || false };
        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);
        this.isControlled = props.load === true || props.load === false;
    }
    LazyImage.prototype.componentDidMount = function componentDidMount() {
        var _this = this;
        if (this.state.load || this.isControlled) {
            return;
        }
        setTimeout(function () {
            _this.loadImage();
        }, 0);
    };
    LazyImage.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
        if (!this.state.load && props.load && this.isControlled || props.src !== this.props.src) {
            this.loadImage();
        }
    };
    LazyImage.prototype.loadImage = function loadImage() {
        var src = this.props.src;
        var me = this;
        var image = new Image();
        image.onload = function (e) {
            me.setState({ load: true });
        };
        image.src = src;
    };
    LazyImage.prototype.onLoad = function onLoad(e) {
        var onLoad = this.props.onLoad;
        onLoad && onLoad(e);
    };
    LazyImage.prototype.onError = function onError(e) {
        var onError = this.props.onError;
        onError && onError(e);
    };
    LazyImage.prototype.render = function render() {
        var _props = this.props;
        var src = _props.src;
        var defaultImageSrc = _props.defaultImageSrc;
        var other = babelHelpers.objectWithoutProperties(_props, [
            'src',
            'defaultImageSrc'
        ]);
        var load = this.state.load;
        var image = load ? src : defaultImageSrc;
        return _react2.default.createElement('img', babelHelpers._extends({}, other, {
            onLoad: load ? this.onLoad : null,
            onError: load ? this.onError : null,
            src: image,
            className: cx(this.props).build()
        }));
    };
    return LazyImage;
}(_react2.default.Component);
LazyImage.displayName = 'LazyImage';
LazyImage.propTypes = {
    src: PropTypes.string,
    defaultImageSrc: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    controled: PropTypes.bool
};
LazyImage.defaultProps = { defaultImageSrc: 'http://m.baidu.com/static/search/image_default.png' };
module.exports = LazyImage;