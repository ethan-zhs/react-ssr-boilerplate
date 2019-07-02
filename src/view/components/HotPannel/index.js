import React, { Component } from 'react';

import { getCoverUrl, toUrl, cutStr } from 'Utils/utils';

import LoadingBox from 'Components/LoadingBox';

import styles from './index.less';

/**
 * ModuleName: 信息流热门模块
 * 
 * Author: zhuhuishao 
 * use: [ 展示信息流热门内容列表 ]
 * 
*/
class HotPannel extends Component {
    constructor() {
        super();
        this.state = {
            fixClass: '',
            hoverCurr: undefined
        };
    }

    componentDidMount() {         
        document.addEventListener('scroll', this.fixedHotNews);
    }

    componentWillReceiveProps(nextProps) {
        const { hotList } = nextProps;
        
        // 设置默认展示大图的新闻
        if (hotList && hotList.length > 0) {
            const sid = hotList.reduce((temp, item) => (!temp && (item.videoTimeLength > 0 || item.pictureCount) > 0 ? item.sid : temp), undefined);
            this.setState(Object.assign({}, this.state, { hoverCurr: sid }));
        }
    }


    render() {
        const { hotList } = this.props;

        return (
            <div className={this.state.fixClass}>
                <div className={styles['hot-pannel']}>
                    <div className={styles['pannel-head']}>
                        <b>热门</b>
                    </div>
                    <section className={styles['pannel-body']}>
                        <LoadingBox loading={this.props.loading || false}>
                            {(hotList && hotList.length > 0) && hotList.map((item, key) => (
                                <a title={item.title} className={styles['hot-item']} key={item.sid} href={toUrl(item)} target="_blank">
                                    <h3 onMouseEnter={() => this.hotNewsHover(item)} className={styles['hot-item-title']}>{cutStr(item.title, { len: 34, stuff: '...' })}</h3>
                                    {item.videoTimeLength > 0 && this.state.hoverCurr == item.sid && (
                                        <div className={styles['hot-item-video']} style={{ backgroundImage: item.coverUrl.length ? `url(${getCoverUrl(item.coverUrl)[0]})` : '' }}>
                                            <span className={styles['hot-item-play']}></span>
                                        </div>
                                    )}

                                    {item.pictureCount > 0 && this.state.hoverCurr == item.sid && (
                                        <div className={styles['hot-item-pic']} style={{ backgroundImage: item.coverUrl.length ? `url(${getCoverUrl(item.coverUrl)[0]})` : '' }}>
                                            <span className={styles['hot-item-play']}></span>
                                            <span className={styles['hot-item-long']}>{item.pictureCount}图</span>
                                        </div>
                                    )}
                                </a>
                            ))}
                        </LoadingBox>
                    </section>
                </div>
                {this.state.fixClass != '' && <div className={styles['back-top']} onClick={this.goTop}>TOP</div>}
            </div>
        );
    }

    
    // 监听设置热门悬浮
    fixedHotNews = () => {
        const rightHeight = document.querySelector('#rightArea').offsetHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.setState(Object.assign({}, this.state, { fixClass: scrollTop > rightHeight ? styles['fixed-top'] : '' }));
    }


    /**
     * 
     * 设置展示大图的新闻
     * 
     * @param [object] item [鼠标hover的新闻对象]
     */
    hotNewsHover = (item) => {
        if (item.contentType == 1 || item.contentType == 2) {
            this.setState(Object.assign({}, this.state, { hoverCurr: item.sid }));
        }        
    }


    // 回到页面顶部
    goTop = () => {
        window.scrollTo(0, 0);
    }
}

export default HotPannel;
