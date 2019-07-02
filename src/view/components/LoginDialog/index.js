import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import styles from './index.less';

const VALIDATE_ENUM = {
    PHONE_ERR: '请输入正确的手机号码',
    PASS_ERR: '请输入您的密码'
};


/**
 * ModuleName: 登录模态框
 * 
 * Author: zhuhuishao 
 * use: [ 用户登录模态框，用于用户登录操作 ]
 * 
*/
export default class LoginDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mobile: '',
            pwd: '',
            validateText: '', 
        };
        
        const doc = window.document;
        this.node = doc.createElement('div');
        doc.body.appendChild(this.node);
    }

    componentWillUnmount() {
        window.document.body.removeChild(this.node);
    }

    render() {
        const { loading } = this.props;

        // 采用portal 床送们的方式创建模态框
        return createPortal(
            <div className={styles.dialog} id='modalContent' onClick={this.handleCancel}>
                <div className={styles.loginBox}>
                    <div className={styles.logo}></div>
                    <div className={styles.loginForm}>
                        <div className={[styles.loginInput, styles.mobile].join(' ')}>
                            <input 
                                type="text" 
                                placeholder="请输入手机号" 
                                onChange={this.handleMobileChange} 
                                onBlur={this.vailMobile}
                            />
                        </div>
                        <div className={[styles.loginInput, styles.mobile].join(' ')}>
                            <input 
                                type="password" 
                                placeholder="请输入密码" 
                                onChange={this.handlePwdChange}
                                onBlur={this.vailPassword}
                                onKeyUp={this.handleEnterSubmit}
                            />
                            <p className={styles.vailErrText}>{this.state.validateText}</p>
                        </div>
                        <p>
                            <button 
                                type="button" 
                                className={`${styles.loginBtn} ${loading ? styles.active : ''}`} 
                                disabled={loading}
                                onClick={this.handleLogin}
                            >
                                {loading ? '登录中...' : '登录'}
                            </button>
                        </p>
                    </div>
                    <div className={styles.fastBox}>
                        <p className={styles.otherHeader}><span>其他登录方式</span></p>
                        <div className={styles.thirdPartyBtns}>
                            <span className={styles.wxLogin} onClick={this.wxLogin}></span>
                        </div>
                    </div>
                </div>
            </div>, 
            this.node
        );
    }

    
    /**
     * 
     * 关闭模态框
     * 
     * @param [object] e [当前点击对象]
     */
    handleCancel = (e) => {
        if (e.target.id != 'modalContent') return;
        this.props.onCancel();
    }

    
    /**
     * 
     * 手机号输入框内容改变
     * 
     * @param [object] e [当前输入框对象]
     */
    handleMobileChange = (e) => {
        this.setState(Object.assign({}, this.state, { mobile: e.target.value }));
    }


    /**
     * 
     * 密码输入框内容改变
     * 
     * @param [object] e [当前输入框对象]
     */
    handlePwdChange = (e) => {
        this.setState(Object.assign({}, this.state, { loginPassword: true, pwd: e.target.value }));
    }

    /**
     * 
     * 检测手机合法性
     * 
     * @param [object] e [当前输入框对象]
     */
    vailMobile = (e) => {
        const reg = /^1[34578]\d{9}$/;
        const value = reg.test(e.target.value) ? '' : VALIDATE_ENUM.PHONE_ERR;
        this.setState(Object.assign({}, this.state, { validateText: value }));
    }


    /**
     * 
     * 检测密码合法性
     * 
     * @param [object] e [当前输入框对象]
     */
    vailPassword = (e) => {
        const value = e.target.value.length ? '' : VALIDATE_ENUM.PASS_ERR;
        this.setState(Object.assign({}, this.state, { validateText: value }));
    }


    /**
     * 
     * 按enter键登录
     * 
     * @param [object] e [当前输入框对象]
     */
    handleEnterSubmit = (e) => {
        e.keyCode == 13 && this.handleLogin();
    }


    // 微信第三方登录
    wxLogin = () => {
        
    }
}
