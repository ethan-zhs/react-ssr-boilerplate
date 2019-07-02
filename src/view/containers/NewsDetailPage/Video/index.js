import React, { Component } from 'react';
import { connect } from 'react-redux';

import { timeFormat, getVideoUrl, getCoverUrl } from 'Utils/utils';

import HotNews from 'Components/HotNews';
import VideoPlay from 'Components/VideoPlay';

import prefetchSaga from '../prefetch';
import selectors from '../selectors';
import * as Actions from '../actions';
import { isCorrectSid, changeContentUrl } from '../constants';

import styles from './index.less';


/**
 * PageName: 视频详情页
 * 
 * Author: zhuhuishao 
 * use: [ 视频详情页展示 ]
 * 
*/
@connect(selectors, {
    getNewsContent: Actions.getNewsContent.request,
    getHotNews: Actions.getHotNews.request
})
class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quality: 'hd',
            commentTime: 0,
            commentCurPage: 1
        };
    }

    static prefetch = prefetchSaga;

    componentDidMount() {
        // 过滤非法id
        if (!isCorrectSid(this.props.match.params.id)) {
            window.location.href = '/404';
        }

        // 非ssr client需要调用接口
        if (!this.props.isPrefetch) {
            this.props.getNewsContent({ 
                sid: this.props.match.params.id 
            });

            this.props.getHotNews({
                snapShotNumber: 0,
                pageSize: 10,
                pageNum: 1,
                getPages: 1
            });
        }
    }

    render() {
        const {
            hotNewsList = [], newsContent
        } = this.props;

        const { thisNews = {} } = newsContent; 

        const videoUrl = getVideoUrl(thisNews.videoUrl || '', this.state.quality);
        const poster = getCoverUrl(thisNews.coverUrl || '');

        changeContentUrl(thisNews);

        return (
            <div className={styles['video-container']}>
                <div className={styles['video-container-left']}>
                    <div className={styles.content}>                      
                        <div className={styles['video-msg']}>
                            {videoUrl && typeof window === 'object' && <VideoPlay poster={poster} videoUrl={videoUrl} />}
                            <h1 className={styles.title}>{thisNews.title}</h1>
                            <div className={styles['video-media']}>
                                <img src={thisNews.weMediaAvatarUrl && thisNews.weMediaAvatarUrl != '' ? thisNews.weMediaAvatarUrl : require('Public/images/default_head_img.png')}
                                    onError={this.imgLoadError}
                                    ref='mediaCoversmall'
                                />
                                <span>{thisNews.weMediaName}</span>
                                <span>{timeFormat(thisNews.updateTime, 'yyyy-MM-dd hh:mm:ss')}</span>
                                <span>{thisNews.readCount || 0}阅读</span>
                                {/* <a>举报</a> */}
                            </div>
                            <div className={styles['video-content']}>{newsContent.content}</div>
                        </div>
                    </div>
                </div>

                <div id='sidebar' className={styles['video-sidebar']}>
                    {hotNewsList.length > 0 && <HotNews hotNewsList={hotNewsList} />}
                </div>
            </div>
        );
    } 


    // 图片加载失败换默认图
    imgLoadError = () => {
        this.refs.mediaCoversmall.src = require('Public/images/default_head_img.png');
    }
}

export default Video;
