import React, { Component } from 'react';
import LoadingBox from 'Components/LoadingBox';
import NewsBox from 'Components/NewsBox';

import styles from './index.less';

/**
 * ModuleName: 信息流列表
 * 
 * Author: zhuhuishao 
 * use: [ 展示首页和频道页面的相关信息流列表 ]
 * 
*/
class PushList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maxScrollTime: 10,
            scrollAddTime: 0
        };
    }

    componentDidMount() {
        document.addEventListener('scroll', this.addMore);
    }   


    render() {
        const { pushList, error } = this.props;
        
        const newsListArr = pushList && pushList.length > 0 ? pushList : [];
        const lastNum = newsListArr.length % 3;
        const newsList = newsListArr.slice(0, newsListArr.length - lastNum);

        return (
            <div className={styles['pushlist-container']}>
                <LoadingBox loading={this.props.loading}>
                    <div className={styles.pushlist} >
                        {newsList.map(subItem => (
                            <NewsBox key={subItem.sid} newsItem={subItem} />
                        ))}
                    </div>

                    {!this.props.loading && (
                        <button onClick={this.handleClickMoreBtn} className={styles['load-more']} style={this.state.scrollAddTime == this.state.maxScrollTime ? { display: 'block' } : { display: 'none' }}>
                            <span>加载更多</span>
                        </button>
                    )}

                </LoadingBox>
            </div>
        );
    }


    // 加载更多内容
    addMore = () => {
        if (!this.props.loading) {
            if (this.state.scrollAddTime >= this.state.maxScrollTime) {
                document.removeEventListener('scroll', this.addMore);
            } else if (document.body.clientHeight - ((document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight) <= 300) {
                this.setState(Object.assign({}, this.state, { scrollAddTime: this.state.scrollAddTime + 1 }), () => {
                    this.props.getMore();
                });
            }
        }        
    }


    // 点击加载更多按钮， 加载分页内容
    handleClickMoreBtn = () => {
        this.setState(Object.assign({}, this.state, { scrollAddTime: 0 }), () => {
            this.props.getMore();
            document.addEventListener('scroll', this.addMore);
        });
    }
}

export default PushList;
