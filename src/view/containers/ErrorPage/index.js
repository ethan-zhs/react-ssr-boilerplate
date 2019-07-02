import React, { Component } from 'react';
import Helmet from 'react-helmet';

import styles from './index.less';

/**
 * PageName: 404
 * 
 * Author: zhuhuishao 
 * use: [ 错误访问跳转页面 ]
 * 
*/
class ErrorPage extends Component {
    componentDidMount() {
        document.body.style.backgroundColor = '#fff';
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>404</title>
                </Helmet>
                <div className={styles['erro-bg']}></div>
                <p className={styles.tips}>糟糕！页面飘走了~<a href="/">返回首页</a></p>
            </div> 
        );
    }
}

export default ErrorPage;
