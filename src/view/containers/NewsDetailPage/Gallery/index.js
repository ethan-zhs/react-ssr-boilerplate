import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getStrLength, timeFormat } from 'Utils/utils';

import LoadingBox from 'Components/LoadingBox';
import ImageEndPannel from 'Components/ImageEndPannel';

import styles from './index.less';
import * as Actions from '../actions';
import selectors from '../selectors';
import prefetchSaga from '../prefetch';
import { isCorrectSid, changeContentUrl } from '../constants';


/**
 * PageName: 图集详情页
 * 
 * Author: zhuhuishao 
 * use: [ 图集详情页展示 ]
 * 
*/
@connect(selectors, {
    getNewsContent: Actions.getNewsContent.request
})
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currPic: 0,
            showArrow: false,
            loadIndex: -1,
            imgLoading: true,
            imageWidth: 0, 
            imagesHeight: 0
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
        }
    }

    render() {
        const {
            newsContent, match
        } = this.props;
        const { thisNews = {}, pictureList = [], relateNewsList = [] } = newsContent;       

        if (thisNews.contentType && thisNews.contentType != 2 && typeof window == 'object') {
            this.props.history.push((thisNews.contentType == 1 ? '/video/' : '/article/') + match.params.id);
        }

        const currPicItem = pictureList.length ? pictureList[this.state.currPic] : {};

        // 判断是否是正确的内容类型
        changeContentUrl(thisNews);

        return (
            <div className={styles['images-container']}>
                <div className={styles['images-show']} style={{ marginTop: 20 }}>
                    <div className={styles['images-list']}>
                        <div className={styles['images-item']} 
                            onMouseEnter={() => this.showArrow(true)} 
                            onMouseLeave={() => this.showArrow(false)}
                        >
                            {this.state.imgLoading && (
                                <div className={styles['images-loading']}>
                                    <div className={styles['loading-box']}>
                                        <LoadingBox loading={this.state.imgLoading} />
                                    </div>
                                </div>
                            )}
                            
                            {this.state.showArrow && <img className={styles['arrow-left']} src={require('Public/images/arrow_left.png')} onClick={() => this.changePicIndex('sub', this.state.currPic)}/>}
                            {this.state.showArrow && <img className={styles['arrow-right']} src={require('Public/images/arrow_right.png')} onClick={() => this.changePicIndex('add', this.state.currPic)}/>}

                            <img className={styles['curr-img']} 
                                src={currPicItem && currPicItem.imageUrl ? currPicItem.imageUrl : ''} 
                                onLoad={(e) => {
                                    this.state.currPic == 0 && this.changePicIndex('add', -1);
                                }}
                                style={{ 
                                    width: this.state.imageWidth,
                                    height: this.state.imagesHeight
                                }}
                            />
                        </div>
                    </div>


                    <div className={styles['images-msg']}>
                        <h1>{thisNews.title}</h1>
                        <div className={styles['images-media']}>
                            <img src={thisNews.weMediaAvatarUrl && thisNews.weMediaAvatarUrl != '' ? thisNews.weMediaAvatarUrl : require('Public/images/default_head_img.png')}
                                onError={this.imgLoadError}
                                ref="mediaCoversmall"
                            />
                            <span>{thisNews.weMediaName}</span>
                        </div>
                        <p className={styles['images-index']}>
                            <span>{this.state.currPic + 1}</span>
                            <span> / {pictureList.length}</span>
                        </p>
                        <p className={styles['images-desc']}>{this.dealDescription(currPicItem && currPicItem.description ? currPicItem.description : '')}</p>
                        <p className={styles['images-other']}>
                            <span>{timeFormat(thisNews.updateTime, 'yyyy-MM-dd hh:mm:ss')}</span>
                            <span>{thisNews.readCount}阅读</span>
                        </p>
                    </div>
                    <ImageEndPannel
                        headTit={thisNews.title}
                        list={relateNewsList}
                        visible={this.state.isViewEnd || false}
                        reView={this.reView}
                    />
                </div>
            </div>
        );
    }
    

    /**
     * 
     * 处理图片描述长度
     * 
     * @param [string] desc [图片描述内容]
     */
    dealDescription = (desc) => {
        while (getStrLength(desc) / 2 > 200) {
            desc = desc.substring(0, desc.length - 2);
        }

        return desc;
    }


    /**
     * 
     * 切换图片
     * 
     * @params [string] type [切换类型： add - 下一张 | sub 上一张]
     * @params [number] index [当前下标]
     */
    changePicIndex = (type, index) => {
        const { newsContent } = this.props;
        const galleryList = newsContent.pictureList || [];

        let _loadIndex = this.state.loadIndex;

        this.setState(Object.assign({}, this.state, { isViewEnd: false }));

        if (type == 'add') {
            if (index + 1 < galleryList.length) {
                if (_loadIndex < index + 1) {
                    _loadIndex = index + 1;
                    this.setState(Object.assign({}, this.state, { 
                        imgLoading: this.state.loadIndex < index + 1,
                        loadIndex: _loadIndex
                    }));
                }

                let img = new Image();
                img.src = newsContent.pictureList[index + 1].imageUrl;
                img.onload = (e) => {
                    const loadImg = e.target;
                    const imagesWidth = loadImg.width / loadImg.height >= 764 / 560 ? '764px' : 'auto';
                    const imagesHeight = loadImg.width / loadImg.height >= 764 / 560 ? 'auto' : '560px';
                    this.setState(Object.assign({}, this.state, { 
                        currPic: index + 1, 
                        imageWidth: imagesWidth, 
                        imagesHeight: imagesHeight,
                        imgLoading: false
                    }));
                };
                img = null;
            } else {
                this.setState(Object.assign({}, this.state, { isViewEnd: true }));
            }
        } else if (index > 0) {
            this.setState(Object.assign({}, this.state, { currPic: index - 1 }));
        }
    }


    // 媒体头像图片加载失败替换默认图
    imgLoadError = () => {
        this.refs.mediaCoversmall.src = require('Public/images/default_head_img.png');
    }


    /**
     * 
     * 显示 / 隐藏切换图片按钮
     * 
     * @params [boolean] value [是否显示： true - 显示 | false - 隐藏]
     */
    showArrow = (value) => {
        this.setState(Object.assign({}, this.state, { showArrow: value }));
    }


    // 重新浏览图集
    reView = () => {
        this.setState(Object.assign({}, this.state, { currPic: 0 }), () => {
            this.setState(Object.assign({}, this.state, { isViewEnd: false }));
        });
    }
}

export default Gallery;
