import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import PropsType from 'prop-types';

import selectors from './selectors';
import * as Actions from './actions';

import styles from './index.less';


class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleAdd = () => {
        this.props.add();
    }

    handleCut = () => {
        this.props.cut();
    }

    render() {
        const { list } = this.props;

        console.log(list);

        return (
            <div className={styles.layout}>
                <Helmet>
                    <title>first Page</title>
                    <meta name="title" content="触电新闻" />
                    <meta name="keywords" content="新闻，时事，时政，国际，国内，社会，法治，聚焦，评论，文化，教育，头条，热点，直播，现场，专题，环球，传播，广东，本地，军事，焦点，排行，环保，校园，法治，自媒体" /><meta name="description" content="触电新闻（www.itouchtv.cn）是广东广播电视台旗下新闻客户端，一款以数据挖掘和广电资源为基础的视频资讯聚合产品，为用户提供热点新闻、有料直播、电视节目，全方位满足用户的视听需求，让用户身临其境看新闻。" />
                </Helmet>
                <a onClick={this.handleAdd}>First Page22  </a>
                <a onClick={this.handleCut}>Cut33 First Page</a>
                <img src={require('../../statics/images/01.jpg')} />
            </div>
        );
    }    
}

export default connect(selectors, {
    add: Actions.add.request,
    cut: Actions.cut.request
})(FirstPage);
