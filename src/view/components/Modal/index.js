import React, { Component } from 'react';
import ReactDom from 'react-dom';

import styles from './index.less';

/**
 * ModuleName: 普通弹窗
 * 
 * Author: zhuhuishao 
 * use: [ 用于，警告，成功，错误，提示，确认等模态的使用 ]
 * 
*/
const dialog = function (type, options) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    document.body.style.overflow = 'hidden';

    // 点击确认关闭模态，并执行回调
    const handleOnOk = (onOk) => {        
        document.body.removeChild(div);
        document.body.style.overflow = 'visible';
        onOk && onOk();
    };

    ReactDom.hydrate(
        <div className={styles.dialog}>
            <div className={styles['dialog-box']}>
                <div className={styles['dialog-content']}>
                    <div className={styles.logo}>
                        { type == 'info' && <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg> }
                    </div>
                    <div className={styles.title}>{options.title || '发生错误'}</div> 
                    <div className={styles.content}>{options.content || '点击按钮关闭'}</div>                    
                </div>                
                <a onClick={() => handleOnOk(options.onOk)} className={styles['ok-btn']}>{options.okText || '知道了'}</a>
            </div>            
        </div>, 
        div
    );
};

export default {
    info: (options = {}) => dialog('info', options)
};
