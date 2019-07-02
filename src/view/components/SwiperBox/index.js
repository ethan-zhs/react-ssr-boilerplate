import React, { Component } from 'react';
import Swiper from 'swiper';

import 'swiper/dist/css/swiper.min.css';
import styles from './index.less';

const CONTENT_TYPE = {
    0: 'article',
    1: 'video',
    2: 'gallery'
};

/**
 * ModuleName: 首页轮播图
 * 
 * Author: zhuhuishao 
 * use: [ 首页轮播图展示 ]
 * 
*/
class SwiperBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: true,
            direction: 'horizontal',
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }

    render() {
        const { bannerData } = this.props;

        return (
            <div className={styles['swiper-box']}>
                <div className="swiper-container" style={{ height: '100%' }}>
                    <div className="swiper-wrapper">
                        {bannerData.map((item, index) => (
                            <div key={index} className="swiper-slide" style={{ backgroundImage: `url(${item.webSiteAd.coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <a className={styles['swiper-box']}
                                    href={item.content && item.content.sidInAES ? `${CONTENT_TYPE[parseInt(item.content.contentType || 0, 10)]}/${item.content.sidInAES}` : item.webSiteAd.target}
                                    target='_blank'
                                >
                                    <h1 className={styles.title}>{item.webSiteAd.title}</h1>
                                    {item.webSiteAd.targetType == 3 && (<span className={styles.isAd}>广告</span>)}
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination" />
                </div>
            </div>            
        );
    }
}

export default SwiperBox;
