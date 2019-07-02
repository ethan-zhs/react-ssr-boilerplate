import React, { Component } from 'react';

import styles from './index.less';

/**
 * ModuleName: 通用Footer
 * 
 * Author: zhuhuishao 
 * use: [ 页面通用Footer展示 ]
 * 
*/
export default class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qrCodeVisible: false
        };
    }

    render() {
        return (
            <div className={styles.footer} id="pageFooter">
                <div className={styles['footer-wrap']}>
                    <div className={styles['foot-left']}>
                        <div className={styles.copyright}>
                            <span>Copyright © 2019. All Rights Reserved</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    /**
     * 
     * 显示 / 隐藏微信二维码
     * 
     * @param [boolean] boolValue [是否显示微信二维码]
     */
    showQrcode = (boolValue) => {
        this.setState(Object.assign({}, this.state, { qrCodeVisible: boolValue }));
    }
}
