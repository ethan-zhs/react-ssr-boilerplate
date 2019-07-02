import React, { Component } from 'react';
import ImageLoader from 'react-imageloader';

import { 
    getCoverUrl, formatNum, calVideoTime, toUrl, cutStr, defaultThumb
} from 'Utils/utils';

import styles from './index.less';

/**
 * ModuleName: 新闻模块
 * 
 * Author: zhuhuishao 
 * use: [ 展示单个新闻内容块 ]
 * 
*/
class NewsBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const { newsItem, target = '_blank' } = this.props;
        const imgPreloader = <img src={require('Public/images/moren_584_390.png')} width="100%" height="100%" />;
        const defaultImg = <img src={defaultThumb()} width="100%" height="100%" />;

        return (
            <div className={styles['push-item']}>
                <a title={newsItem.title} className={styles['push-item-box']} href={toUrl(newsItem)} target={target}>
                    <div className={styles['push-item-thumb']} data-id={`img${newsItem.sid}`}>
                        <div className={styles['blur-thumb']} style={{ backgroundImage: `url(${getCoverUrl(newsItem.coverUrl)[0]})`, overflow: 'hidden' }}></div>
                        <ImageLoader
                            imgProps={{
                                alt: newsItem.title
                            }}
                            className={styles['push-item-img']}
                            src={newsItem.coverUrl && newsItem.coverUrl.length ? getCoverUrl(newsItem.coverUrl)[0] : defaultThumb()}
                            preloader={() => imgPreloader}
                            onError={() => defaultImg}
                        >
                            {defaultImg}
                        </ImageLoader>
                        {newsItem.videoTimeLength > 0 && (
                            <div className={styles['hot-item-video']}>
                                <span className={styles['hot-item-play']}></span>
                                <span className={styles['hot-item-long']}>{calVideoTime(newsItem.videoTimeLength)}</span>
                            </div>
                        )}
                        {newsItem.pictureCount > 0 && (
                            <div className={styles['hot-item-pic']}>
                                <span className={styles['hot-item-play']}></span>
                                <span className={styles['hot-item-long']}>{newsItem.pictureCount}图</span>
                            </div>
                        )}
                    </div>
                    <h3 className={styles['push-item-title']}>
                        <p title={newsItem.title} className={styles['push-item-title-link']}>{cutStr(newsItem.title, { len: 28, stuff: '...' })}</p>
                    </h3>
                    <div className={styles['push-item-sub']}>
                        <span className={styles.author}>{newsItem.weMediaName}</span>
                        <p className={styles.read}>
                            <span>{formatNum(newsItem.readCount)}</span>
                        </p>
                    </div>
                </a>
            </div>
        );
    }
}

export default NewsBox;
