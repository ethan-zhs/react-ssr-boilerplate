import React, { Component } from 'react';

import userUtils from 'Utils/userUtils';
import Modal from 'Components/Modal';

import styles from './index.less';


/**
 * ModuleName: 投票组件
 * 
 * Author: zhuhuishao 
 * use: [ Html富文本渲染投票组件 ]
 * 
*/
class Vote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            loading: false
        };
    }


    render() {
        const { vote = {} } = this.props;
        const { 
            voteOptions = [], title = '', type, youCanVote, endTime = 0 
        } = vote;

        // 检测是否投票结束
        const isEnd = Date.now() >= endTime;

        // 获得总投票数
        const voteCount = voteOptions.length ? voteOptions.reduce((count, item) => item.count + count, 0) : 0;

        // 获得用户信息
        const userinfo = userUtils.getUser();

        // 投票按钮文案
        const voteBotWords = this.state.loading ? '投票中...' : '投票';

        return (
            <div className={styles['vote-box']}>
                <span className={styles['vote-title']}>
                    <span>{title}</span>
                    {youCanVote && <span>({type == '0' ? '单选' : '多选'})</span>}
                    {isEnd && <span className={styles['vote-end']}>(投票已结束)</span>}
                </span>
                {youCanVote ? (
                    <div className={styles['not-vote-box']}>
                        {voteOptions.map((item, index) => {
                            const activeClass = this.state.selected.indexOf(item) >= 0 ? styles['vote-active'] : '';
                            return (
                                <span key={`vote${index}`} className={`${styles['vote-item']} ${activeClass}`} 
                                    onClick={() => this.chooseItem(item)}
                                >{`${(index + 1)}.${item.content}`}</span>
                            );
                        })}
                        <a className={`${styles['vote-btn']} ${!userinfo.userId ? styles['vote-btn-disable'] : ''}`} 
                            onClick={this.handleVote}
                            disable={!userinfo.userId || this.state.loading}
                        >{!userinfo.userId ? '请登录' : voteBotWords}</a>
                    </div>    
                ) : (
                    <div className={styles['has-vote-box']}>
                        {voteOptions.map((item, index) => {
                            const percent = voteCount == 0 ? 0 : parseInt(item.count / voteCount * 100, 10);
                            return (
                                <div key={`vote${index}`} className={styles['has-vote-item']}>
                                    <div className={styles['vote-data']}>
                                        <span>{item.content}</span>
                                        <span>{percent}%</span>
                                    </div>
                                    
                                    <div className={styles['count-bar']}>
                                        <div className={styles['count-bar-percent']} 
                                            style={{ width: percent + '%' }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>  
                )}     
            </div>
        );
    }


    // 触发投票
    handleVote = () => {
        const { voteFunc, vote, news } = this.props;
        const userinfo = userUtils.getUser();        
        const { votePk } = vote.voteOptions[0];

        if (!userinfo.userId) {
            Modal.info({
                title: '投票失败',
                content: '请先登录你的账号'
            });
        } else if (!this.state.selected.length) {
            Modal.info({
                title: '投票失败',
                content: '请选择投票选项'
            });
        } else {
            this.setState(Object.assign({}, this.state, { loading: true }));
            voteFunc({
                params: {
                    userPk: userinfo.userId,
                    objectType: 0,
                    objectPk: news.sid,
                    votePk: votePk,
                    voteOptionPks: this.state.selected.map(item => item.voteOptionPk)
                },
                callback: this.voteCallback
            });
        }
    }


    /**
     * 
     * 提交投票后的回调事件
     * 
     * @param [object] obj [回调信息对象]
     */
    voteCallback = (obj) => {
        this.setState(Object.assign({}, this.state, { loading: false }));
        if (obj.success) {
            window.location.reload();
        } else {
            Modal.info({
                title: '操作失败',
                content: obj.errorMessage || '',
                onOk: () => {
                    window.location.reload();
                }
            });
        }
    }


    /**
     * 
     * 选择投票选项
     * 
     * @param [object] item [投票选项对象]
     */
    chooseItem = (item) => {
        const { type = 0 } = this.props.vote;
        const arr = type == 0 ? [item] : [...this.state.selected, item];
        this.setState(Object.assign({}, this.state, { selected: arr }));
    }
}

export default Vote;
