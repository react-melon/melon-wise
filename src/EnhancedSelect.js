/**
 * @file EnhancedSelect
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const ReactDOM = require('react-dom');
const cx = require('melon-classname').create('EnhancedSelect');

const popupHelper = require('./util/separatePopupHelper');

const SeparatePopup = require('./enhancedselect/SeparatePopup');

const {PropTypes, Component} = React;

class EnhancedSelect extends Component {

    constructor(props) {
        super(props);

        const {
            items, value
        } = props;

        this.state = {
            selectedIndex: this.getSelectedIndex(items, value)
        };

        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
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

    onChange({index, value}) {

        this.setState({selectedIndex: index});

        this.props.onChange({
            type: 'change',
            target: this,
            value
        });
    }

    onClick() {
        this.renderPopup(true);
    }

    getSelectedIndex(items, value) {

        for (let i = items.length - 1; i >= 0; i--) {
            if (items[i].value === value) {
                return i;
            }
        }

        return;
    }

    renderPopup(isShow) {

        const {items} = this.props;

        ReactDOM.render(
            <SeparatePopup
                show={isShow}
                selectedIndex={this.state.selectedIndex}
                items={items}
                onChange={this.onChange}
                onHide={() => {
                    this.renderPopup(false);
                }} />,
            this.container
        );

    }

    renderResult() {

        const {value, items} = this.props;
        const {selectedIndex} = this.state;

        return value ? (
            <div className={cx().part('result').build()}>
                {items[selectedIndex].name}
            </div>
        ) : null;
    }

    renderLabel() {

        const {label} = this.props;

        return label ? (
            <label className={cx().part('label').build()}>
                {label}
            </label>
        ) : null;
    }

    renderHiddenInput() {

        const {items, name} = this.props;
        const {selectedIndex} = this.state;

        return (
            <input
                type="hidden"
                name={name}
                value={selectedIndex == null ? '' : items[selectedIndex].value} />
        );
    }

    render() {

        return (
            <div className={cx(this.props).build()} onClick={this.onClick}>
                {this.renderLabel()}
                {this.renderResult()}
                {this.renderHiddenInput()}
            </div>
        );
    }
}

EnhancedSelect.displayName = 'EnhancedSelect';

EnhancedSelect.propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    itemBorder: PropTypes.bool
};

EnhancedSelect.defaultProps = {
    defaultValue: ''
};

module.exports = require('./createInputComponent').create(EnhancedSelect);
