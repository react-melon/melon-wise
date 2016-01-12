/**
 * @file esui-react/Mask
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('./util/cxBuilder').create('Mask');

const {PropTypes} = React;

export default class Mask extends React.Component {

    static propTypes = {
        show: PropTypes.bool
    };

    render() {
        const props = this.props;
        const {show} = props;

        return (
            <div {...props} className={cx(props).addStates({show}).build()} />
        );
    }
}
