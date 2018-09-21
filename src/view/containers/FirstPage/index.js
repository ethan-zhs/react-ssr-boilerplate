import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropsType from 'prop-types';

import selectors from './selectors';
import * as Actions from './actions';


class FirstPage extends Component {
    // constructor(props) {
    //     super(props);
    // }

    handleAdd = () => {
        console.log(this.props.add);
        this.props.add();
    }

    render() {
        const { list } = this.props;

        return (
            <div onClick={this.handleAdd}>First Page</div>
        );
    }    
}

export default connect(selectors, {
    add: Actions.add.request
})(FirstPage);
