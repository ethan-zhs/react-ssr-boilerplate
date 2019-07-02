import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import SwiperBox from 'Components/SwiperBox';
import HotPannel from 'Components/HotPannel';
import PushList from 'Components/PushList';

import prefetchSaga from './prefetch';
import selectors from './selectors';
import * as Actions from './actions';
import styles from './index.less';


/**
 * PageName: 首页
 * 
 * Author: zhuhuishao 
 * use: [ 首页信息流展示 ]
 * 
*/
@connect(selectors, {
    getIndexBanner: Actions.getIndexBanner.request,
    getIndexHots: Actions.getIndexHots.request,
    getIndexPush: Actions.getIndexPush.request
})
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static prefetch = prefetchSaga;

    componentDidMount() {
        if (!this.props.isPrefetch) {
            this.props.getIndexBanner();
            this.props.getIndexHots({
                size: 6
            });
            this.props.getIndexPush({
                params: { 
                    size: 24,
                    channelId: 0
                },
                callback: this.getMorePush
            });
        }           
    }


    render() {
        const { 
            friendLinks, bannerData, indexLatest, indexHots, indexPush
        } = this.props;

        return (
            <div className={styles['page-index']}>
                <Helmet>
                    <title>触电新闻 - 让你关心的事实更清晰</title>
                    <meta name="title" content="触电新闻 - 让你关心的事实更清晰" />
                    <meta name="keywords" content="触电新闻，新闻频道，新闻资讯，时事热点，每日要闻，娱乐头条、财经报道，奇闻趣事，国际新闻，国内新闻，新闻直播，视频直播，新闻客户端，主流媒体，融媒体，新媒体，自媒体，广东触电传媒科技" />
                    <meta name="description" content="广东触电传媒科技！广电媒体深度融合，打造新型主流媒体。为用户提供时事热点、每日要闻、娱乐头条、体育财经、汽车科技等热点新闻；解决专业媒体、准专业媒体及图文、视频、直播自媒体的内容发布需求。" />
                </Helmet>
                <div className={styles['left-area']}>
                    <div className={styles.banner}>
                        {bannerData.size > 0 && <SwiperBox bannerData={bannerData.toJS()}/>}
                    </div>
                    <PushList vals={{ channelId: 0 }} error={indexPush.get('code')} loading={indexPush.get('isRequest')} pushList={indexPush.get('list').toJS()} getMore={this.getMorePush} />
                </div>

                <div className={styles['right-area']} id="rightArea">
                    <HotPannel hotList={indexHots.get('list').toJS()} loading={indexHots.get('isRequest')} error={indexHots.get('code')} />
                </div>
            </div>
        );
    }    
    

    // 获得更多信息流列表
    getMorePush = () => {
        this.props.getIndexPush({
            params: {
                size: 12,
                channelId: 0
            }
        });
    }
}

export default HomePage;
