import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropsType from 'prop-types';

import selectors from './selectors';


class FirstPage extends Component {
    render() {
        const { list } = this.props;
        console.log('xxxxxxxx', list);

        return (
            <div>First Page</div>
        );
    }    
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    selectors,
    mapDispatchToProps
)(FirstPage);
