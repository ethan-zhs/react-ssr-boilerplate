import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import PropsType from 'prop-types';

import selectors from './selectors';
import * as Actions from './actions';

import styles from './index.less';


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
            <div className={styles.layout}>
                <Helmet>
                    <title>first Page</title>
                </Helmet>
                <a onClick={this.handleAdd}>First Page</a>
                <a onClick={this.handleCut}>Cut33 First Page</a>
                <img src={require('../../statics/images/01.jpg')} />
            </div>
        );
    }    
}

export default connect(selectors, {
    add: Actions.add.request,
    cut: Actions.cut.request
})(FirstPage);
