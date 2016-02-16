/**
 * @file main
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');

const cx = require('melon-classname').create('RowSpan');

function RowSpan(props) {

    let {
        occupy, style,
        columnNum, noGap,
        ...other
    } = props;

    style = {
        width: (occupy / columnNum) * 100 + '%',
        WebkitBoxFlex: occupy,
        WebkitFlex: [occupy, occupy, 'auto'].join(' '),
        ...style
    };

    if (!noGap) {
        let padding = 20 / (columnNum - 1) + '%';
        style = {
            ...style,
            paddingLeft: padding,
            paddingRight: padding
        };
    }

    return (
        <div {...other} className={cx(props).build()} style={style} />
    );
}

RowSpan.propsTypes = {
    occupy: React.PropTypes.number.isRequired
};

RowSpan.defaultProps = {
    occupy: 4
};

module.exports = RowSpan;
