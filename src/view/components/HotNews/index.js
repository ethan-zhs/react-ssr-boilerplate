import React, { Component } from 'react';

// constants
import { 
    getCoverUrl, 
    calVideoTime, 
    timeFormat, 
    cutStr 
} from 'Utils/utils';

import styles from './index.less';

const CONTENT_TYPE = {
    0: 'article',
    1: 'video',
    2: 'gallery'
};

/**
 * ModuleName: 新闻详情页热门模块
 * 
 * Author: zhuhuishao 
 * use: [ 展示新闻详情页热门内容列表 ]
 * 
*/
class HotNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixed: false
        };
    }

    componentDidMount() {
        document.addEventListener('scroll', this.fixedHotNews);
    }

    render() {
        const { hotNewsList, fixed } = this.props;
        
        const hotNews = hotNewsList.filter(item => item.contentType != 1 || (item.videoUrl && (item.videoUrl.indexOf('pptv://') < 0 && item.videoUrl.indexOf('.m3u8') < 0)));

        return (
            <div className={`${styles.hotnews} ${this.state.fixed ? styles.fixed : ''}`} id="hotnews">
                <div className={styles['hotnews-tip']}>
                    <span></span>
                    <span>热门</span>                            
                </div>

                <div className={styles['hotnews-list']}>
                    <ul>
                        {hotNews.filter((item, index) => index < 6).map((item, index) => {
                            const linkUrl = `/${CONTENT_TYPE[item.contentType.toString()]}/${item.sid}`;
                            const newsCoverUrl = getCoverUrl(item.coverUrl)[0] && getCoverUrl(item.coverUrl)[0].trim() != '' ? getCoverUrl(item.coverUrl)[0].trim() : '';
                            if (newsCoverUrl != '') {
                                return (
                                    <li key={index}>
                                        <a href={linkUrl} target='_blank'>
                                            <div className={styles['hotnews-cover']}>
                                                {item.contentType != 0 ? (
                                                    <span>{item.contentType == 1 ? calVideoTime(item.videoTimeLength) : item.pictureCount + '图'}</span>
                                                ) : null}
                                                <img src={newsCoverUrl}/>
                                            </div>
                                            <div className={styles['hotnews-msg']}>
                                                <p className={styles['hotnews-title']} title={item.title}>{cutStr(item.title, { len: 18, stuff: '...' })}</p>
                                                <p>{timeFormat(item.updateTime, 'date-after')}前</p>
                                            </div>
                                        </a>                                    
                                    </li>
                                );
                            }
                                
                            return (
                                <li key={index}>
                                    <a href={linkUrl} target='_blank'>
                                        <div className={styles['hotnews-msg-no-img']}>
                                            <p className={styles['hotnews-title']} title={item.title}>{cutStr(item.title, { len: 35, stuff: '...' })}</p>
                                            <p>{timeFormat(item.updateTime, 'date-after')}前</p>
                                        </div>
                                    </a>                                    
                                </li>
                            );
                        })}                        
                    </ul>
                </div>

                {this.state.fixed && <div className={styles['back-top']} onClick={this.goTop}>TOP</div>}
            </div>
        );
    }


    // 设置热门模块悬浮
    fixedHotNews = () => {
        const sidebarElement = document.querySelector('#sidebar');       
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (sidebarElement.offsetTop - scrollTop < (-70 - sidebarElement.offsetHeight)) {
            this.setState(Object.assign({}, this.state, { fixed: true }));
        } else {
            this.setState(Object.assign({}, this.state, { fixed: false }));
        }    
    }


    // 回到页面顶部
    goTop = () => {
        window.scrollTo(0, 0);
    }
}

export default HotNews;
