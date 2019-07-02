import React, { Component } from 'react';
import ReactDom from 'react-dom';

import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';
import Vote from './Vote';

import styles from './index.less';

/**
 * ModuleName: 富文本渲染
 * 
 * Author: zhuhuishao 
 * use: [ Html富文本渲染组件 ]
 * 
*/
class HtmlParser extends Component {
    constructor(props) {
        super(props);
        this.videoArr = [];
        this.audioArr = [];
        this.voteElId = '';
    }

    componentDidMount() {
        this.renderItems();
    }


    render() {
        const { content } = this.props;

        return (
            <div 
                id='article-content' 
                className={styles['article-content']} 
                dangerouslySetInnerHTML={{ __html: this.handleFilterContent(content) }} 
            />
        );
    }


    /**
     * 
     * 播放视频 / 音频回调事件
     * 
     * @param [string] currId [当前播放的media Id]
     */
    playMedia = (currId) => {
        this.videoArr.forEach((item, i) => {
            currId != `video${i}` && document.getElementById(`video${i}_html5_api`).pause();
        });

        this.audioArr.forEach((item, i) => {
            currId != `audio${i}` && document.getElementById(`audio${i}`).pause();
        });
    }

    
    // 渲染视频 / 音频 / 投票组件
    renderItems = () => {
        const { voteList = [], voteFunc, news } = this.props;

        // 渲染视频组件
        this.videoArr.forEach((item, i) => {
            ReactDom.render(
                <VideoPlayer 
                    id={`video${i}`}
                    videoUrl={this.videoArr[i].videoUrl} 
                    poster={this.videoArr[i].posterUrl} 
                    playMedia={this.playMedia}
                />, 
                document.getElementById(`videoEl-${i}`)
            );
        });

        // 渲染音频组件
        this.audioArr.forEach((item, i) => {
            ReactDom.render(
                <AudioPlayer
                    id={`audio${i}`}
                    playMedia={this.playMedia}
                    audioUrl={this.audioArr[i].audioUrl} 
                    audioTitle={this.audioArr[i].audioTitle}
                />,
                document.getElementById(`audioEl-${i}`)
            );
        });

        // 渲染投票组件
        if (voteList.length) {
            ReactDom.render(
                <Vote
                    vote={voteList[0]}
                    voteFunc={voteFunc}
                    news={news}
                />,
                document.getElementById(this.voteElId)
            );
        }
    }   

    
    /**
     * 
     * 清洗/过滤/替换Html文本 
     * 
     * @param [string] content [html 原始文本]
     */
    handleFilterContent = (content) => {
        this.videoArr = [];
        this.audioArr = [];

        if (content) {
            // 去段首空格, 去空行
            content = content.replace(/<br\s*\/?>/gi, '')
                .replace(/<strong>((\s)|(&nbsp;))+<\/strong>/ig, '')
                .replace(/<p>((\s)|(&nbsp;))+/ig, '<p>')
                .replace(/<div>((\s)|(&nbsp;))+/ig, '<div>')
                .replace(/(<p><\/p>)|(<div><\/div>)/ig, '');

            // 处理content行内style
            content = content.replace(/style="[^"]*"/gi, '').replace(/[\r\n]/g, '');

            // 处理投票模块
            content = content.replace(/\[\[vote\]\]/g, (a, b) => {
                this.voteElId = 'voteEl';
                return `<div id=${this.voteElId} class="vote-shell"></div>`;
            });

            // 整理文章内的Video标签
            const videoReg = /<p[^>]* class="video-play-area"[^>]*>((?!<\/p>).)*<\/p>/g;
            content = content.replace(videoReg, (match) => {
                const data = {
                    posterUrl: match.split('poster="')[1] ? match.split('poster="')[1].split('"')[0] : '',
                    videoUrl: match.split('src="')[1] ? match.split('src="')[1].split('"')[0] : ''
                };
                this.videoArr.push(data);
                return `<div id="videoEl-${this.videoArr.length - 1}" class="${styles['video-shell']}"></div>`;
            });

            // 整理文章内的Audio标签
            const audioReg = /<p class="audio-play-area"[^>]*><audio[^>]*title=['"]([^'""]+)?[^>]*src=['"]([^'"]+)?[^>]*><\/audio><\/p>/g;
            content = content.replace(audioReg, (a, b, c) => {
                const data = {
                    audioTitle: b,
                    audioUrl: c
                };
                this.audioArr.push(data);
                return `<div id="audioEl-${this.audioArr.length - 1}" class="${styles['audio-shell']}"></div>`;
            });
        }

        return content;
    }
}

export default HtmlParser;
