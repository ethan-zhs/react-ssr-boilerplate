import React, { Component } from 'react';

import ImageLoader from 'react-imageloader';

import { 
    getCoverUrl, calVideoTime, toUrl, defaultThumb, cutStr 
} from 'Utils/utils';

import styles from './index.less';

/**
 * ModuleName: 图集浏览末尾模块
 * 
 * Author: zhuhuishao 
 * use: [ 图集浏览到末尾，展示相关推荐，重新浏览 / 跳回图片频道 ]
 * 
*/
export default class ImageEndPannel extends Component {
    render() {
        const {
            list, visible, reView = null, headTit
        } = this.props;

        const imgPreloader = <img src={require('Public/images/moren_584_390.png')} width="100%" height="100%" />;
        const defaultImg = <img src={defaultThumb()} width="100%" height="100%" />;

        return (
            <section className={styles['more-pannel']} style={{ display: `${visible ? 'block' : 'none'}` }}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{cutStr(headTit, { len: 20, stuff: '...' })}</h2>
                    <div className={styles['action-btns']}>
                        <button 
                            className={styles.review}
                            onClick={reView && reView}
                        >
                            <span className={styles['review-icon']}></span>
                            重新浏览
                        </button>
                        <button 
                            className={styles.channel}
                            onClick={() => { window.location.href = '/news/picture'; }}
                        >
                        图片频道</button>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles['item-list-wrap']}>
                        {(list && list.length > 0) && list.map((item, key) => (
                            key < 8 && (
                                <div className={styles.item} key={key}>
                                    <div className={styles.warpper}>
                                        <a className={styles['item-box']} href={toUrl(item)} target='_self'>
                                            <div className={styles['push-item-thumb']} data-id={`img${item.sid}`}>
                                                <div className={styles['blur-thumb']} style={{ backgroundImage: `url(${getCoverUrl(item.coverUrl)[0]})` }}></div>
                                                <ImageLoader
                                                    className={styles['push-item-img']}
                                                    src={item.coverUrl && item.coverUrl.length ? getCoverUrl(item.coverUrl)[0] : defaultThumb()}
                                                    preloader={() => imgPreloader}
                                                    onError={() => defaultImg}
                                                >
                                                    {defaultImg}
                                                </ImageLoader>
                                                {item.videoTimeLength > 0 && (
                                                    <div className={styles['hot-item-video']}>
                                                        <span className={styles['hot-item-long']}>{calVideoTime(item.videoTimeLength)}</span>
                                                    </div>
                                                )}
                                                {item.pictureCount > 0 && (
                                                    <div className={styles['hot-item-pic']}>
                                                        <span className={styles['hot-item-long']}>{item.pictureCount}图</span>
                                                    </div>
                                                )}
                                            </div>
                                        </a>
                                    </div>
                                    <p className={styles['item-title']}>
                                        <a href={toUrl(item)}>{cutStr(item.title, { len: 28, stuff: '...' })}</a>
                                    </p>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}
