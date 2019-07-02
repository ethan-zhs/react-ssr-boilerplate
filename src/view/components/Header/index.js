import React, { Component } from 'react';

import styles from './index.less';

/**
 * ModuleName: 通用Header
 * 
 * Author: zhuhuishao 
 * use: [ 页面通用Header展示 ]
 * 
*/
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qrCodeVisible: false,
            loading: false
        };
    }

    render() {
        return (
            <div className={styles['header-wrap']}>
                <div className={styles.header}>
                    <div className={styles['header-left']}>SSR DEMO</div>
                </div>
            </div>
        );
    }
}
