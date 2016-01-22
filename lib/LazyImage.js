var babelHelpers = require('./babelHelpers');
var _react = require('react');
var _react2 = babelHelpers.interopRequireDefault(_react);
var cx = require('melon-classname').create('Lazyimage');
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
        var initialSrc = _props.initialSrc;
        var other = babelHelpers.objectWithoutProperties(_props, [
            'src',
            'initialSrc'
        ]);
        var load = this.state.load;
        return _react2.default.createElement('img', babelHelpers._extends({}, other, {
            className: cx(this.props).build(),
            onLoad: load ? this.onLoad : null,
            onError: load ? this.onError : null,
            src: load ? src : initialSrc
        }));
    };
    return LazyImage;
}(_react2.default.Component);
LazyImage.displayName = 'LazyImage';
LazyImage.propTypes = {
    src: PropTypes.string,
    initialSrc: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func
};
LazyImage.defaultProps = { initialSrc: 'http://m.baidu.com/static/search/image_default.png' };
module.exports = LazyImage;