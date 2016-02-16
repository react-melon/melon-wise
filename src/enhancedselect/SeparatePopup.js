/**
 * @file EnhancedSelectSeparatePopup
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('melon-classname').create('EnhancedSelectPopup');

const Popup = require('../Popup');
const Selector = require('../Selector');
const Tappable = require('../Tappable');

const {PropTypes} = React;

const SeparatePopup = React.createClass({

    displayName: 'EnhancedSelectSeparatePopup',

    mixins: [require('../mixins/SeparateMixin')],

    propTypes: {
        items: PropTypes.array,
        show: PropTypes.bool
    },

    onChange({value, index}) {
        const {onChange} = this.props;

        onChange && onChange({
            value,
            index,
            target: this
        });

        this.onHide();
    },

    onHide() {
        const {onHide} = this.props;
        onHide && onHide();
    },

    render() {

        const {
            show, items,
            selectedIndex
        } = this.props;

        return (
            <Popup
                show={show}
                transitionTimeout={300}
                transitionType="translate"
                direction="bottom"
                onHide={() => {
                    this.props.onHide && this.props.onHide();
                }} >
                <div>
                    <div className={cx().part('panel').build()}>
                        <Selector
                            items={items}
                            className={cx().part('selector').build()}
                            selectedIndex={selectedIndex}
                            onChange={this.onChange} />
                    </div>
                    <Tappable
                        component="div"
                        onTap={this.onHide}
                        className={cx().part('cancel').build()}>
                        取消
                    </Tappable>
                </div>
            </Popup>
        );

    }
});

module.exports = SeparatePopup;

