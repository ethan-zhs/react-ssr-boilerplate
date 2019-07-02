import React, { Component } from 'react';
import { connect } from 'react-redux';

import { timeFormat } from 'Utils/utils';

import HotNews from 'Components/HotNews';
import HtmlParser from 'Components/HtmlParser';

import prefetchSaga from '../prefetch';
import selectors from '../selectors';
import * as Actions from '../actions';
import styles from './index.less';

import { isCorrectSid, changeContentUrl } from '../constants';


/**
 * PageName: 文章详情页
 * 
 * Author: zhuhuishao 
 * use: [ 文章详情页展示 ]
 * 
*/
@connect(selectors, {
    getNewsContent: Actions.getNewsContent.request,
    getHotNews: Actions.getHotNews.request,
    vote: Actions.vote.request
})
class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            this.props.getNewsContent({ sid: this.props.match.params.id });

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
            hotNewsList, newsContent = {}
        } = this.props;  

        const { thisNews = {} } = newsContent;

        // 判断是否是正确的内容类型
        changeContentUrl(thisNews);

        return (
            <div className={styles.article}>
                {thisNews && (
                    <div className={styles['article-area']}>
                        <div className={styles['article-container']}>
                            <div className={styles['article-news']}>
                                <h1>{thisNews.title}</h1>
                                <div className={styles['article-media']}>
                                    <img src={thisNews.weMediaAvatarUrl && thisNews.weMediaAvatarUrl != '' ? thisNews.weMediaAvatarUrl : require('../../../statics/images/default_head_img.png')}
                                        onError={this.imgLoadError}
                                        ref='mediaCoversmall'
                                    />
                                    <span>{thisNews.weMediaName}</span>
                                    <span>{timeFormat(thisNews.updateTime, 'yyyy-MM-dd hh:mm:ss')}</span>
                                    <span>{thisNews.readCount}阅读</span>
                                </div>
                                {newsContent.content && newsContent.content != '' && (
                                    <HtmlParser 
                                        content={newsContent.content} 
                                        voteList={newsContent.voteList}
                                        voteFunc={this.props.vote}
                                        news={thisNews}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div id='sidebar' className={styles['news-detail']}>
                    {hotNewsList && hotNewsList.length > 0 && (<HotNews hotNewsList={hotNewsList} />)}
                </div>
            </div>
        );
    } 
}

export default Article;
