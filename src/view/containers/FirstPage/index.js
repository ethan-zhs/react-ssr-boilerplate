import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropsType from 'prop-types';

import selectors from './selectors';
import * as Actions from './actions';


class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleAdd = () => {
        this.props.add();
    }

    handleCut = () => {
        this.props.cut();
    }

    render() {
        const { list } = this.props;

        console.log(list);

        return (
            <div>
                <a onClick={this.handleAdd}>First Page</a>
                <a onClick={this.handleCut}>First Page</a>
            </div>
        );
    }    
}

export default connect(selectors, {
    add: Actions.add.request,
    cut: Actions.cut.request
})(FirstPage);
