/**
 * @file main
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import Component from '../Component';

class RowSpan extends Component {

    static displayName = 'RowSpan';

    static contextTypes = {
        columnNum: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.type = 'row-span';
    }

    render() {

        let {occupy, style, ...other} = this.props;
        let {columnNum} = this.context;
        let padding = 20 / (columnNum - 1) + '%';
        style = {
            paddingLeft: padding,
            paddingRight: padding,
            width: (occupy / columnNum) * 100 + '%',
            WebkitBoxFlex: occupy,
            WebkitFlex: [occupy, occupy, 'auto'].join(' '),
            WebkitBoxSizing: 'border-box',
            boxSizing: 'border-box',
            ...style
        };

        return (
            <div {...other} className={this.getClassName()} style={style}>
                {this.props.children}
            </div>
        );
    }

}

RowSpan.defaultProps = {
    occupy: 4
};

RowSpan.propsTypes = {
    occupy: PropTypes.number
};

export default RowSpan;
