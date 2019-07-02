import React, { Component } from 'react';
import { connect } from 'react-redux';


// actions
import * as Actions from 'Global/actions';
import selectors from 'Global/selectors';

// components 
import Footer from 'Components/Footer';
import Header from 'Components/Header';

// css
import styles from './index.less';

/**
 * PageName: 页面框架
 * 
 * Author: zhuhuishao 
 * use: [ 页面基础框架 ]
 * 
*/
@connect(selectors, {
    // getChannel: Actions.getChannel.request,
})
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {    
        
    }

    render() {
        const { 
            children,
            history,
            match,
            user,
            layout
        } = this.props;
        
        return (
            <div className={styles['page-layout']} style={{ minHeight: typeof window == 'object' ? window.innerHeight : 800 }}>
                <Header user={user} />
                <div className={styles['page-container']}>
                    {children}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Layout;
