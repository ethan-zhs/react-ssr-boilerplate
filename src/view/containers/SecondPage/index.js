import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropsType from 'prop-types';

import moduleInjector from '../../utils/moduleInjector';

import selectors from './selectors';
import * as Actions from './actions';


// @moduleInjector({
//     connectOpt: {
//         mapStateToProps: selectors,
//         mapDispatchToProps: {
//             add: Actions.add.request,
//             cut: Actions.cut.request
//         }
//     }
// })
class SecondPage extends Component {
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
                <a onClick={this.handleAdd}>SecondPage</a>
                <a onClick={this.handleCut}>SecondPage</a>
            </div>
        );
    }    
}

// export default SecondPage;

export default connect(selectors, {
    add: Actions.add.request,
    cut: Actions.cut.request
})(SecondPage);
